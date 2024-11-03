export default class HowToPlay extends Phaser.Scene {
    constructor() {
        super({key: "how_to_play"});
    }
    preload() {
        this.load.image('logo', 'assets/images/logo.png');
        this.load.html('how_to_play', 'assets/text/how-to-play.html');
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.cameras.main.setBackgroundColor(0x0E141B);

        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.add.image(400, 50, 'logo');

        this.showForm();

        this.input.keyboard.on("keydown-SPACE", this.startGame, this);
        this.input.on("pointerdown", (pointer) => this.startGame(), this);
    }

    startGame() {
        this.scene.start("game");
    }

    showForm() {
        const element = this.add.dom(400, 600).createFromCache('how_to_play');
        element.setPerspective(800);
        this.tweens.add({
            targets: element,
            y: 250,
            duration: 3000,
            ease: 'Power3'
        });
    }

}
