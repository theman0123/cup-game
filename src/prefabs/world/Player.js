import Prefab from '../Prefab';

class Player extends Prefab {
  constructor(scene, name, position, properties) {
    super(scene, name, position, properties);
    this.properties = properties;
    // this.scene = scene;
    // add to physics
    // this.scene.matter.add.gameObject(this);

    this.walking_speed = +properties.walking_speed;

    scene.physics.world.enable(this);
    this.body.collideWorldBounds = true;

    this.body.setMaxSpeed(200);
    this.setDisplayOrigin(0, 0);
    // this.scene.physics.add.collider(this, this.scene.layers.buildings);

    // this.moving = { left: false, right: false, up: false, down: false };

    // create animations
    properties.animations.map(this.createAnimations, this);
    // enable lighting system for player
    this.setPipeline('Light2D');

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

  create() {}

  createAnimations(animation) {
    const {
      frame_width,
      frame_height,
      frameRate,
      max,
      zero_pad,
    } = this.properties.animationProperties[animation];
    const frames = this.scene.anims.generateFrameNames(
      this.properties.asset_name,
      {
        end: max,
        zeroPad: zero_pad || 2,
        prefix: `${animation}/${animation}(${frame_width}x${frame_height})-`,
        suffix: '.png',
      }
    );
    this.scene.anims.create({
      key: animation,
      frames,
      repeat: -1,
      frameRate,
    });

    this.anims.play('idle');
  }

  update() {
    // debugger;
    // if (this.body) {
    // }
  }

  idle() {
    this.body.setVelocityX(0);
    this.anims.play('idle');
  }

  jump() {
    debugger;
    this.body.setVelocityY(-180);
  }
  left() {
    this.body.setVelocityX(-150);
    this.setFlipX(true);
    this.playWalkAnim();
  }
  right() {
    this.body.setVelocityX(150);
    this.setFlipX(false);
    this.playWalkAnim();
  }

  playWalkAnim() {
    if (this.anims.currentAnim.key !== 'walkR-itemhold') {
      this.anims.play('walkR-itemhold');
    }
  }

  // change_movement(direction, move) {
  //   this.moving[direction] = move;
  // }
}

export default Player;
