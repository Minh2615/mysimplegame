// class Player extends Phaser.GameObjects.Rectangle {
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, number) {
        // super(scene, x, y, 32, 32, 0x00ff00);
        super(scene, x, y, 'player');
        this.setOrigin(0.5);
        this.setScale(0.5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        this.jumping = false;
        this.invincible = false;
        this.health = 10;
        this.body.mass = 10;
        this.body.setDragY = 10;


        // this.body.setAllowGravity(false);
        const alpha = 1 / Phaser.Math.Between(1, 3);
        this.init();
    }

    init() {
        const playerAnimation = this.scene.anims.create({
            key: "player",
            frames: this.scene.anims.generateFrameNumbers("player", {
                start: 0,
                end: 1,
            }),
            frameRate: 2,
        });
        this.play({key: "player", repeat: -1});
    }
}

export default Player;
