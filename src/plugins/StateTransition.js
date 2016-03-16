/*
 * Test plugin
 */


export default class StateTransition extends Phaser.Plugin {
  constructor (game, parent) {
    super(game, parent);

    // Default transition settings
    this.settings = {
      duration: Phaser.Timer.SECOND * 0.3,
      ease: Phaser.Easing.Exponential.InOut,
      properties: {
        alpha: 0
      }
    };
    // Original implementations of state methods
    this._originalStateMethods = {};
  }

  init (/*...args*/) {
  }

  update () {
  }

  configure (options) {
    var property;

    if (options) {
      for (property in options) {
        if (this.settings[property]) {
          this.settings[property] = options[property];
        }
      }
    } else {
      return Object.create(this.settings);
    }
  }

  to () {
    var stateName = arguments[0],
      _this = this,
      _init,
      _create;

    if (!stateName) {
      throw 'No state passed.';
    }

    // In case last transition went wrong
    this._destroy();

    // Pause game to take world snapshot
    this.game.paused = true;

    // Create current state texture
    this._texture = new Phaser.RenderTexture(this.game, this.game.width, this.game.height, 'cover');

    // Draw the current world to the render
    this._texture.renderXY(this.game.world, -this.game.camera.x, -this.game.camera.y);

    // Save original implementation of state's init and create methods
    this._originalStateMethods[stateName] = this._originalStateMethods[stateName] || {
      init: this.game.state.states[stateName].init,
      create: this.game.state.states[stateName].create
    };
    _init = this._originalStateMethods[stateName].init;
    _create = this._originalStateMethods[stateName].create;

    // Extend state init method to add cover
    this.game.state.states[stateName].init = function() {
      this.game.add.existing(_this._newCover());
      if (_init) {
        _init.apply(this, arguments);
      }
    };

    // Extend state create method to animate cover
    this.game.state.states[stateName].create = function() {
      if (_create) {
        _create.apply(this, arguments);
      }
      _this.bringToTop();
      _this._animateCover();
    };

    // Resume the game and start next state
    this.game.paused = false;
    this.game.state.start.apply(this.game.state, arguments);
  }

  _newCover () {
    // Create current state cover sprite
    this._cover = new Phaser.Sprite(this.game, 0, 0, this._texture);
    this._cover.fixedToCamera = true;
    this._cover.anchor.set(0.5);
    // Instead of x/y we need to set the cameraOffset point
    this._cover.cameraOffset.x = this.game.width / 2;
    this._cover.cameraOffset.y = this.game.height / 2;
    return this._cover;
  }

  bringToTop () {
    if (this._cover) {
      this._cover.bringToTop();
    }
  }

  _animateCover () {
    var propertyValueObject, property, tween;

    for (property in this.settings.properties) {
      if (typeof this.settings.properties[property] === 'object') {
        // Create a tween for specific object property
        tween = this.game.add
          .tween(this._cover[property])
          .to(this.settings.properties[property],
            this.settings.duration,
            this.settings.ease, true);
      } else {
        // Create properties object for specific property value
        propertyValueObject = {};
        propertyValueObject[property] = this.settings.properties[property];
        tween = this.game.add
          .tween(this._cover)
          .to(propertyValueObject,
            this.settings.duration,
            this.settings.ease, true);
      }
    }
    // Since all tweens have the same duration we listen to the last one created
    tween.onComplete.addOnce(this._destroy, this);
  }

  _destroy () {
    if (this._cover) {
      this._cover.destroy();
    }
    if (this._texture) {
      this._texture.destroy();
    }
  }
}
