import Player from './Player.js';

export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }

    preload() {
        console.log("Preloading...");
        Player.preload(this);
    }

    create(){
        console.log("Creating...");
        this.player = new Player({ scene: this, x: 10, y: 10, texture: 'thief', frame: 'thief_idle_1'});
        this.testPlayer = new Player({ scene: this, x: 40, y: 100, texture: 'thief', frame: 'thief_idle_1'});
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
    }

    update(){
        this.player.update();
    }

}
