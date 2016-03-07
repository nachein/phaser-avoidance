/*
 * MainMenu state
 *
 * Displays the main menu
 */


export default class MainMenu extends Phaser.State {
  init () {
    this.titleText = this.game.make.text(this.game.world.centerX, this.game.world.centerY - (this.game.world.centerY / 2), 'Can\'t Touch This', {
      font: '40pt Raleway',
      fill: '#ffffff',
      align: 'center'
    });
    this.titleText.anchor.x = 0.5;
    this.titleText.anchor.y = 0.5;

    this.tapToStartText = this.game.make.text(this.game.world.centerX, this.game.world.centerY + this.game.world.centerY / 3, 'Tap to Start', {
      font: '26pt Raleway',
      fill: '#fff',
      align: 'center',
      anchor: 0.5
    });
    this.tapToStartText.anchor.x = 0.5;
    this.tapToStartText.anchor.y = 0.5;

    this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'backgrounds/background-1');
    this.background.anchor.setTo(0.5, 0.5);
  }

  preload () {
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  }

  create () {
    this.game.add.existing(this.titleText);
    this.game.add.existing(this.tapToStartText);

    var tween = this.game.add.tween(this.tapToStartText).to( { alpha: 0.1 }, 500, 'Quart.easeOut', true, 0, -1);
    tween.yoyo(true, 250);

    this.game.input.onDown.addOnce(this.startGame, this);

  }

  startGame () {
    this.state.start('Game');
  }

  update () {
    // TODO: Stub
  }

  render () {
    // TODO: Stub
  }
}
