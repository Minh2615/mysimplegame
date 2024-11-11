export default class Banner {
    constructor(scene) {
        this.scene = scene;
        this.scene.time.delayedCall(0, () => this.init(), null, this);
        this.pinos = 0;
    }

    init() {
        this.generateBanner();
    }
    generateBanner() {

        new BannerTop(
            this.scene,
            500,
            220,
            'banner_top'
        );
    }
}

class BannerTop extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture_name) {
        super(scene, x, y, texture_name);
        scene.add.existing(this);
        // scene.physics.add.existing(this);
        // this.body.setAllowGravity(false);
        const alpha = 1 / Phaser.Math.Between(1, 3);
        this.setOrigin(0.5);
        this.setScale(1);
        this.init(texture_name);
    }

    init(texture_name) {
        this.scene.anims.create({
            key: texture_name,
            frames: this.scene.anims.generateFrameNumbers(texture_name, {
                start: 0,
                end: 1,
            }),
            frameRate: 2,
        });
        this.play({key: texture_name, repeat: -1});
    }
}