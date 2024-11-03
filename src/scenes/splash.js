export default class Splash extends Phaser.Scene {
    constructor() {
        super({key: "splash"});
    }
    preload() {
        // this.load.setBaseURL('https://elwp.rovn.top/wp-content/uploads/ac_assets/game/');
        this.load.image('logo', 'assets/images/logo.png', {
            // baseURL: 'https://elwp.rovn.top/wp-content/uploads/ac_assets/game/',
            // responseType: "blob",
            // crossOrigin: 'anonymous',
        });
        this.load.image('background', 'assets/images/background.jpg', {
            // responseType: "blob"
        });
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.cameras.main.setBackgroundColor(0x0E141B);

        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.add.image(400, 100, 'logo');

        this.showTitle();
        // this.time.delayedCall(1000, () => this.showInstructions(), null, this);

        this.input.keyboard.on("keydown-SPACE", this.startGame, this);
        this.input.on("pointerdown", (pointer) => this.startGame(), this);
    }

    startGame() {
        this.scene.start("how_to_play");
    }

    showTitle() {
        // this.add
        //     .bitmapText(
        //         this.center_width,
        //         50,
        //         "arcade",
        //         this.registry.get("score"),
        //         25
        //     )
        //     .setOrigin(0.5);
        // this.add
        //     .bitmapText(
        //         this.center_width,
        //         this.center_height,
        //         "arcade",
        //         "GAME Start",
        //         45
        //     )
        //     .setOrigin(0.5);

        this.add.text(
            this.center_width,
            this.center_height,
            "GAME START",
            {
                color: 'white',
                fontFamily: 'Arial',
                fontSize: '32px '
            })
            .setOrigin(0.5);

        this.add.text(
            this.center_width,
            this.center_height + 75,
            "Press SPACE or Click to continue!",
            {
                color: 'white',
                fontFamily: 'Arial',
                fontSize: '18px '
            })
            .setOrigin(0.5);

        // this.add
        //     .bitmapText(
        //         this.center_width,
        //         250,
        //         "arcade",
        //         "Press SPACE or Click to continue!",
        //         15
        //     )
        //     .setOrigin(0.5);
    }
    showInstructions() {
        this.add
            .bitmapText(this.center_width, 450, "pico", "WASD/Arrows", 40) .setTint(0x6b140b)
            .setOrigin(0.5)
            .setDropShadow(0, 3, 0x6b302a, 0.9);
        this.add
            .sprite(this.center_width - 140, 355, "pello") .setOrigin(0.5)
            .setScale(0.5);
        this.add
            .bitmapText(this.center_width + 60, 350, "pico", "By PELLO", 35) .setTint(0x6b140b)
            .setOrigin(0.5)
            .setDropShadow(0, 3, 0x6b302a, 0.9);
        this.space = this.add
            .bitmapText(this.center_width, 520, "pico", "SPACE start", 30) .setTint(0x6b140b)
            .setOrigin(0.5)
            .setDropShadow(0, 2, 0x6b302a, 0.9);
        this.tweens.add({
            targets: this.space, duration: 300,
            alpha: { from: 0, to: 1 }, repeat: -1,
            yoyo: true, });
    }
}
