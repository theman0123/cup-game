import JSONLevelScene from './JSONLevelScene';

type PlayerIconType = 'fox-icon';
type EnemyIconType = 'willow-icon';

class HUDScene extends JSONLevelScene {
  playerIcon: Record<PlayerIconType, Phaser.GameObjects.Image> | undefined;
  enemyIcon: Record<EnemyIconType, Phaser.GameObjects.Image> | undefined;
  rexUI: any; //plugin without typedefs... :(
  grid: any;

  constructor() {
    super('HUDScene');

    this.prefab_classes = {};
  }

  create() {
    super.create();
    this.setupIcons();
  }

  setupIcons() {
    let { width } = this.sys.game.canvas;

    this.grid = this.rexUI.add
      .gridSizer({
        width: width,
        height: 50,
        column: 5,
        row: 1,
      })
      .setOrigin(0);

    this.grid.setColumnProportion(0, 0.1);
    this.grid.setColumnProportion(1, 0.3);
    this.grid.setColumnProportion(2, 0.1);
    this.grid.setColumnProportion(3, 0.3);
    this.grid.setColumnProportion(4, 0.1);

    // @ts-ignore
    // this.levelText = this.add
    //   .text(0, 0, 'Spring...', {
    //     fontSize: '44px',
    //     fill: '#E8EFEE',
    //     backgroundColor: '#ca3542',
    //     strokeThickness: 4,
    //   })
    //   .setAlpha(0.7)
    //   .setDepth(1);

    // @ts-ignore
    // this.grid.add(this.levelText, 0, 0, Phaser.Display.Align.LEFT_CENTER, {
    //   top: 10,
    //   left: 10,
    // });
    if (this.playerIcon) {
      this.grid.add(this.playerIcon['fox-icon'].setScale(0.2), {
        column: 0,
        row: 0,
        padding: {
          top: 10,
          left: 10,
        },
        expand: false,
      });
      debugger;
      // this.playerIcon['fox-icon'].setScale(0.25).setPosition(50, 50);
    }
    if (this.enemyIcon) {
      this.grid.add(this.enemyIcon['willow-icon'].setScale(0.2), {
        column: 4,
        row: 0,
        padding: {
          top: 10,
          right: 10,
        },
        expand: false,
      });
      this.grid.layout();
      this.grid.drawBounds(this.add.graphics());
    }
  }

  update() {}
}

export default HUDScene;
