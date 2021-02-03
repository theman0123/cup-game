import { PrefabProperties } from './PrefabProperties';
import { Item } from './Item';

export interface PrefabSpriteProperties
  extends PrefabProperties,
    character,
    Phaser.Physics.Arcade.Body {
  walking_speed: number;
  animations: Array<string>;
  animationProperties: { [key: string]: AnimationDetails };
  asset_name: string;
  items: Item;
}

interface AnimationDetails {
  frame_width: number;
  frame_height: number;
  frameRate: number;
  max: number;
  prefix: string;
  repeat: number;
  zero_pad: number;
}

interface character {
  hp: number;
}
