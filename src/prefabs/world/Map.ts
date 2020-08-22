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

    this.map.layers.map((layer) => this.handleLayers(layer));
    this.scene.map = this.map;
  }

  handleLayers(layer: { name: string }) {
    let newLayer:
      | Phaser.Tilemaps.DynamicTilemapLayer
      | Phaser.Tilemaps.StaticTilemapLayer;
    const { name } = layer;
    if (name === 'foreground') {
      newLayer = this.map
        .createDynamicLayer(name, this.tiles)
        .setPipeline('Light2D');

      newLayer.setDepth(1);

      newLayer.setCollisionByProperty({ collision: true });
      // @ts-ignore
      debugGraphics ? debugGraphics.clear() : null;
      const debugGraphics = this.scene.add.graphics(); //.setAlpha(0.75); //.setScale(2);
      newLayer.renderDebug(debugGraphics, {
        tileColor: null, //new Phaser.Display.Color(40, 39, 37, 255),
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
        faceColor: null,
      });
      debugGraphics.depth = 1;
    }
    if (name === 'background') {
      newLayer = this.map.createStaticLayer(name, this.tiles);
    }
    if (name === 'backdrop') {
      newLayer = this.map.createStaticLayer(name, this.tiles);

      newLayer.setDepth(-1);
    }
    // @ts-ignore
    // newLayer.setScale(2);
    // @ts-ignore
    this.scene.mapLayers[name] = newLayer;
    //.setDisplaySize(scene)
    // debugger;
    // .setCollision(true)
    // .setCollisionFromCollisionGroup();
    // this.scene.matter.add.gameObject(this[name]);
    // this[name].setCollisionByExlusion([-1, 0]);
  }

  handleObjectLayers(object: { [key: string]: any }) {
    // debugger;
    const start = object.objects.find(
      (obj: { name: string }) => obj.name === 'Start'
    );
    const end = object.objects.find(
      (obj: { name: string }) => obj.name === 'End'
    );
    // @ts-ignore
    this.scene[object.name].setDepth(-1);
    // @ts-ignore
    this.scene[object.name].setPosition(start.x, start.y);
    // set up light with tween image
    // @ts-ignore
    this.scene.sunLight = this.scene.lights
      .addLight(600, 0, 1200)
      .setIntensity(0.2);
    // @ts-ignore
    this.scene.tween = this.scene.tweens.add({
      // @ts-ignore
      targets: [this.scene[object.name], this.scene.sunLight],
      x: end.x,
      y: end.y,
      // delay: 1000,
      ease: 'Cubic', // 'Linear', 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 5000,
      repeat: -1, // -1: infinity
      yoyo: true,
    });

    // @ts-ignore
    this.scene.tweenLight = this.scene.tweens.add({
      // @ts-ignore
      targets: [this.scene.sunLight],
      intensity: 1.5,
      // delay: 1000,
      ease: 'Cubic', // 'Linear', 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 5000,
      repeat: -1, // -1: infinity
      yoyo: true,
    });
    // tween.on('start', (t: any, target: any) => {
    //   t.updateTo('x', end.x, true);
    //   t.updateTo('y', end.y, true);
    // });
    // @ts-ignore
    // this.scene.tween.play();
    // console.log(tween.isPlaying()); // true
  }
}
// .setDisplaySize(640, 480)

export default Map;
