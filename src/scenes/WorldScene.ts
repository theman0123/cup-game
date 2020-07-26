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

    this.lights.enable().setAmbientColor(0xf3c260);
    this.lights.addLight(600, 0, 1200).setIntensity(1);

    if (this.map && this.MapClass) {
      this.map.objects.map((object) =>
        this.MapClass!.handleObjectLayers(object)
      ); //.Objectlayers.map((layer) => this.handleLayers(layer));
    }

    // @ts-ignore
    // this.add.tween({
    //   // @ts-ignore
    //   targets: [this.lights],
    //   ambientColor: 'orange',
    //   duration: 5000,
    //   yoyo: true,
    //   repeat: -1,
    // });
    //setColor() 1000);
    this.mainCamera = this.cameras.main;
    this.cameras.main.setBounds(
      0,
      0,
      (this.sys.game.config.width as number) * 2,
      (this.sys.game.config.height as number) * 2
    );
    this.cameras.main.fadeIn(1000);
    // this.cameras.main.setBounds(0,0, this.scene //.width, this.game.sys.height);
    // won't follow player after setting bounds?....
    // I think you need a secondary camera?
    // @ts-ignore
    // this.cameraPlayer = new Phaser.Cameras.Scene2D.Camera(
    //   0,
    //   0,
    //   this.sys.game.config.width as number,
    //   this.sys.game.config.height as number
    // );
    // @ts-ignore
    this.cameras.main.startFollow(this.players[0]);
    // this.cameras.main.setZoom(0.5);

    // collision between players and tiles
    if (this.mapLayers) {
      // const test =
      this.physics.add.collider(
        this.players[0],
        this.mapLayers.foreground,
        function () {
          console.log('collision!');
        }
      );
      // console.log(test);
      // debugger;
    }

    if (this.mapLayers) {
      // @ts-ignore
      debugGraphics ? debugGraphics.clear() : null;
      const debugGraphics = this.add.graphics(); //.setAlpha(0.75); //.setScale(2);
      debugger;
      // @ts-ignore
      this.mapLayers.foreground.renderDebug(
        debugGraphics,
        {
          tileColor: null, //new Phaser.Display.Color(40, 39, 37, 255),
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
          faceColor: null,
        }
        // @ts-ignore
        // [this.mapLayers.foreground as Phaser.Tilemaps.DynamicTilemapLayer]
      );
    }

    // @ts-ignore
    // this.tween.play();
    // debugger;
  }

  update() {
    // @ts-ignore
    // if (this.tween) {
    //   debugger;
    //   // @ts-ignore
    //   console.log(this.tween.getValue()); // 0
    // }
    // if (this.groups && this.groups.players)
    //   this.groups.players.children.entries[0].update();
  }

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
