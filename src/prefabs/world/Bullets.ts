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
      debugger;
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

export class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(
    scene: Phaser.Scene,
    info: { name: string; maxQuantity: number }
  ) {
    super(scene.physics.world, scene);
    debugger; // info
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
