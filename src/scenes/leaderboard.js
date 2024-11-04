import WebFontFile from "../gameobjects/WebFontFile.js";

export default class HowToPlay extends Phaser.Scene {
    constructor() {
        super({key: "leaderboard"});

    }
    preload() {
        const wpData = {
            baseUrl: window.submitDomain
        };
        this.submitScoreUrl = `${wpData.baseUrl}/wp-json/jumpgame/v1/submit-score`;
        this.fetchScoreUrl = `${wpData.baseUrl}/wp-json/jumpgame/v1/high-scores`;
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('contact_bg', 'assets/images/contact_bg.png');
        this.load.html('leaderboard', 'assets/text/leaderboard.html');
        this.load.addFile(new WebFontFile(this.load, 'Poppins'))
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

        // Fetch and display the high scores
        this.loadHighScores();

        this.input.keyboard.on("keydown-SPACE", this.startGame, this);
        this.input.on("pointerdown", (pointer) => this.startGame(), this);
    }
    async loadHighScores() {
        const scores = await this.fetchScoresFromWordPress();

        // Find the `#scoreList` element in the loaded template
        const scoreList = this.leaderboardElement.getChildByID('scoreList');
        if (scoreList) {
            // Clear existing content
            scoreList.innerHTML = '';

            // Add each score as a list item
            scores.forEach((score, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${index + 1}. ${score.name}: ${score.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                scoreList.appendChild(listItem);
            });
        }
    }

    startGame() {
        this.scene.start("splash");
    }

    showForm() {
        this.leaderboardElement = this.add.dom(this.center_width, this.height - 280).createFromCache('leaderboard');
        this.leaderboardElement.setPerspective(800);
        this.tweens.add({
            targets: this.leaderboardElement,
            y: 250,
            duration: 1000,
            ease: 'Power3'
        });
    }

    async fetchScoresFromWordPress() {
        try {
            const response = await fetch(this.fetchScoreUrl);
            return await response.json(); // Returns an array of score objects
            // return [
            //     {
            //         "name": "Alice",
            //         "score": 1500
            //     },
            //     {
            //         "name": "Bob",
            //         "score": 1200
            //     },
            //     {
            //         "name": "Charlie",
            //         "score": 1000
            //     },
            //     {
            //         "name": "Dana",
            //         "score": 800
            //     },
            //     {
            //         "name": "Eve",
            //         "score": 700
            //     }
            // ];
        } catch (error) {
            console.error('Error fetching scores:', error);
            return [ ];
        }
    }

}
