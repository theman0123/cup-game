class Map {
  // scene, name, position, properties
  constructor(scene, info) {
    this.scene = scene;
    this.scene.add.image(0, 0, info.asset_name).setOrigin(0, 0);
    this.map = this.scene.make.tilemap({ key: info.tiled_key });
    this.tiles = this.map.addTilesetImage('tiles', 'spring1a');
    this.sky = this.map
      .createStaticLayer('sky', this.tiles)
      .setDisplaySize(640, 480); //(0.5);
    this.mountians = this.map
      .createStaticLayer('mountains', this.tiles, 0, 0)
      .setDisplaySize(640, 480);
    this.grass = this.map
      .createDynamicLayer('grass', this.tiles)
      .setDisplaySize(640, 480);
    this.fence = this.map
      .createDynamicLayer('fence', this.tiles)
      .setDisplaySize(640, 480);
    // this.skyImage = this.scene.add.sprite(0, 0, 'spring1', 'sky(864x486).png');
    this.sun = this.map
      .createDynamicLayer('sun', this.tiles)
      .setDisplaySize(640, 480);
    console.log(this.map.getLayer(this.sun));
    // this.sky = this.map.addTilesetImage('sky(864x486).png', this.skyImage);
    // this.skyLayer = this.map.createStaticLayer('Sky', this.sky);
    // console.log(
    //   this.scene.textures.get('spring1/sky(864x486).png', this.scene.textures)
    // );

    // super(scene, name, position, properties);
    // this.properties = properties;
    // // this.scene = scene;
    // // add to physics
    // this.scene.matter.add.gameObject(this);
    // this.walking_speed = +properties.walking_speed;
    // this.body.collideWorldBounds = true;
    // // this.scene.physics.add.collider(this, this.scene.layers.buildings);
    // this.moving = { left: false, right: false, up: false, down: false };
    // // create animations
    // properties.animations.map(this.createAnimations, this);
    // // enable lighting system for player
    // this.setPipeline('Light2D');
    // this.anims.play('idle');
    // if (!this.scene.anims.anims.has('walking_down')) {
    //   this.scene.anims.create({
    //     key: 'walking_down',
    //     frames: this.scene.anims.generateFrameNumbers(this.texture.key, {
    //       frames: [0, 4, 8, 12],
    //     }),
    //     frameRate: 6,
    //     repeat: -1,
    //   });
    // }
    // if (!this.scene.anims.anims.has('walking_up')) {
    //   this.scene.anims.create({
    //     key: 'walking_up',
    //     frames: this.scene.anims.generateFrameNumbers(this.texture.key, {
    //       frames: [1, 5, 9, 13],
    //     }),
    //     frameRate: 6,
    //     repeat: -1,
    //   });
    // }
    // if (!this.scene.anims.anims.has('walking_left')) {
    //   this.scene.anims.create({
    //     key: 'walking_left',
    //     frames: this.scene.anims.generateFrameNumbers(this.texture.key, {
    //       frames: [2, 6, 10, 14],
    //     }),
    //     frameRate: 6,
    //     repeat: -1,
    //   });
    // }
    // if (!this.scene.anims.anims.has('idle')) {
    //   this.scene.anims.create({
    //     key: 'idle',
    //     frames: this.scene.anims.generateFrameNumbers(this.texture.key, {
    //       frames: [3, 7, 11, 15],
    //     }),
    //     frameRate: 6,
    //     repeat: -1,
    //   });
    // }
    // this.stopped_frames = [0, 1, 0, 2, 3];
  }
}

export default Map;
