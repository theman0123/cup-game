type KeyTypes = 'title' | 'east' | 'hud';

class BootScene extends Phaser.Scene {
  sceneData: { scene: string } = { scene: '' };
  levels: { [key in KeyTypes]: { key: string; path: string } };

  constructor() {
    super({ key: 'BootScene' });
    this.levels = {
      title: { key: 'TitleScene', path: 'assets/levels/title_screen.json' },
      hud: { key: 'HudScene', path: 'assets/levels/hud.json' },
      east: { key: 'WorldScene', path: 'assets/levels/east.json' },
      // east: { key: 'WorldScene', path: 'assets/levels/east.json' }, //menuScene, SelectCharacterScene
      // town: { key: 'WorldScene', path: 'assets/levels/town.json' },
      // cave: { key: 'WorldScene', path: 'assets/levels/cave.json' },
    };
  }

  init(data: { scene: string }) {
    this.sceneData = data;
  }

  preload() {
    for (let level_name in this.levels) {
      // @ts-ignore
      let level = this.levels[level_name];
      this.load.json(level_name, level.path);
    }
  }

  create(data: object) {
    let level_data = this.cache.json.get(this.sceneData.scene);
    this.scene.start('LoadingScene', {
      level_data: level_data,
      // @ts-ignore
      scene: this.levels[this.sceneData.scene].key,
    });
  }
}

export default BootScene;
