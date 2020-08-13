export type Item = {
  [Key in 'equipped']: UseItem[Key];
};

interface UseItem {
  equipped: { use: { [Key in 'fire']: string } };
}
