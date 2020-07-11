class Map {
  // scene, name, position, properties
  constructor(scene, info) {
    this.scene = scene;

    // debugger;
    this.map = this.scene.make.tilemap({ key: info.tiled_key });
    this.tiles = this.map.addTilesetImage(info.tile_set_name, info.asset_name);
    info.layers.map((name) => {
      this[name] = this.map
        .createDynamicLayer(name, this.tiles)
        .setCollisionByExclusion()
        // .setDisplaySize(640, 480)
        .setPipeline('Light2D');
    });
  }
}

export default Map;
