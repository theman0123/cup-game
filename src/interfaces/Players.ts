import { Item } from './Item';

export interface Players extends Array<Phaser.GameObjects.Sprite> {
  items: Item;
}
