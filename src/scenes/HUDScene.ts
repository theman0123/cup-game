import JSONLevelScene from './JSONLevelScene';
import WorldScene from './WorldScene';

type PlayerIconType = 'fox-icon';
type EnemyIconType = 'willow-icon';

class HUDScene extends JSONLevelScene {
  playerIcon: Record<PlayerIconType, Phaser.GameObjects.Image> | undefined;
  enemyIcon: Record<EnemyIconType, Phaser.GameObjects.Image> | undefined;
  rexUI: any; //plugin without typedefs... :(
  grid: any;
  lowerGrid: any;
  health: any;
  interactive: {
    'touch-icon': Phaser.GameObjects.Image | undefined;
  } = { 'touch-icon': undefined };
  worldScene: WorldScene | undefined;

  constructor() {
    super('HUDScene');

    this.prefab_classes = {};
  }

  create() {
    super.create();
    this.worldScene = this.scene.manager.getScene('WorldScene') as WorldScene;
    this.setupIcons();
    this.setupTouchControls();
  }

  setupTouchControls(): void {
    if (this.interactive['touch-icon']) {
      this.interactive['touch-icon'].setInteractive();
      // listen to pointer up or when touch leaves the graphic?
      // @ts-ignore
      this.interactive['touch-icon'].on(
        'pointermove',
        (pointer: any, dragX: any, dragY: any) => {
          if (pointer.isDown && this.worldScene) {
            if (pointer.prevPosition.x > pointer.x) {
              this.worldScene.players[0].left();
            }
            if (pointer.prevPosition.x < pointer.x) {
              this.worldScene.players[0].right();
            }
          }
        }
      );
      // @ts-ignore
      this.interactive['touch-icon'].on(
        'pointerup',
        (pointer: any, dragX: any, dragY: any) => {
          if (this.worldScene) {
            this.worldScene.players[0].idle();
          }
        }
      );
    }
  }

  setupIcons() {
    let { width, height } = this.sys.game.canvas;

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

    this.lowerGrid = this.rexUI.add
      .gridSizer({
        width: width,
        height: 100,
        column: 3,
        row: 1,
        y: height - 100,
      })
      .setOrigin(0);

    this.lowerGrid.setColumnProportion(0, 0.3);
    this.lowerGrid.setColumnProportion(1, 0);
    this.lowerGrid.setColumnProportion(2, 0.3);

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
    }
    if (this.health) {
      this.grid.add(this.health['health-icon'].setScale(0.5), {
        column: 1,
        row: 0,
        padding: {
          top: 10,
        },
        expand: false,
      });
      // this.health['boss-health'] = this.add.image(0, 0, 'health-icon');
      // using tilemap here....
      this.health['boss-health'] = this.add.image(
        0,
        0,
        'icons',
        '/enemies/hp-meter/willow/willowHP(400x60)-5.png'
      );
      console.log(this.health['boss-health']);
      this.grid.add(this.health['boss-health'].setScale(0.5), {
        column: 3,
        row: 0,
        padding: {
          top: 10,
        },
        expand: false,
      });
    }

    this.lowerGrid.add(
      this.interactive['touch-icon']!.setScale(6, 3).setAlpha(0.4),
      {
        column: 0,
        row: 0,
        padding: { bottom: 10, left: 10 },
        align: 'left',
        expand: false,
      }
    );

    // paint grid items
    this.grid.layout();
    // debugger graphics
    // this.grid.drawBounds(this.add.graphics());

    // paint grid items
    this.lowerGrid.layout();
    // debugger graphics
    // this.lowerGrid.drawBounds(this.add.graphics());
  }

  update() {}
}

export default HUDScene;
