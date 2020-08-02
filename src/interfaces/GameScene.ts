import JSONLevelScene from 'scenes/JSONLevelScene';

export interface GameScene extends JSONLevelScene {
  mapLayers: MapLayers;
}

export type MapLayers = {
  [key in 'foreground' | 'backdrop' | 'background']:
    | Phaser.Tilemaps.LayerData
    | Phaser.GameObjects.GameObject;
};
