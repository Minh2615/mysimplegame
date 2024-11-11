import WebFontFile from "../gameobjects/WebFontFile.js";

export default class HowToPlay extends Phaser.Scene {
    constructor() {
        super({key: "how_to_play"});
    }
    preload() {
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('how_to_play_bg', 'assets/images/how_to_play_bg.png');
        this.load.html('how_to_play', 'assets/text/how-to-play.html');
        this.load.addFile(new WebFontFile(this.load, 'Poppins'))
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.cameras.main.setBackgroundColor(0x0E141B);

        this.add.image(-30, 50, 'background').setOrigin(0.5, 0.105).setScale('0.8');
        this.add.image( this.center_width, 70, 'logo').setOrigin(0.5).setScale('0.3');
        this.add.image( this.center_width, this.height - 220, 'how_to_play_bg').setOrigin(0.5).setScale('0.7');

        this.showForm();

        // this.graphics = this.add.graphics();
        // this.graphics.fillStyle(0xffffff, 1);
        //  10px radius on the corners
        // this.graphics.fillRoundedRect(this.center_width - 110, this.center_height + 170, 220, 30, 15);
        //
        // this.scoreText = this.add.text(
        //     this.center_width - 50,
        //     this.center_height + 176,
        //     "Let’s Sleigh",
        //     {
        //         fontFamily: 'Poppins, Georgia, Times, serif',
        //         color: '#c35051',
        //         fixedWidth: 100,
        //         fixedHeight: 0,
        //         align: "center"
        //     },
        //     16
        // );

        // this.input.keyboard.on("keydown-SPACE", this.startGame, this);
        // this.input.on("pointerdown", (pointer) => this.startGame(), this);
    }

    startGame() {
        this.scene.start("game");
    }

    showForm() {
        let self = this;
        const element = this.add.dom(this.center_width, this.height - 275).createFromCache('how_to_play');

        element.addListener('click');
        element.on('click', function (event) {
            const inputAgree = element.getChildByID('agreeInput');
            if (event.target.name === 'submitButton')
            {
                if (inputAgree.checked === true) {
                    self.startGame();
                }
            }
        })
    }
}
