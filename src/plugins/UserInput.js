class UserInput {
  constructor(scene) {
    this.scene = scene;

    this.enabled = false;

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
  }

  // this.keyObj = this.input.keyboard.addKey('W'); // Get key object
  // this.keyObj.on('down', function (event) {
  //   console.log('w');
  // });
  // this.keyObj.on('up', function (event) {
  //   /* ... */
  // });

  set_input(user_input_data) {
    this.scene.input.keyboard.removeAllListeners('keydown');
    this.scene.input.keyboard.removeAllListeners('keyup');

    this.scene.input.keyboard.on('keydown', this.process_input, this);
    this.scene.input.keyboard.on('keyup', this.process_input, this);

    this.user_inputs = user_input_data;

    this.enabled = true;
  }

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

  getClassMethod(method, objectClass, playerPriority) {
    let classMethod;
    let context;
    context = this.scene[objectClass][playerPriority];
    classMethod = context[method];

    return { classMethod: context[method], classContext: context };
  }

  process_input(event) {
    if (this.enabled) {
      const user_input = this.user_inputs[event.type][event.key];
      const { objectClass, playerPriority } = this.user_inputs;
      debugger;
      if (user_input && user_input.method) {
        const { classMethod, classContext } = this.getClassMethod(
          user_input.method,
          objectClass,
          playerPriority
        );
        classMethod.apply(classContext, user_input.args);
      }
    }
  }
}

export default UserInput;
