import JSONLevelScene from './JSONLevelScene';

class HUDScene extends JSONLevelScene {
  playerIcon: Phaser.GameObjects.Image | undefined;
  constructor() {
    super('HUDScene');

    this.prefab_classes = {};
  }

  create() {
    super.create();
    debugger;
    // @ts-ignore
    this.playerIcon['fox-icon'].setScale(0.25).setPosition(50, 50);
  }

  update() {}
}

export default HUDScene;
