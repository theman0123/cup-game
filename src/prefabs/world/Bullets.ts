import { PrefabSpriteProperties } from 'interfaces';

export class Bullet extends Phaser.Physics.Arcade.Sprite {
  previousX: number = this.x;
  previousY: number = this.y;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.scene = scene;
  }

  use(x: number, y: number) {
    // @ts-ignore
    this.enableBody();
    if (this.body) {
      this.body.reset(x, y);

      this.setActive(true);
      this.setVisible(true);

      // add conditional to player throwing direction
      this.setVelocityX(300);
      // disable 'bullet' after 4 seconds
      this.scene.time.addEvent({ delay: 4000, callback: this.markAsDead, callbackScope: this });
    }
  }

  markAsDead(): void {
    if (this.body) {
      this.setActive(false);
      this.setVisible(false);
      // gotta disable the body for the physics to respond correctly
      this.disableBody();
    }
  }

  preUpdate(time: any, delta: any) {
    super.preUpdate(time, delta);
    if (this.body) {
      if (this.shouldDestroy()) {
        this.markAsDead();
      }
    }
  }

  shouldDestroy(): boolean {
    const x = +this.x.toFixed(2);
    const y = +this.y.toFixed(2);
    // '+' changed toFixed() to a number again
    if (this.previousX === x && this.previousY === y) {
      return true;
    }
    if (this.y > 400 || this.x > 500) {
      return true;
    }
    this.previousX = x;
    this.previousY = y;
    return false;
  }
}

export class Bullets extends Phaser.Physics.Arcade.Group {
  properties: PrefabSpriteProperties;
  scene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    info: { name: string; maxQuantity: number },
    properties: PrefabSpriteProperties
  ) {
    super(scene.physics.world, scene);
    this.scene = scene;

    this.properties = properties;
    const {
      max,
      zero_pad,
      prefix,
      repeat,
      frameRate,
    } = this.properties.animationProperties.plain;

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
      key: 'sphere-default',
      frames,
      repeat,
      frameRate,
    });

    this.createMultiple({
      frameQuantity: info.maxQuantity,
      key: info.name,
      active: false,
      visible: false,
      classType: Bullet,
    });

    // this.createCallbackHandler(this.children.entries[0])
    // this.scene.physics.add.group(this);

    this.setDepth(1);
  }

  createMultipleCallback = (group: Phaser.GameObjects.GameObject[]) => {
    Phaser.Actions.Call(
      group,
      // @ts-ignore
      (sprite: Phaser.Physics.Arcade.Sprite) => {
        debugger;
        // @ts-ignore
        const { body, height, width } = sprite;
        const { halfWidth } = body as Phaser.Physics.Arcade.Body;

        sprite.setCircle(halfWidth);
        sprite.setBounce(.1)
        body.setMass(.6);
        // @ts-ignore setmaxvelo does exist
        body.setMaxVelocity(300); // pixels per second (pps)
      },
      this
    );
  };

  use(x: number, y: number) {
    let bullet = this.getFirstDead();

    if (bullet) {
      bullet.use(x, y);
    }
  }
}
