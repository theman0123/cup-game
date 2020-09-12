import * as Phaser from 'phaser';
// @ts-ignore
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import TitleScene from './scenes/TitleScene';
import WorldScene from './scenes/WorldScene';
import BootScene from './scenes/BootScene';
import LoadingScene from './scenes/LoadingScene';
import HUDScene from './scenes/HUDScene';

let titleScene = new TitleScene();
let worldScene = new WorldScene();
let bootScene = new BootScene();
let loadingScene = new LoadingScene();
let hudScene = new HUDScene();
// let CreditsScene = new CreditsScene();

let config = {
  type: Phaser.AUTO,
  parent: 'cup-game',
  // pixelArt: true,
  width: 600,
  height: 352,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 300, //300
      },
    },
  },
  fps: {
    // target: , //60,
    // forceSetTimeout: true,
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

let game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.add('WorldScene', worldScene);
game.scene.add('BootScene', bootScene);
game.scene.add('LoadingScene', loadingScene);
game.scene.add('HUDSCene', hudScene);
// 'title'
game.scene.start('BootScene', { scene: 'east' });
