import JSONLevelScene from 'scenes/JSONLevelScene';

export interface GameScene extends JSONLevelScene {
  goal: Phaser.GameObjects.Zone;
  mapLayers: MapLayers;
}

export type MapLayers = {
  [key in 'foreground' | 'backdrop' | 'background']:
    | Phaser.Tilemaps.LayerData
    | Phaser.GameObjects.GameObject;
};
