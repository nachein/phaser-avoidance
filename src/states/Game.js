/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Player from '../objects/Player';
import Enemy from '../objects/Enemy';

export default class Game extends Phaser.State {

  create () {

    const { centerX: x, centerY: y } = this.world;
    this.player = this.add.existing(new Player(this.game, x, y));

    this.enemyGroup = this.game.add.group();

    this.game.input.activePointer.x = this.game.width/2;
    this.game.input.activePointer.y = this.game.height/2;
  }

  update () {
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
