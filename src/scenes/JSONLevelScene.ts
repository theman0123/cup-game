import UserInput from '../plugins/UserInput';
import {
  LevelData,
  Prefabs,
  PrefabClasses,
  Groups,
  UserInputJson,
  Data,
  UserInput as Input,
  Players,
} from 'interfaces';

export class JSONLevelScene extends Phaser.Scene {
  level_data: LevelData | undefined;
  players: Players = [];
  prefabs: Prefabs = {};
  prefab_classes: PrefabClasses | undefined;
  groups: Groups = {};
  map: Phaser.Tilemaps.Tilemap | undefined;
  user_input: Input | undefined;
  user_input_data: UserInputJson | undefined;

  constructor(key: string) {
    super({ key: key });
  }

  init(data: Data) {
    this.level_data = data.level_data;
  }

  create() {
    this.players;
    this.groups;
    let position = 0;
    if (this.level_data) {
      this.level_data.groups.forEach((group_name) => {
        if (group_name !== 'players') {
          this.groups[group_name] = this.add.group({
            defaultKey: group_name,
          });

          // debugger; // make player on this.player[0] not aad.group
          // if (group_name === 'players') {
          //   this.players[position] = this.add.sprite({
          //     defaultKey: group_name,
          //   });
          // }
        }
      });

      for (let sprite_name in this.level_data.sprites) {
        let sprite_data = this.level_data.sprites[sprite_name];
        const animations: object = this.cache.json.get(
          `animations_${sprite_data.asset_name}`
        );
        if (sprite_data.type === 'tilemap' && this.prefab_classes) {
          this.map = new this.prefab_classes[sprite_data.group](
            this,
            sprite_data
          );
        }
        if (sprite_data.type === 'spritesheet' && this.prefab_classes) {
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
      this.user_input_data = this.cache.json.get(
        this.level_data.user_input.key
      );
    }

    this.user_input = new UserInput(this);
    this.user_input && this.user_input.set_input(this.user_input_data);
  }

  update() {
    for (let prefab_name in this.prefabs) {
      this.prefabs[prefab_name].update();
    }
  }
}

export default JSONLevelScene;
