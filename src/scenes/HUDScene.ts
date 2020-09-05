import JSONLevelScene from './JSONLevelScene';

class HUDScene extends JSONLevelScene {
  constructor() {
    super('HUDScene');

    this.prefab_classes = {};
  }

  create() {
    super.create();

    this.add.image(100, 100, 'fox-icon');
    // cameras.main.setScrollFactor(0)
  }

  update() {}
}

export default HUDScene;
