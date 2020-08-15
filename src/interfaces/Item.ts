export type Item = {
  [Key in 'equipped']: UseItem[Key];
};

interface UseItem {
  equipped: { use: (x?: number, y?: number) => {}; fire: {} }; // {} is not callable
}
