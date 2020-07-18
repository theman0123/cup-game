import { GameScene, XY, PrefabProperties } from 'interfaces';

class TextPrefab extends Phaser.GameObjects.Text {
  scene: GameScene;

  constructor(
    scene: GameScene,
    name: string,
    position: XY,
    properties: PrefabTextProperties
  ) {
    super(scene, position.x, position.y, properties.text, properties.style);

    this.scene = scene;
    this.name = name;
    this.scene.add.existing(this);
    this.scene.groups[properties.group].add(this);

    if (properties.scale) {
      this.setScale(properties.scale.x, properties.scale.y);
    }

    if (properties.anchor) {
      this.setOrigin(properties.anchor.x, properties.anchor.y);
    }

    this.scene.prefabs[name] = this;
  }
}

export default TextPrefab;
