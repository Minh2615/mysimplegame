export default class GameOver extends Phaser.Scene {
    constructor() {
        super({key: "gameover"});
    }

    preload() {
        const wpData = {
            baseUrl: window.submitDomain
        };
        this.submitScoreUrl = `${wpData.baseUrl}/wp-json/jumpgame/v1/submit-score`;
        this.fetchScoreUrl = `${wpData.baseUrl}/wp-json/jumpgame/v1/high-scores`;
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('contact_bg', 'assets/images/contact_bg.jpg');
        this.load.html('nameform', 'assets/text/form.html');
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.add.image(-30, 50, 'background').setOrigin(0.5, 0.105).setScale('0.8');
        this.add.image( this.center_width, 70, 'logo').setOrigin(0.5).setScale('0.3');
        this.add.image( this.center_width, this.height - 220, 'contact_bg').setOrigin(0.5).setScale('0.7');

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
        const score = this.registry.get("score");
        const element = this.add.dom(this.center_width, this.height - 275).createFromCache('nameform');
        const yourScoreDiv = element.getChildByID('your-score');
        yourScoreDiv.innerHTML = "<span>" + score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span>";
        const formHeaderText = element.getChildByID('form-header-text');
        const submitButtonInput = element.getChildByID('submitButton');
        const thankyouDiv = element.getChildByID('thank-you');
        element.setPerspective(800);
        element.getChildByName('score').value = score;
        element.addListener('click');
        element.on('click', function (event)
        {
            if (event.target.name === 'submitButton')
            {
                const inputUsername = this.getChildByName('name');
                const inputEmail = this.getChildByName('email');
                if (inputUsername.value !== '')
                {
                    //  Turn off the click events
                    // this.removeListener('click');
                    //  Populate the text with whatever they typed in as the username!
                    self.submitScore(inputUsername.value, inputEmail.value, score);
                    submitButtonInput.style.display = 'none';
                    inputUsername.style.display = 'none';
                    inputEmail.style.display = 'none';
                    formHeaderText.style.display = 'none';
                    thankyouDiv.style.display = 'block';

                    setTimeout(function() {
                        self.showLeaderBoard();
                    }, 1000);

                }
            }
            if (event.target.name === 'playAgainButton')
            {
                this.removeListener('click');
                self.showStartScene();
            }
        });
    }
    showLeaderBoard() {
        window.location.replace(window.leaderboardUrl);
    }
    showStartScene() {
        this.scene.start("splash");
    }

    async submitScore(playerName, email, score) {
        try {
            const response = await fetch(this.submitScoreUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: playerName, email: email, score: score })
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
