class UserInput {
  constructor(scene) {
    this.scene = scene;

    this.enabled = false;
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

  process_input(event) {
    if (this.enabled) {
      const user_input = this.user_inputs[event.type][event.key];
      const { objectClass, playerPriority } = this.user_inputs[event.type];
      if (user_input) {
        const { method } = user_input;
        let classMethod;
        let context;
        context = this.scene[objectClass][playerPriority];
        classMethod = context[method];
        classMethod.apply(context, user_input.args);

        // let callback_data = user_input.callback.split('.');
        // if (objectClass === 'playe') {
        // } else {
        //   context = this.scene.prefabs[callback_data[0]];
        // }
        // if (user_input.hasOwnProperty('playerPriority')) {
        // }
        // if (!user_input.hasOwnProperty('playerPriority')) {
        //   method = context[callback_data[1]];
        // }
        // debugger;
        // context is sprite
      }
    }
  }
}

export default UserInput;
