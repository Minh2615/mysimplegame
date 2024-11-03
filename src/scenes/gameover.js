export default class GameOver extends Phaser.Scene {
    constructor() {
        super({key: "gameover"});
        const wpData = {
            baseUrl: 'https://elwp.rovn.top' // Replace with your WordPress base URL
        };
        this.submitScoreUrl = `${wpData.baseUrl}/wp-json/jumpgame/v1/submit-score`;
        this.fetchScoreUrl = `${wpData.baseUrl}/wp-json/jumpgame/v1/high-scores`;
    }

    preload() {
        this.load.html('nameform', 'assets/text/form.html');
        this.load.html('how_to_play', 'assets/text/how-to-play.html');
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.cameras.main.setBackgroundColor(0x87ceeb);
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.add
            .bitmapText(
                this.center_width,
                60,
                "arcade",
                this.registry.get("score"),
                25
            )
            .setOrigin(0.5);
        this.add
            .bitmapText(
                this.center_width,
                this.center_height,
                "arcade",
                "GAME OVER",
                45
            )
            .setOrigin(0.5);
        this.add
            .bitmapText(
                this.center_width,
                250,
                "arcade",
                "Press SPACE or Click to continue!",
                15
            )
            .setOrigin(0.5);

        this.showForm();

        // this.input.keyboard.on("keydown-SPACE", this.startGame, this);
        // this.input.on("pointerdown", (pointer) => this.startGame(), this);
    }

    showLine(text, y) {
        let line = this.introLayer.add(
            this.add
                .bitmapText(this.center_width, y, "pixelFont", text, 25)
                .setOrigin(0.5)
                .setAlpha(0)
        );
        this.tweens.add({
            targets: line,
            duration: 2000,
            alpha: 1,
        });
    }

    showForm() {
        let self = this;

        this.add
            .bitmapText(
                this.center_width,
                25,
                "arcade",
                "Your Score",
                35
            )
            .setOrigin(0.5);
        const text = this.add.text(
            this.center_width,
            25,
            'Your Score',
            {
                color: 'white',
                fontFamily: 'Arial',
                fontSize: '0 '
            })
            .setOrigin(0.5);

        const score = this.registry.get("score");
        const element = this.add.dom(400, 600).createFromCache('nameform');
        element.setPerspective(800);

        element.getChildByName('score').value = score;

        element.addListener('click');

        element.on('click', function (event)
        {
            if (event.target.name === 'loginButton')
            {
                const inputUsername = this.getChildByName('username');
                const inputEmail = this.getChildByName('email');

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputEmail.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Tween the login form out
                    this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                    this.scene.tweens.add({
                        targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                        onComplete: function ()
                        {
                            element.setVisible(false);
                        }
                    });

                    //  Populate the text with whatever they typed in as the username!
                    text.setText(`Welcome ${inputUsername.value}`);

                    self.submitScore(inputUsername.value, inputEmail.value, score);

                    self.showLeaderBoard();
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }

        });

        this.tweens.add({
            targets: element,
            y: 260,
            duration: 3000,
            ease: 'Power3'
        });
    }

    showLeaderBoard() {
        this.scene.start("leaderboard");
    }

    async submitScore(playerName, playerEmail, score) {
        try {
            const response = await fetch(this.submitScoreUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: playerName, email: playerEmail, score: score })
            });

            const result = await response.json();
            if (result.status === 'success') {
                console.log('Score submitted successfully!');
            } else {
                console.error('Failed to submit score:', result);
            }
        } catch (error) {
            console.error('Error submitting score:', error);
        }
    }
}
