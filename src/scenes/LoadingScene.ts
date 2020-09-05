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
        switch (asset.type) {
          case 'image':
            this.load.image(asset_key, asset.source);
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
    // const hud = this.scene.get('HUDScene');
    const hud_data = this.cache.json.get('hud');

    if (!this.scene.isActive('HUDScene')) {
      debugger;
      console.log('againagaingaingaing');
      this.scene.launch('HUDScene', { level_data: hud_data });
    }
    if (data.scene === 'WorldScene')
      this.scene.start(data.scene, { level_data: this.level_data });
    // this.scene.launch('BootScene', { scene: 'hud' });
  }
}

export default LoadingScene;
