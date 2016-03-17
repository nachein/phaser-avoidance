/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Player from '../objects/Player';
import Enemy from '../objects/Enemy';

export default class Game extends Phaser.State {

  preload () {
    this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'backgrounds/background-10');
    this.background.anchor.setTo(0.5, 0.5);

    this.levels = JSON.parse(localStorage.getItem('levels'));
    this.highScore = localStorage.getItem('highscore') || 0;
    this.currentLevel = 0;
    this.incoming = false;

  }

  create () {

    const { centerX: x, centerY: y } = this.world;

    this.player = this.add.existing(new Player(this.game, x, y));
    this.enemyGroup = this.game.add.group();
    this.game.input.activePointer.x = this.game.width/2;
    this.game.input.activePointer.y = this.game.height/2;

    if(this.highScore == 0) { // show tutorial
      this.loadTutorial();
    }
    else {
      this.loadLevel();
    }



  }

  update () {
    if(this.tutorial) {
      this.checkTutorialSuccess();
    }
    else if(!this.incoming) {
      if(this.enemyGroup.countLiving() < 1) {
        this.spawnEnemy(this.game.rnd.integerInRange(50, this.game.width-50),
        this.game.rnd.integerInRange(0,100) <= 50 ? this.game.height + 50 : -50);
      }


      // If any missile is within a certain distance of the mouse pointer, blow it up
      this.enemyGroup.forEachAlive(function(enemy) {
        var distance = this.game.math.distance(enemy.x, enemy.y,
          this.player.x, this.player.y);
        if (distance < (this.player.width/2 + enemy.width/2)) {
          enemy.kill();
          //this.getExplosion(m.x, m.y);
        }
      }, this);
    }
  }

  loadTutorial () {
    this.pointer = this.game.add.sprite(this.game.world.centerX / 2, this.game.world.centerY + this.game.world.centerY / 3 , 'pointer');
    this.pointer.anchor.setTo(0.5);

    var tween = this.game.add.tween(this.pointer).to( { x: this.game.world.centerX + (this.game.world.centerX / 2) }, 1500, 'Quart.easeOut', true, 0, -1);
    tween.yoyo(true, 250);

    this.swipeTutorial = this.game.make.text(this.game.world.centerX, this.game.world.centerY + this.game.world.centerY / 2, 'Tap and Drag to move around', {
      font: '26pt Raleway',
      fill: '#fff',
      align: 'center',
      anchor: 0.5
    });
    this.swipeTutorial.anchor.setTo(0.5);
    this.game.add.existing(this.swipeTutorial);

    this.tutorial = true;
  }

  checkTutorialSuccess () {
    if(this.player.x < this.game.world.centerX / 2 || this.player.x > this.game.world.centerX + this.game.world.centerX / 2) {
      this.incoming = true;
      this.tutorial = false;
      this.clearTutorial();

      var nice = this.game.make.text(this.game.world.centerX, this.game.world.centerY + this.game.world.centerY / 2, 'Nice!', {
        font: '26pt Raleway',
        fill: '#fff',
        align: 'center',
        anchor: 0.5
      });
      nice.anchor.setTo(0.5);
      this.game.add.existing(nice);

      this.game.add.tween(nice).to( { alpha: 0 }, 1000, "Linear", true);

      var self = this;
      setTimeout(function() {
        self.showIncomingLevel();

        setTimeout(function () {
          self.incoming = false;
          self.loadLevel();
        }, 4000);
      }, 1500);

    }
  }

  checkLevelSuccess () {

  }

  showIncomingLevel () {
    if(!this.incomingLevel) {
      this.incomingLevel = this.game.make.text(this.game.world.centerX, this.game.world.centerY + this.game.world.centerY / 2, 'Level ' + this.currentLevel + 1, {
        font: '26pt Raleway',
        fill: '#fff',
        align: 'center',
        anchor: 0.5
      });
      this.incomingLevel.anchor.setTo(0.5);
      this.game.add.existing(this.incomingLevel);
    }

    var show = this.game.add.tween(this.incomingLevel).to( { alpha: 1 }, 2000, "Linear");
    var hide = this.game.add.tween(this.incomingLevel).to( { alpha: 0 }, 1000, "Linear");

    show.chain(hide);

    show.start();
  }

  clearTutorial () {
    this.pointer.destroy();
    this.swipeTutorial.destroy();
  }

  loadLevel () {
    var levelConfig = this.levels[this.currentLevel];
    // TODO: setup enemies
  }

  spawnEnemy (x, y) {
    var enemy = this.enemyGroup.getFirstDead();

    if (enemy === null) {
      enemy = new Enemy(this.game);
      enemy.target = this.player;
      this.enemyGroup.add(enemy);
    }

    enemy.revive();

    enemy.x = x;
    enemy.y = y;

    return enemy;
  }

}
