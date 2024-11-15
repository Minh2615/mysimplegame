import WebFontFile from "../gameobjects/WebFontFile";
import Banner from "../gameobjects/Banner";

export default class Splash extends Phaser.Scene {
    constructor() {
        super({key: "splash"});
    }
    preload() {
        // this.load.setBaseURL('https://elwp.rovn.top/wp-content/uploads/ac_assets/game/');
        // this.load.image('logo', '/assets/images/logo.png', {
        //     // baseURL: 'https://elwp.rovn.top/wp-content/uploads/ac_assets/game/',
        //     // responseType: "blob",
        //     // crossOrigin: 'anonymous',
        //     // 'headers': {
        //     //     "Content-Security-Policy"   : "img-src 'self' blob: data: https://elwp.rovn.top;",
        //     // }
        // });

        this.load.spritesheet("banner_top", "./assets/images/banner_top.png", {
            frameWidth: 680,
            frameHeight: 300,
        });

        this.load.image('background', '/assets/images/scene_game.png', {
            // responseType: "stream"
            // 'headers': {
            //     "Content-Security-Policy"   : "img-src 'self' blob: data: https://elwp.rovn.top;",
            // }
        });

        this.load.addFile(new WebFontFile(this.load, 'Poppins'))
    }

    create() {



        // alert(window.WebGLRenderingContext);
        // alert(this.sys.game.renderer.getMaxTextureSize() );


        this.generator = new Banner(this);
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.cameras.main.setBackgroundColor(0x0E141B);

        this.add.image(-30, 64, 'background').setOrigin(0.5, 0.105).setScale('0.8');
        // this.add.image( this.center_width, this.center_height - 20, 'logo').setOrigin(0.5).setScale('0.8');

        this.showTitle();
        this.input.keyboard.on("keydown-SPACE", this.startGame, this);
        this.input.on("pointerdown", (pointer) => this.startGame(), this);
    }

    startGame() {
        this.scene.start("how_to_play");
    }

    showTitle() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xc35051, 1);
        //  10px radius on the corners
        this.graphics.fillRoundedRect(this.center_width - 120, this.center_height + 150, 240, 40, 20);

        this.scoreText = this.add.text(
            this.center_width - 50,
            this.center_height + 160,
            'Start Game',
            {
                fontFamily: 'Poppins, Georgia, Times, serif',
                color: '#fff',
                fixedWidth: 100,
                fixedHeight: 0,
                align: "center"
            },
            22
        );
    }

}

