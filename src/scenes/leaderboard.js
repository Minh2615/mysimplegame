export default class HowToPlay extends Phaser.Scene {
    constructor() {
        super({key: "leaderboard"});
        const wpData = {
            baseUrl: 'https://elwp.rovn.top' // Replace with your WordPress base URL
        };
        this.submitScoreUrl = `${wpData.baseUrl}/wp-json/jumpgame/v1/submit-score`;
        this.fetchScoreUrl = `${wpData.baseUrl}/wp-json/jumpgame/v1/high-scores`;
    }
    preload() {
        this.load.image('logo', 'assets/images/logo.png');
        this.load.html('leaderboard', 'assets/text/leaderboard.html');
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

        // this.add.text(100, 50, 'High Scores', { fontSize: '32px', color: '#fff' });
        //
        // // Create an HTML element to display scores
        // this.highScoreContainer = document.createElement('div');
        // this.highScoreContainer.id = 'highScoreContainer';
        // this.highScoreContainer.style.position = 'absolute';
        // this.highScoreContainer.style.top = '100px';
        // this.highScoreContainer.style.left = '100px';
        // this.highScoreContainer.style.color = 'white';
        // this.highScoreContainer.style.fontSize = '24px';
        // document.body.appendChild(this.highScoreContainer);

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
                listItem.textContent = `${index + 1}. ${score.name}: ${score.score}`;
                scoreList.appendChild(listItem);
            });
        }
    }

    startGame() {
        this.scene.start("splash");
    }

    showForm() {
        this.leaderboardElement = this.add.dom(400, 600).createFromCache('leaderboard');
        this.leaderboardElement.setPerspective(800);
        this.tweens.add({
            targets: this.leaderboardElement,
            y: 250,
            duration: 3000,
            ease: 'Power3'
        });
    }

    async fetchScoresFromWordPress() {
        try {
            const response = await fetch(this.fetchScoreUrl);
            const scores = await response.json();
            return scores; // Returns an array of score objects
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
            return [
                // {
                //     "name": "Alice",
                //     "score": 1500
                // },
                // {
                //     "name": "Bob",
                //     "score": 1200
                // },
                // {
                //     "name": "Charlie",
                //     "score": 1000
                // },
                // {
                //     "name": "Dana",
                //     "score": 800
                // },
                // {
                //     "player": "Eve",
                //     "score": 700
                // }
            ];
        }
    }

}
