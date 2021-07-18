
export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);
        
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y, 10,{isSensor: false, label:'playerCollider'});
        let playerSensor = Bodies.circle(this.x, this.y, 24, {isSensor: true, label:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene) {
        scene.load.atlas('thief', 'assets/images/thief.png', 'assets/images/thief_atlas.json');
        scene.load.animation('thief_anim', 'assets/images/thief_anim.json');
    }

    get velocity() {
        return this.body.velocity;
    }

    update() {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        // Handle Input
        if(this.inputKeys.left.isDown) {
            playerVelocity.x = -1; // Go left
        } else if(this.inputKeys.right.isDown) {
            playerVelocity.x = 1; // Go right
        }
        if(this.inputKeys.up.isDown) {
            playerVelocity.y = -1; // Up
        } else if(this.inputKeys.down.isDown) {
            playerVelocity.y = 1; // Down
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);
        if(Math.abs(this.velocity.x) > 0.01 || Math.abs(this.velocity.y) > 0.01){
            this.anims.play('thief_walk', true);
        } else {
            this.anims.play('thief_idle', true);
        }
    }


}