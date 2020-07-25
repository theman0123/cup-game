import JSONLevelScene from './JSONLevelScene';
import Player from '../prefabs/world/Player';
import Map from '../prefabs/world/Map';
import { PrefabProperties } from 'interfaces';
// import Door from '../prefabs/world/Door';

class WorldScene extends JSONLevelScene {
  light: Phaser.GameObjects.Light | undefined;

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
    if (this.map && this.MapClass) {
      this.map.objects.map((object) =>
        this.MapClass!.handleObjectLayers(object)
      ); //.Objectlayers.map((layer) => this.handleLayers(layer));
    }

    this.lights.enable().setAmbientColor(0xf3c260);
    this.lights.addLight(600, 0, 1200).setIntensity(2); //setColor() 1000);
    // this.cameras.main.setBounds(
    //   0,
    //   0,
    //   this.sys.game.config.width as number,
    //   this.sys.game.config.height as number
    // );
    // won't follow player after setting bounds?....
    // I think you need a secondary camera?
    this.cameras.main.startFollow(this.players[0]);
    // this.cameras.main.setZoom(0.5);
    if (this.mapLayers !== undefined) {
      this.physics.add.collider(
        this.players[0],
        this.mapLayers.foreground,
        function () {
          console.log('collision!');
        }
      );
    }

    // if (this.mapLayers) {
    //   debugger;
    //   // @ts-ignore
    //   debugGraphics ? debugGraphics.clear() : null;
    //   let debugGraphics = this.add.graphics(); //.setScale(2);
    //   this.mapLayers.foreground.renderDebug(
    //     debugGraphics,
    //     {
    //       collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
    //     }
    //     // @ts-ignore
    //     // [this.mapLayers.foreground]
    //   );
    // }
    // debugger;

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

  create_object(object: {
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
    name: string;
    properties: PrefabProperties;
  }) {
    let position = {
      x: object.x + object.width / 2,
      y: object.y + object.height / 2,
    };
    // debugger;
    if (
      this.prefab_classes &&
      this.prefab_classes.hasOwnProperty(object.type)
    ) {
      new this.prefab_classes[object.type](
        this,
        object.name,
        position,
        object.properties
      );
    }
  }
}

export default WorldScene;
