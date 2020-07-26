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
    const { name } = layer;
    if (name === 'foreground') {
      const layer = this.map
        .createDynamicLayer(name, this.tiles)
        .setPipeline('Light2D');

      layer.setOrigin(0, 0);
      layer.setDepth(1);
      layer.setCollisionByProperty({ collision: true });
      // layer.setScale(2);
      // layer.setDisplaySize(1920, this.scene.sys.game.config.height as number);
      // @ts-ignore
      // layer.setCollisionByExclusion(-1, true);
    }
    if (name === 'background') {
      const layer = this.map.createStaticLayer(name, this.tiles);

      layer.setOrigin(0, 0);
      // layer.setDisplaySize(1920, this.scene.sys.game.config.height as number);
    }
    if (name === 'backdrop') {
      const layer = this.map.createStaticLayer(name, this.tiles);

      layer.setOrigin(0, 0);
      layer.setDepth(-1);
      // layer.setDisplaySize(1920, this.scene.sys.game.config.height as number);
    }
    // @ts-ignore
    this.scene.mapLayers[name] = layer;
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
      (obj: { name: string }) => obj.name === 'start'
    );
    const end = object.objects.find(
      (obj: { name: string }) => obj.name === 'end'
    );
    // @ts-ignore
    this.scene[object.name].setDepth(-1);
    // @ts-ignore
    this.scene[object.name].setPosition(start.x, start.y);
    // set up light with tween image
    // @ts-ignore
    this.scene.sunLight = this.scene.lights
      .addLight(600, 0, 1200)
      .setIntensity(1);
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
      intensity: 2,
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
