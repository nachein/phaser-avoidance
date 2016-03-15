/*
 * The `assets` module
 * ===================
 *
 * Use this module to declare static Phaser Asset Packs, that would be loaded
 * using the `Loader#pack` API.
 *
 * Regarding how the game assets should be declared using this file, refer to
 * the sample `assetPack.json` included in the Phaser package, under
 * `node_modules/phaser/resources/` directory, for a more complete
 * reference.
 */

export default {
  // -- The splash screen assets, displayed during the 'Preload' state.
  boot: [{
    key: 'backgrounds/background-1',
    type: 'image'
  },
  {
    key: 'progress-bar',
    type: 'image'
  }],

  // -- General game assets
  game: [{
    key: 'player',
    type: 'image'
  },
  {
    key: 'enemy',
    type: 'image'
  },
  {
    key: 'backgrounds/background-10',
    type: 'image'
  }]
};
