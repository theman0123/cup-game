import JSONLevelScene from './JSONLevelScene';

class HUDScene extends JSONLevelScene {
  constructor() {
    super('HUDScene');

    this.prefab_classes = {};
  }

  create() {
    super.create();
    // cameras.main.setScrollFactor(0)
  }

  update() {}
}

export default HUDScene;
