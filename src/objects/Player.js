export default class Player extends Phaser.Sprite {

  constructor (game, x, y) {
    super(game, x, y, 'player');

    this.anchor.set(0.5);

    this.moving = false;
    this.distanceX = 0;
    this.distanceY = 0;
  }

  update () {
    var activePointer = this.game.input.activePointer;

    if(false && Math.abs(this.x - activePointer.x) <= (this.width / 2) && Math.abs(this.y - activePointer.y) <= (this.height / 2)) {
      this.x = activePointer.x;
      this.y = activePointer.y;
    }

    if(!this.moving && activePointer.active){
      this.moving = true;
      this.distanceX = activePointer.x - this.x;
      this.distanceY = activePointer.y - this.y;
    }

    if(this.moving){
      if(activePointer.active){
        this.x = activePointer.x - this.distanceX;
        this.y = activePointer.y - this.distanceY;
      }
      else{
        this.moving = false;
        this.distanceX = 0;
        this.distanceY = 0;
      }
    }
  }

}
