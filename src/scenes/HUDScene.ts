import JSONLevelScene from './JSONLevelScene';

class HUDScene extends JSONLevelScene {
  constructor() {
    super('HUDScene');
    debugger;

    this.prefab_classes = {};
  }

  create() {
    super.create();
    debugger;
    this.add.image(100, 100, 'fox-icon');
    // gameObject.setScrollFactor(0)
  }

  update() {}
}

export default HUDScene;
