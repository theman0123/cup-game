import { UserInputJsonWorldMap, KeyTypes } from 'interfaces';

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

  process_input(): void {
    if (this.enabled && this.user_inputs) {
      for (const key in this.keys) {
        const phaserKey = this.keys[key as KeyTypes];
        debugger; // justDown
        if (Phaser.Input.Keyboard.JustDown(phaserKey)) {
          const method = this.user_inputs.keydown[key as KeyTypes]
            .method as KeyTypes;
          // call function
          this.scene.players[0][method]();
          // exit function now!
          return;
        }
      }
    }
  }
}

export default UserInput;
