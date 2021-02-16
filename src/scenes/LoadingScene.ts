import { LevelData } from 'interfaces';

class LoadingScene extends Phaser.Scene {
  level_data: LevelData | undefined;

  constructor() {
    super({ key: 'LoadingScene' });
  }

  init(data: { level_data: LevelData }) {
    this.level_data = data.level_data;

    // @ts-ignore
    let loading_message = this.add.text(320, 240, 'Loading', {
      font: '48px Kells',
      fill: '#ffffff',
    });
  }

  preload() {
    if (this.level_data) {
      let assets = this.level_data.sprites;
      for (let asset_key in assets) {
        let asset = assets[asset_key];
        let name = asset.asset_name;
        switch (asset.type) {
          case 'image':
            this.load.image(name, asset.source);
            break;
          case 'items':
          case 'spritesheet':
            this.load.multiatlas(asset.asset_name, asset.json, asset.home);
            this.load.json(
              `animations_${asset.asset_name}`,
              `/assets/animations/${asset.asset_name}.json`
            );

            break;
          case 'tilemap':
            this.load.multiatlas(asset.asset_name, asset.json, asset.home);
            this.load.tilemapTiledJSON(asset.tiled_key, asset.tiled_source);
            break;
          case 'multi-atlas':
            this.load.multiatlas(asset.asset_name, asset.json, asset.home);
            break;
        }
      }
      if (this.level_data.user_input) {
        this.load.json(
          this.level_data.user_input.key,
          this.level_data.user_input.path
        );
      }
    }
  }

  create(data: { scene: string }) {
    // debugger; // pass level scene to hud scene
    // game scenes need to launch first
    // if (data.scene !== 'HUDScene') {
    this.scene.launch(data.scene, { level_data: this.level_data });
    // }
    // if (data.scene === 'HUDScene') {
    //   this.scene.launch(data.scene, { level_data: {...this.level_data, worldScene: this.scene} });
    // }
    // then shut down the loading scene
    this.scene.stop('LoadingScene');
  }
}

export default LoadingScene;
