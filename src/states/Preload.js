/*
 * Preload state
 * =============
 *
 * This state takes care of loading the main game assets, including graphics
 * and sound effects, while displaying a splash screen with a progress bar,
 * showing how much progress were made during the asset load.
 */

import assets from '../assets';

export default class Preload extends Phaser.State {

  preload () {
    this.showSplashScreen();
    this.load.pack('game', null, assets);
  }

  create () {
    // Here is a good place to initialize plugins that depend on any game
    // asset. Example:
    //this.add.plugin(MyPlugin/*, ... initialization parameters ... */);

    this.state.start('MainMenu');

  }

  // --------------------------------------------------------------------------

  showSplashScreen () {
    var splash = this.add.image(this.game.world.centerX, this.game.world.centerY, 'backgrounds/background-1');
    splash.anchor.setTo(0.5);

    var loadingBar = this.add.image(this.game.world.centerX, this.game.world.centerY, 'progress-bar');
    loadingBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(loadingBar);
  }

}
