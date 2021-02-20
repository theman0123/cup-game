import Prefab from '../Prefab';
import { PrefabSpriteProperties, GameScene, XY, Item } from 'interfaces';
import { BehaviorSubject } from 'rxjs';

class Player extends Prefab {
  items: Item | undefined;
  properties: PrefabSpriteProperties;
  walking_speed: number;
  body: Phaser.Physics.Arcade.Body;
  blockAnimation: boolean = false;
  hp: BehaviorSubject<number> = new BehaviorSubject(100);

  constructor(
    scene: GameScene,
    name: string,
    position: XY,
    properties: PrefabSpriteProperties
  ) {
    super(scene, name, position, properties);
    this.properties = properties;
    this.scene = scene;
    this.items = properties.items;

    this.walking_speed = +properties.walking_speed;

    this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
    scene.physics.world.enable(this);

    this.setScale(0.5);
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.body.setSize(this.width, this.height, true);
      },
      callbackScope: this,
      loop: false,
    });
    // this.body.collideWorldBounds = true;

    // working here: attach an event to the body speed. when it hits 0, play this.idle()
    // this.addListener('body')
    // @ts-ignore
    // this.bodySpeedEventEmitter = new Phaser.Events.EventEmitter();
    // debugger;
    // this.body.addListener('speed', )

    this.body.setMaxSpeed(200);

    this.setPosition(100, 100);
    // this.scene.physics.add.collider(this, this.scene.layers.buildings);

    // this.moving = { left: false, right: false, up: false, down: false };

    // create animations
    properties.animations.map(this.createAnimations, this);
    // enable lighting system for player
    this.setPipeline('Light2D');
    this.setDepth(1);

    // this.body.setBounce(0.1, 0.1);
    this.body.setMass(0.9);

    // this.setDepth(-1);
    // this.body.setAllowDrag(false);
    // this.body.setDrag(0.5, 0.5);
    // this.body.setAngularDrag(5);
    // this.setupItems();
  }

  create() {}

  createAnimations(animation: string) {
    const {
      frameRate,
      max,
      zero_pad,
      prefix,
      repeat,
    } = this.properties.animationProperties[animation];
    const frames = this.scene.anims.generateFrameNames(
      this.properties.asset_name,
      {
        end: max,
        zeroPad: zero_pad || 2,
        prefix: prefix,
        suffix: '.png',
      }
    );
    this.scene.anims.create({
      key: animation,
      frames,
      repeat,
      frameRate,
    });

    this.anims.play('idle');
  }

  update() {}

  idle() {
    // debugger;
    if (!this.blockAnimation) {
      this.body.setVelocityX(0);
      // this.body.setAccelerationX(0);
      this.anims.play('idle');
    }
  }

  throw() {
    // debugger;
    this.anims.play('short-toss', true);
    this.blockAnimation = true;
    this.on('animationcomplete', () => {
      // useItem was being called multiple times
      // this.blockAnimation is throttling the call
      if (this.blockAnimation) {
        this.useItem();
        this.blockAnimation = false;
        this.anims.play('idle', true);
      }
    });
  }

  jump() {
    if (this.body.blocked.down) {
      // play animation
      // this.blockAnimation = true;
      this.body.setVelocityY(-480);
    }
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
    const { key } = this.anims.currentAnim;
    if (key !== 'walk' && key !== 'short-toss') {
      this.anims.play('walk');
    }
  }
  useItem(): void {
    if (this.items?.equipped) {
      this.items.equipped.use(this.body.x + this.width / 2, this.body.y);
    }
  }

  // setupItems(): void {
  //   console.log(this.properties);
  // }
}

export default Player;
