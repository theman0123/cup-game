import * as Phaser from 'phaser';
import TitleScene from './scenes/TitleScene';
import WorldScene from './scenes/WorldScene';
import BootScene from './scenes/BootScene';
import LoadingScene from './scenes/LoadingScene';

let titleScene = new TitleScene();
let worldScene = new WorldScene();
let bootScene = new BootScene();
let loadingScene = new LoadingScene();
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
    scene: [],
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
// 'title'
game.scene.start('BootScene', { scene: 'east' });

// const config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   scene: {
//     preload: preload,
//     create: create
//   }
// };

// const game = new Phaser.Game(config);

// function preload() {
//   this.load.image("logo", logoImg);
// }

// function create() {
//   const logo = this.add.image(400, 150, "logo");

//   this.tweens.add({
//     targets: logo,
//     y: 450,
//     duration: 2000,
//     ease: "Power2",
//     yoyo: true,
//     loop: -1
//   });
// }
