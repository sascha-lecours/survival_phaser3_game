
export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);
        // Weapon
        this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 0,0, 'items', 162);
        this.spriteWeapon.setScale(0.75);
        this.spriteWeapon.setOrigin(0.25, 0.75);
        this.scene.add.existing(this.spriteWeapon);
        
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y, 10,{isSensor: false, label:'playerCollider'});
        let playerSensor = Bodies.circle(this.x, this.y, 24, {isSensor: true, label:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();

        // Flip when mouse pointer to left of player
        this.scene.input.on('pointermove', pointer => this.setFlipX(pointer.worldX < this.x));
    }

    static preload(scene) {
        scene.load.atlas('thief', 'assets/images/thief.png', 'assets/images/thief_atlas.json');
        scene.load.animation('thief_anim', 'assets/images/thief_anim.json');
        scene.load.spritesheet('items', 'assets/images/items.png', {frameWidth:32, frameHeight:32});
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
        this.spriteWeapon.setPosition(this.x, this.y);
        this.weaponRotate()
    }

    weaponRotate(){
        let pointer = this.scene.input.activePointer;
        if(pointer.isDown){
            this.weaponRotation += 6;
        } else {
            this.weaponRotation = 0;
        }

        if(this.weaponRotation > 100) this.weaponRotation = 0;

        if(this.flipX){
            this.spriteWeapon.setAngle(-this.weaponRotation - 90);
        } else {
            this.spriteWeapon.setAngle(this.weaponRotation);
        }

    }

}
