import { PrefabSpriteProperties } from 'interfaces';

export class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    debugger; // info
  }

  fire(x: number, y: number) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityX(300);
  }

  preUpdate(time: any, delta: any) {
    super.preUpdate(time, delta);

    if (this.y <= -32) {
      // this.anims.play('sphere-default');
      debugger;
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

export class Bullets extends Phaser.Physics.Arcade.Group {
  properties: PrefabSpriteProperties;

  constructor(
    scene: Phaser.Scene,
    info: { name: string; maxQuantity: number },
    properties: PrefabSpriteProperties
  ) {
    super(scene.physics.world, scene);
    this.properties = properties;
    const {
      max,
      zero_pad,
      prefix,
      repeat,
      frameRate,
    } = this.properties.animationProperties.plain;
    debugger; // info

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

    this.setDepth(5);

    this.fireBullet(0, 0);
  }

  fireBullet(x: number, y: number) {
    let bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y);
    }
  }
}
