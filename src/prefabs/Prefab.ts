import { GameScene } from 'interfaces';
import JSONLevelScene from 'scenes/JSONLevelScene';

interface Properties {
  group: string;
  scale: XY;
  anchor: XY;
  texture: string;
  frame: number;
}

interface XY {
  x: number;
  y: number;
}
class Prefab extends Phaser.GameObjects.Sprite {
  constructor(
    scene: JSONLevelScene,
    name: string,
    position: { x: number; y: number },
    properties: Properties
  ) {
    super(scene, position.x, position.y, properties.texture, properties.frame);

    this.scene = scene;
    this.name = name;
    this.scene.add.existing(this);
    // debugger;
    // if (properties.group === 'players') {
    //   this.scene.players[0].add(this);
    // }
    if (properties.group !== 'players') {
      this.scene.groups[properties.group].add(this);
    }
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
