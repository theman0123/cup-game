export type Item = {
  [Key in 'equipped']: UseItem[Key];
};

interface UseItem {
  equipped: { use: (x?: number, y?: number) => {}; fire: {} }; // {} is not callable
}

export interface ItemBase extends Phaser.GameObjects.Sprite {
  markAsDead: () => {};
}
