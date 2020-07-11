import Prefab from '../prefabs/Prefab';
import TextPrefab from '../prefabs/TextPrefab';
import UserInput from '../plugins/UserInput';

class JSONLevelScene extends Phaser.Scene {
  constructor(key) {
    super({ key: key });
  }

  init(data) {
    this.level_data = data.level_data;
  }

  create() {
    this.players = [];
    this.groups = {};
    let position = 0;
    this.level_data.groups.forEach((group_name) => {
      // debugger; // make player on this.player[0] not aad.group
      // if (group_name === 'players') {
      //   this.players[position] = this.add.sprite({
      //     defaultKey: group_name,
      //   });
      // }
      if (group_name !== 'players') {
        this.groups[group_name] = this.add.group({
          defaultKey: group_name,
        });
      }
    });

    this.prefabs = {};
    for (let sprite_name in this.level_data.sprites) {
      let sprite_data = this.level_data.sprites[sprite_name];
      const animations = this.cache.json.get(
        `animations_${sprite_data.asset_name}`
      );
      if (sprite_data.type === 'tilemap') {
        let map = new this.prefab_classes[sprite_data.group](this, sprite_data);
      }
      if (sprite_data.type === 'spritesheet') {
        this.players[position] = new this.prefab_classes[sprite_data.group](
          this,
          sprite_name,
          sprite_data.position,
          {
            ...sprite_data,
            ...animations,
          }
        );
      }
    }

    this.user_input = new UserInput(this);
    this.user_input_data = this.cache.json.get(this.level_data.user_input.key);
    this.user_input.set_input(this.user_input_data);
  }

  update() {
    for (let prefab_name in this.prefabs) {
      this.prefabs[prefab_name].update();
    }
  }
}

export default JSONLevelScene;
