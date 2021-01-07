import UserInput from '../plugins/UserInput';
import {
  LevelData,
  Prefabs,
  PrefabClasses,
  Groups,
  Data,
  UserInputJsonWorldMap,
} from 'interfaces';
import Map from 'prefabs/world/Map';
import { MapLayers } from 'interfaces/GameScene';
import Player from 'prefabs/world/Player';

export class JSONLevelScene extends Phaser.Scene {
  boss: Phaser.GameObjects.Sprite | undefined;
  items: any; // ???????
  level_data: LevelData | undefined;
  players: Array<Player> = [];
  prefabs: Prefabs = {};
  prefab_classes: PrefabClasses | undefined;
  groups: Groups = {};
  map: Phaser.Tilemaps.Tilemap | undefined;
  MapClass: Map | undefined;
  mapLayers: MapLayers | undefined;
  user_input: UserInput | undefined;
  user_input_data: UserInputJsonWorldMap | undefined;

  constructor(key: string) {
    super({ key: key });
  }

  init(data: Data) {
    this.level_data = data.level_data;
  }

  create() {
    let position = 0;

    if (this.level_data) {
      this.level_data.groups.forEach((group_name) => {
        if (group_name !== 'players') {
          this.groups[group_name] = this.add.group({
            defaultKey: group_name,
          });
        }
      });

      if (this.prefab_classes) {
        for (let sprite_name in this.level_data.sprites) {
          let sprite_data = this.level_data.sprites[sprite_name];
          const animations: object = this.cache.json.get(
            `animations_${sprite_data.asset_name}`
          );

          if (sprite_data.type === 'image') {
            // see what other images you have in 'east' and copy that methodology
            const { asset_name: name, group } = sprite_data;
            // this[name]
            // @ts-ignore
            if (!this[group]) {
              // @ts-ignore
              this[group] = {};
            }
            // @ts-ignore
            this[group][name] = this.add.image(0, 0, name);
          }
          if (sprite_data.type === 'tilemap') {
            this.MapClass = new this.prefab_classes[sprite_data.group](
              this,
              sprite_data
            );
          }

          if (sprite_data.type === 'items') {
            // this.groups = new Bullets(sprite_data.group)
            this.items = new this.prefab_classes[sprite_data.group](
              this,
              sprite_data
            );
          }
          // switch case that call it's own function
          if (sprite_data.type === 'spritesheet') {
            if (sprite_data.group === 'players') {
              this.players[position] = new this.prefab_classes[
                sprite_data.group
              ](this, sprite_name, sprite_data.position, {
                ...sprite_data,
                ...animations,
              });
            }
            if (sprite_data.group === 'items') {
              this.items = new this.prefab_classes[sprite_data.group](
                this,
                { name: sprite_name, maxQuantity: sprite_data.maxQuantity },
                { ...sprite_data, ...animations }
              );
            }
            if (sprite_data.group === 'boss') {
              this.boss = new this.prefab_classes[
                sprite_data.group
              ](this, sprite_name, sprite_data.position, {
                ...sprite_data,
                ...animations,
              });

            }
          }
        }
      }
      if (this.level_data.user_input) {
        this.user_input_data = this.cache.json.get(
          this.level_data.user_input.key
        );
        this.user_input = new UserInput(this);
        this.user_input &&
          this.user_input.set_input(
            this.user_input_data as UserInputJsonWorldMap
          );
      }
    }
    if (this.players.length) {
      this.players[0].items = this.items;
      this.players[0].items!.equipped = this.items;
    }
  }

  update(time: number, delta: number) {
    if (this.user_input) {
      this.user_input.process_input();
    }
  }
}

export default JSONLevelScene;
