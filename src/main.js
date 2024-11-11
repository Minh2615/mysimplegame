import Phaser from "phaser";
import Splash from "./scenes/splash";
import HowToPlay from "./scenes/how_to_play";
import Game from "./scenes/game";
import GameOver from "./scenes/gameover";
import Leaderboard from "./scenes/leaderboard";

// window.submitDomain = 'https://elwp.rovn.top';
window.submitDomain = window.location.origin;
window.submitDomain = window.location.origin + '/wp';
window.assetsDomain = window.submitDomain + '/wp-content/plugins/runner-game';
window.leaderboardUrl = window.submitDomain + '/leaderboard';

/*
This is the main configuration file for the game.
*/
const config = {
    type: Phaser.AUTO,
    width: 920,
    height: 520,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    autoRound: false,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 1000},
            debug: false,
        },
    },
    dom: {
        createContainer: true
    },
    loader: {
        baseURL: window.assetsDomain,
        imageLoadType: "HTMLImageElement"
    },
    scene: [Splash, HowToPlay, Game, GameOver],
};

const game = new Phaser.Game(config);
