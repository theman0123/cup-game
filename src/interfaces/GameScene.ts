import { Groups } from './Groups';
import { Players } from './Players';
import JSONLevelScene from 'scenes/JSONLevelScene';

export {};

declare module '../scenes/JSONLevelScene' {
  interface JSONLevelScene {}
}

// GameScene extends JSONLevelScene {groups: Groups}
