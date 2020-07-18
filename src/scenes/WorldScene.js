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

  create() {
    super.create();
    this.light = this.lights.addLight(600, 0, 1200).setIntensity(2); //setColor() 1000);
    this.lights.enable().setAmbientColor(0xf3c260);
    // this.cameras.main.startFollow(this.players[0]);
    // this.cameras.main.setZoom(1.5);

    // try adding tiles to this.matter.add.gameObject(tile);
    // this way not quite working
    // const colliderGroup = this.matter.add.gameObject(
    //   this.mapLayers['grass-fence(640x352)'].setCollisionByProperty({
    //     collides: true,
    //   })
    // );
    // this.colliderGroup.map
    // this.matter.add.gameObject(cg)

    // this.matterCollision.addOnCollideStart({
    //   objectA: this.players[0],
    //   objectB: this.layers['grass-fence(640x352)'],
    // });
    // debugger;
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
    // debugger;
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
