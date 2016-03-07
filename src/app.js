/*
 * The `app` module
 * ================
 *
 * Provides the game initialization routine.
 */

// Required: import the Babel runtime module.
import 'babel-polyfill';

// Import game states.
import * as states from './states';

export function init () {

  var height = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      document.body.offsetHeight;

  var width = window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth ||
              document.body.offsetWidth;

  //const game = new Phaser.Game(height * window.devicePixelRatio, width * window.devicePixelRatio, Phaser.CANVAS);
  var gameRatio = width / height;
  const game = new Phaser.Game(640 * gameRatio * window.devicePixelRatio, 640 * window.devicePixelRatio, Phaser.CANVAS);

  // Dynamically add all required game states.
  Object
    .entries(states)
    .forEach(([key, state]) => game.state.add(key, state));

  game.state.start('Boot');

  return game;
}
