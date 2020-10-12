import { GameScene, PrefabProperties, XY } from 'interfaces';

class Prefab extends Phaser.GameObjects.Sprite {
  scene: GameScene;
  constructor(
    scene: GameScene,
    name: string,
    position: XY,
    properties: PrefabProperties
  ) {
    super(scene, position.x, position.y, properties.texture, properties.frame);

    this.scene = scene;
    this.name = name;
    this.scene.add.existing(this);
    // debugger;
    // if (properties.group === 'players') {
    //   this.scene.players[0].add(this);
    // }
    // if (properties.group === 'boss') {
    //   debugger;
    //   this.scene.boss.add(this);
    // }

    // if (properties.group !== 'players' && properties.group !== 'boss') {
    //   debugger;
    //   this.scene.groups[properties.group].add(this);
    // }
    if (properties.scale) {
      this.setScale(properties.scale.x, properties.scale.y);
    }

    if (properties.anchor) {
      this.setOrigin(properties.anchor.x, properties.anchor.y);
    }

    this.scene.prefabs[name] = this;
  }
}

export default Prefab;
