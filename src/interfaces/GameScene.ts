import JSONLevelScene from 'scenes/JSONLevelScene';

export interface GameScene extends JSONLevelScene {
  mapLayers: Phaser.Tilemaps.LayerData;
}
