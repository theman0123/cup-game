import { XY } from './XY';

export interface PrefabTextProperties {
  text: string;
  style: Phaser.GameObjects.TextStyle;
  group: string;
  scale: XY;
  anchor: XY;
}
