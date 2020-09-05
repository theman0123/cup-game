import { Sprites, UserInputJson } from 'interfaces';

export interface LevelData {
  groups: Array<string>;
  sprites: Sprites;
  user_input?: UserInputJson;
}
