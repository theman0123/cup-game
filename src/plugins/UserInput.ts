import {
  UserInputJsonWorldMap,
  KeyTypes,
  // EventTypes,
  // KeyTypes,
  // KeyValue,
} from 'interfaces';

interface MyScene extends Phaser.Scene {
  [key: string]: any;
}

type Keys = {
  [key in KeyTypes]: Phaser.Input.Keyboard.Key;
};

class UserInput {
  enabled: boolean;
  keys: Keys | null = null;
  scene: MyScene;
  user_inputs: UserInputJsonWorldMap | undefined;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.enabled = false;
  }

  set_input(user_input_data: UserInputJsonWorldMap) {
    this.keys = this.scene.input.keyboard.addKeys({
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
      space: 'space',
    }) as Keys;

    this.scene.input.keyboard.removeAllListeners('keydown');
    this.scene.input.keyboard.removeAllListeners('keyup');

    this.scene.input.keyboard.on('keydown', this.process_input, this);
    this.scene.input.keyboard.on('keyup', this.process_input, this);

    this.user_inputs = user_input_data;

    this.enabled = true;
  }

  getClassMethod(
    method: string,
    objectClass: string,
    playerPriority: number
  ): any {
    let context;
    context = this.scene[objectClass][playerPriority];

    return { classMethod: context[method], classContext: context };
  }

  // event: { type: EventTypes; code: KeyTypes }
  process_input(): void {
    if (this.enabled && this.user_inputs) {
      this.scene.players[0].idle();
      for (const key in this.keys) {
        const phaserKey = this.keys[key as KeyTypes];
        if (phaserKey.isDown) {
          const method = this.user_inputs.keydown[key as KeyTypes]
            .method as KeyTypes;
          debugger;
          this.scene.players[0][method]();
        }
      }
    }
    //     const user_input: KeyValue = this.user_inputs[event.type][event.code];
    //     const { objectClass, playerPriority } = this
    //       .user_inputs as UserInputJsonWorldMap;
    //     console.log(user_input, user_input.method, this);
    //     if (user_input && user_input.method) {
    //       const { classMethod, classContext } = this.getClassMethod(
    //         user_input.method,
    //         objectClass,
    //         playerPriority
    //       );
    //       classMethod.apply(classContext); // user_input.args to pass arguments
    //     }
    //   }
  }
}

export default UserInput;

// isKeyDown(key) {
//   this[`is_${key}_down`] = this.cursorKeys[key].isDown;
//   return this.cursorKeys[key].isDown;
// }

// isKeyUp(key) {
//   this[`is_${key}_up`] = this.cursorKeys[key].isDown;
//   return this.cursorKeys[key].isDown;
// }

// isIdle() {
//   return !this.cursorKeys.right.isDown && !this.cursorKeys.left.isDown;
// }

// this.cursorKeys = scene.input.keyboard.createCursorKeys();

// this.is_up_down = this.cursorKeys.up.isDown;
// this.is_down_down = this.cursorKeys.down.isDown;
// this.is_left_down = this.cursorKeys.left.isDown;
// this.is_right_down = this.cursorKeys.right.isDown;
// this.is_space_down = this.cursorKeys.space.isDown;
// this.is_shift_down = this.cursorKeys.shift.isDown;

// this.is_up_up = this.cursorKeys.up.isUp;
// this.is_down_up = this.cursorKeys.down.isUp;
// this.is_left_up = this.cursorKeys.left.isUp;
// this.is_right_up = this.cursorKeys.right.isUp;
// this.is_space_up = this.cursorKeys.space.isUp;
// this.is_shift_up = this.cursorKeys.shift.isUp;

// this.keyObj = this.input.keyboard.addKey('W'); // Get key object
// this.keyObj.on('down', function (event) {
//   console.log('w');
// });
// this.keyObj.on('up', function (event) {
//   /* ... */
// });
