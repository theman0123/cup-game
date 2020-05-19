class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScene' });
  }

  init(data) {
    this.level_data = data.level_data;

    let loading_message = this.add.text(320, 240, 'Loading', {
      font: '48px Kells',
      fill: '#ffffff',
    });
  }

  preload() {
    let assets = this.level_data.sprites;
    for (let asset_key in assets) {
      let asset = assets[asset_key];
      switch (asset.type) {
        case 'image':
          this.load.image(asset_key, asset.source);
          break;
        case 'spritesheet':
          this.load.multiatlas(asset.asset_name, asset.json, asset.home);
          this.load.json(
            `animations_${asset.asset_name}`,
            `/assets/animations/${asset.asset_name}.json`
          );

          break;
        case 'tilemap':
          this.load.tilemapTiledJSON(asset_key, asset.source);
          break;
      }
    }
    this.load.json(
      this.level_data.user_input.key,
      this.level_data.user_input.path
    );
  }

  create(data) {
    this.scene.start(data.scene, { level_data: this.level_data });
  }
}

export default LoadingScene;
