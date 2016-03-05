export default class Player extends Phaser.Sprite {

  constructor (game, x, y) {
    super(game, x, y, 'player');

    this.anchor.set(0.5);
  }

  update () {
    var activePointer = this.game.input.activePointer;
    if(Math.abs(this.x - activePointer.x) <= (this.width / 2) && Math.abs(this.y - activePointer.y) <= (this.height / 2)) {
      this.x = activePointer.x;
      this.y = activePointer.y;
    }
  }

}
