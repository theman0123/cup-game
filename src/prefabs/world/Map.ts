import { GameScene } from 'interfaces';

class Map {
  map: Phaser.Tilemaps.Tilemap;
  tiles: Phaser.Tilemaps.Tileset;
  scene: GameScene;

  constructor(
    scene: GameScene,
    info: {
      layers: Array<string>;
      tiled_key: string;
      tile_set_name: string;
      asset_name: string;
    }
  ) {
    this.scene = scene;

    // debugger;
    this.map = this.scene.make.tilemap({ key: info.tiled_key });
    this.tiles = this.map.addTilesetImage(info.tile_set_name, info.asset_name);
    // @ts-ignore
    this.scene.mapLayers = {};
    info.layers.map((name) => {
      const layer = this.map
        .createDynamicLayer(name, this.tiles)
        .setPipeline('Light2D'); // pipeline in development takes 600% cpu for arcade physics
      debugger;
      layer.setOrigin(0, 0);
      layer.setDisplaySize(1920, this.scene.sys.game.config.height as number);

      // @ts-ignore
      this.scene.mapLayers[name] = layer;
      //.setDisplaySize(scene)
      // debugger;
      // .setCollision(true)
      // .setCollisionFromCollisionGroup();
      // this.scene.matter.add.gameObject(this[name]);
      // this[name].setCollisionByExlusion([-1, 0]);
    });
  }
}
// .setDisplaySize(640, 480)

export default Map;
