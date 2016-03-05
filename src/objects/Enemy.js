export default class Enemy extends Phaser.Sprite {

  constructor (game, x, y) {
    super(game, x, y, 'enemy');

    this.anchor.set(0.5);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // Define constants that affect motion
    this.SPEED = 150; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame

  }

  update () {

    var targetAngle = this.game.math.angleBetween(
      this.x, this.y,
      this.target.x, this.target.y
    );

    // Gradually (this.TURN_RATE) aim the missile towards the target angle
    if (this.rotation !== targetAngle) {
      // Calculate difference between the current angle and targetAngle
      var delta = targetAngle - this.rotation;

      // Keep it in range from -180 to 180 to make the most efficient turns.
      if (delta > Math.PI) delta -= Math.PI * 2;
      if (delta < -Math.PI) delta += Math.PI * 2;

      if (delta > 0) {
        // Turn clockwise
        this.angle += this.TURN_RATE;
      } else {
        // Turn counter-clockwise
        this.angle -= this.TURN_RATE;
      }

      // Just set angle to target angle if they are close
      if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
        this.rotation = targetAngle;
      }
    }

    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;

  }

}
