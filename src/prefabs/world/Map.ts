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
    // .setCollision(true)
    // .setCollisionFromCollisionGroup();
    // this.scene.matter.add.gameObject(this[name]);
    // this[name].setCollisionByExlusion([-1, 0]);
  }

  handleObjectLayers(object: { [key: string]: any }) {
    if (object.name === 'light-source') {
      this.setupLights(object);
    }

    if (object.name === 'enemy') {
      this.setupEnemy(object);
    }

    if (object.name === 'goal') {
      this.setupGoal(object);
    }
  }

  setupEnemy(object: { [key: string]: any }): void {
    const start = object.objects.find(
      (obj: { name: string }) => obj.name === 'enemy_start'
    );
    this.scene.boss?.setPosition(start.x, start.y);
  }

  setupGoal(object: { [key: string]: any }): void {
    debugger;
    // position hit area
    // get overlap to work
    // see if you have animations for the tree
    // play animation
    // take away health
    const goal = object.objects.find(
      (obj: { name: string }) => obj.name === 'goal'
    );

    //  @ts-ignore
    this.scene.goal = this.scene.add.zone(goal.x, goal.y, 0, 0);

    this.scene.physics.world.enable(goal);
    //  @ts-ignore
    this.scene.goal.body = new Phaser.Physics.Arcade.Body(
      this.scene.physics.world,
      //  @ts-ignore
      this.scene.goal
    );
    //  @ts-ignore
    this.scene.goal.body.setCircle(50);
    //  @ts-ignore
    // this.scene.goal.body.setAllowGravity(false);
    //  @ts-ignore
    // this.scene.goal.body.moves = false;
    // create a collision area
    this.scene.physics.add.overlap(this.scene.items, goal);

    // @ts-ignore
    // debugGraphics ? debugGraphics.clear() : null;
    const debugGraphics = this.scene.add.graphics(); //.setAlpha(0.75); //.setScale(2);
    // @ts-ignore
    this.scene.goal.body.drawDebug(debugGraphics, {
      tileColor: null, //new Phaser.Display.Color(40, 39, 37, 255),
      collidingTileColor: new Phaser.Display.Color(40, 39, 37, 255),
      faceColor: null,
    });
    debugGraphics.depth = 1;
  }

  setupLights(object: { [key: string]: any }): void {
    const start = object.objects.find(
      (obj: { name: string }) => obj.name === 'Start'
    );
    const end = object.objects.find(
      (obj: { name: string }) => obj.name === 'End'
    );
    // @ts-ignore
    this.scene.sceneLights[object.name].setDepth(-1);
    // @ts-ignore
    this.scene.sceneLights[object.name].setPosition(start.x, start.y);
    // set up light with tween image
    // @ts-ignore
    this.scene.sunLight = this.scene.lights
      .addLight(600, 0, 1200)
      .setIntensity(0.2);
    // @ts-ignore
    this.scene.tween = this.scene.tweens.add({
      // @ts-ignore
      targets: [this.scene.sceneLights[object.name], this.scene.sunLight],
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

export default Map;
