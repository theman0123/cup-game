import JSONLevelScene from './JSONLevelScene';

type PlayerIconType = 'fox-icon';
type EnemyIconType = 'willow-icon';

class HUDScene extends JSONLevelScene {
  playerIcon: Record<PlayerIconType, Phaser.GameObjects.Image> | undefined;
  enemyIcon: Record<EnemyIconType, Phaser.GameObjects.Image> | undefined;
  constructor() {
    super('HUDScene');

    this.prefab_classes = {};
  }

  create() {
    super.create();
    debugger;
    // bring in grid
    if (this.playerIcon) {
      this.playerIcon['fox-icon'].setScale(0.25).setPosition(50, 50);
    }
    if (this.enemyIcon) {
      this.enemyIcon['willow-icon'].setScale(0.25).setPosition(350, 50);
    }
  }

  update() {}
}

export default HUDScene;
