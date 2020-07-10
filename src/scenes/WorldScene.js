import JSONLevelScene from './JSONLevelScene';
import Prefab from '../prefabs/Prefab';
import TextPrefab from '../prefabs/TextPrefab';
import Player from '../prefabs/world/Player';
import Map from '../prefabs/world/Map';
// import Door from '../prefabs/world/Door';

class WorldScene extends JSONLevelScene {
  constructor() {
    super('WorldScene');

    this.prefab_classes = {
      players: Player.prototype.constructor,
      map: Map.prototype.constructor,
      //   door: Door.prototype.constructor,
    };
  }

  preload(level_data) {
    // spring1-layers0.png
    // debugger;
    // this.load.multiatlas(
    //   'spring1',
    //   'assets/images/world/stages/spring1/spring1.json',
    //   'assets/images/world/stages/spring1'
    // );
    // this.load.tilemapTiledJSON(
    //   'springtiled',
    //   'assets/images/world/stages/spring1/spring1.json'
    // );
  }

  create() {
    // warning says: only orthogonal maps are supported in this version of Phaser
    // this.map = this.make.tilemap({ key: 'springtiled' });
    // Loads tilemap image and creates individual tiles and metadata
    // const tiles = levelMap.addTilesetImage('platforms', 'tiles');

    // // Loads tiles onto the game
    // const worldLayer = levelMap.createStaticLayer('Level 1', tiles);

    // // Makes it so the character can stand on platform tiles
    // worldLayer.setCollisionByProperty({ collides: true });

    // this.map = this.add.tilemap(this.level_data.map.asset_name);
    // let tileset_index = 0;
    // this.tilesets = {};
    // this.map.tilesets.forEach(function (tileset) {
    //   let map_tileset = this.map.addTilesetImage(
    //     tileset.name,
    //     this.level_data.map.tilesets[tileset_index]
    //   );
    //   this.tilesets[this.level_data.map.tilesets[tileset_index]] = map_tileset;
    //   tileset_index += 1;
    // }, this);
    // this.layers = {};
    // this.map.layers.forEach(function (layer) {
    //   this.layers[layer.name] = this.map.createStaticLayer(
    //     layer.name,
    //     this.tilesets[layer.properties.tileset]
    //   );
    //   if (layer.properties.collision) {
    //     this.map.setCollisionByExclusion([-1]);
    //   }
    // }, this);

    super.create();
    this.light = this.lights.addLight(600, 0, 1200).setIntensity(2); //setColor() 1000);
    this.lights.enable().setAmbientColor(0xf3c260);
    // this.Player.setPipeline('Light2D');
    // this.map.objects.forEach(function (object_layer) {
    //   object_layer.objects.forEach(this.create_object, this);
    // }, this);
  }

  // update() {
  // if (this.groups && this.groups.players)
  //   this.groups.players.children.entries[0].update();
  // }

  create_object(object) {
    let position = {
      x: object.x + object.width / 2,
      y: object.y + object.height / 2,
    };
    debugger;
    if (this.prefab_classes.hasOwnProperty(object.type)) {
      let prefab = new this.prefab_classes[object.type](
        this,
        object.name,
        position,
        object.properties
      );
    }
  }
}

export default WorldScene;
