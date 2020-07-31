class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    info: { texture: string }
  ) {
    super(scene, x, y, info.texture);
  }

  fire(x: number, y: number) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityY(-300);
  }

  preUpdate(time: any, delta: any) {
    super.preUpdate(time, delta);

    if (this.y <= -32) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(
    scene: Phaser.Scene,
    info: { texture: string; maxQuantity: number }
  ) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: info.maxQuantity,
      key: info.texture,
      active: false,
      visible: false,
      classType: Bullet,
    });
  }

  fireBullet(x: number, y: number) {
    let bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y);
    }
  }
}
