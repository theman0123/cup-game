import JSONLevelScene from './JSONLevelScene';
import Player from '../prefabs/world/Player';
import { Bullets } from '../prefabs/world/Bullets';
import Map from '../prefabs/world/Map';
import { PrefabProperties } from 'interfaces';
import Boss from '../prefabs/world/Boss';

class WorldScene extends JSONLevelScene {
  light: Phaser.GameObjects.Light | undefined;

  constructor() {
    super('WorldScene');

    this.prefab_classes = {
      players: Player.prototype.constructor,
      map: Map.prototype.constructor,
      items: Bullets.prototype.constructor,
      boss: Boss.prototype.constructor,
    };
  }

  create() {
    super.create();

    this.lights.enable().setAmbientColor(0xf3c260);
    this.lights.addLight(600, 0, 1200).setIntensity(1);

    if (this.map && this.MapClass) {
      this.map.objects.map((object) =>
        this.MapClass!.handleObjectLayers(object)
      );
    }

    // @ts-ignore
    // this.add.tween({
    //   // @ts-ignore
    //   targets: [this.lights],
    //   ambientColor: 'orange',
    //   duration: 5000,
    //   yoyo: true,
    //   repeat: -1,
    // });
    //setColor() 1000);
    this.mainCamera = this.cameras.main;
    this.cameras.main.setBounds(
      0,
      0,
      this.sys.game.config.width as number,
      this.sys.game.config.height as number
    );
    this.cameras.main.fadeIn(1000);
    // this.cameras.main.setBounds(0,0, this.scene //.width, this.game.sys.height);
    // won't follow player after setting bounds?....
    // I think you need a secondary camera?
    // @ts-ignore
    // this.cameraPlayer = new Phaser.Cameras.Scene2D.Camera(
    //   0,
    //   0,
    //   this.sys.game.config.width as number,
    //   this.sys.game.config.height as number
    // );
    // @ts-ignore
    this.cameras.main.startFollow(this.players[0]);
    // this.cameras.main.setZoom(0.5);

    // collision between players and tiles
    if (this.mapLayers) {
      // const test =
      this.physics.add.collider(
        this.players[0],
        this.mapLayers.foreground as Phaser.GameObjects.GameObject
        // (objA, objB) => {
        // play landing animation when collision with ground;
        // if pressing left/right, play walk animation (i.e. after 2nd frame)
        //   console.log('collision')
        // }
      );

      this.physics.add.collider(
        this.mapLayers.foreground as Phaser.GameObjects.GameObject,
        this.items
      );
      this.physics.add.collider(this.items, this.items);
    }

    if (!this.game.scale.isFullscreen) {
      this.fullScreenPrompt();
    }
    // can only launch a scene from inside a scene
    this.scene.launch('BootScene', { scene: 'hud' });
  }

  update() {}

  create_object(object: {
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
    name: string;
    properties: PrefabProperties;
  }) {
    let position = {
      x: object.x + object.width / 2,
      y: object.y + object.height / 2,
    };
    if (
      this.prefab_classes &&
      this.prefab_classes.hasOwnProperty(object.type)
    ) {
      new this.prefab_classes[object.type](
        this,
        object.name,
        position,
        object.properties
      );
    }
  }

  fullScreenPrompt(): void {
    const helloButton = this.add
      .text(100, 300, 'FullScreen', {
        fill: '#fff',
      })
      .setDepth(2);
    helloButton.setInteractive();
    helloButton.on('pointerover', () => {
      console.log('pointerover');
    });
    helloButton.on('pointerdown', () => {
      console.log('pointerdown');
      this.game.scale.startFullscreen();
      helloButton.destroy();
    });
    // Phaser.Display.Align.In.Center(helloButton, pic);
  }
}

export default WorldScene;
