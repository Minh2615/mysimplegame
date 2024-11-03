import Phaser from "phaser";
import Splash from "./scenes/splash";
import HowToPlay from "./scenes/how_to_play";
import Game from "./scenes/game";
import GameOver from "./scenes/gameover";
import Leaderboard from "./scenes/leaderboard";
/*
This is the main configuration file for the game.
*/
const config = {
    type: Phaser.AUTO,
    width: 920,
    height: 510,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    autoRound: false,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 400},
            debug: true,
        },
    },
    dom: {
        createContainer: true
    },

    loader: {
        // baseURL: 'https://elwp.rovn.top/wp-content/uploads/ac_assets/game/',
        responseType: "blob",
        crossOrigin: "anonymous",
    },
    scene: [/*Splash, HowToPlay,*/ Game, GameOver, Leaderboard],
};

const game = new Phaser.Game(config);
