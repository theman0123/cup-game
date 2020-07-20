import { PrefabProperties } from './PrefabProperties';

export interface PrefabSpriteProperties
  extends PrefabProperties,
    Phaser.Physics.Arcade.Body {
  walking_speed: number;
  animations: Array<string>;
  animationProperties: { [key: string]: AnimationDetails };
  asset_name: string;
}

interface AnimationDetails {
  frame_width: number;
  frame_height: number;
  frameRate: number;
  max: number;
  zero_pad: number;
}
