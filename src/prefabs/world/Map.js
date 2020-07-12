class Map {
  constructor(scene, info) {
    this.scene = scene;

    // debugger;
    this.map = this.scene.make.tilemap({ key: info.tiled_key });
    this.tiles = this.map.addTilesetImage(info.tile_set_name, info.asset_name);
    this.scene.mapLayers = {};
    info.layers.map((name) => {
      this.scene.mapLayers[name] = this.map
        .createDynamicLayer(name, this.tiles)
        .setPipeline('Light2D');
      debugger;
      // .setCollision(true)
      // .setCollisionFromCollisionGroup();
      // this.scene.matter.add.gameObject(this[name]);
      // this[name].setCollisionByExlusion([-1, 0]);
    });
  }
}
// .setDisplaySize(640, 480)

export default Map;
