import Prefab from '../Prefab';
import { PrefabSpriteProperties, GameScene, XY } from 'interfaces';

class Player extends Prefab {
  properties: PrefabSpriteProperties;
  walking_speed: number;
  body: Phaser.Physics.Arcade.Body;

  constructor(
    scene: GameScene,
    name: string,
    position: XY,
    properties: PrefabSpriteProperties
  ) {
    super(scene, name, position, properties);
    this.properties = properties;
    this.scene = scene;

    this.walking_speed = +properties.walking_speed;

    this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
    scene.physics.world.enable(this);

    this.body.setSize(50, 150);

    // this.body.collideWorldBounds = true;

    this.body.setMaxSpeed(200);

    this.setPosition(100, 100);
    // this.scene.physics.add.collider(this, this.scene.layers.buildings);

    // this.moving = { left: false, right: false, up: false, down: false };

    // create animations
    properties.animations.map(this.createAnimations, this);
    // enable lighting system for player
    // this.setPipeline('Light2D');
    // this.setDepth(-1);
    this.setPipeline('Light2D');
    this.setDepth(1);

    this.body.setBounce(0.2, 0.2);
    this.body.setMass(0.7);
    this.body.setDrag(0.5, 0.5);
    // this.body.setAngularDrag(5);
    // this.setupItems();
  }

  create() {}

  createAnimations(animation: string) {
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
    // debugger;
    this.body.setVelocityY(-480);
    this.body.setVelocityX(250);
  }
  left() {
    this.body.setVelocityX(-250);
    this.setFlipX(true);
    this.playWalkAnim();
  }
  right() {
    this.body.setVelocityX(250);
    this.setFlipX(false);
    this.playWalkAnim();
  }

  playWalkAnim() {
    if (this.anims.currentAnim.key !== 'walkR-itemhold') {
      this.anims.play('walkR-itemhold');
    }
  }

  // setupItems(): void {
  //   console.log(this.properties);
  // }
}

export default Player;
