export type UserInputJsonWorldMap = {
  [key in EventTypes]: Key;
} & {
  objectClass: string;
  playerPriority: number;
  keydown: Key;
  keyup: Key;
};

export type EventTypes = 'keydown' | 'keyup';
export type KeyTypes = 'up' | 'down' | 'left' | 'right';

export type Key = {
  [key in KeyTypes]: KeyValue;
};

export interface KeyValue {
  method: string;
}
