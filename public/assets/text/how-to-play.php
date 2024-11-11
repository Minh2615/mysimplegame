<?php
header('Content-Type: text/html; charset=UTF-8');
?>
<style>
    .how_to_play {
        height: 200px;
        margin: 20px auto;
        width: 565px;
        max-width: 520px;
    }

    .how_to_play h1 {
        box-sizing: border-box;
        color: #fff;
        display: block;
        height: 30px;
        font: 700 30px/1 'Poppins Bold', 'Open Sans', sans-serif;
        margin: 40px 0 20px;
        text-align: center;
        padding: 0;
    }
    .how_to_play p {
        color: #fff;
        font: 300 16px/1.4 'Poppins Light', 'Open Sans', sans-serif;
        text-align: center;
        padding: 0;
        margin: 0 0 5px;
    }
    .how_to_play input[type="checkbox"] {
        accent-color: #e74c3c;
        vertical-align: middle;
        margin: 0 2px 0 0;
    }
    .how_to_play a {
        color: #fff;
        padding-bottom: 1px;
        border-bottom: 1px solid #dc9598;
        text-decoration: none;
    }
    .guide-image {
        margin: 15px 0;
        background: #a22129;
        border: 1px solid #eec68f;
        border-radius: 15px;
        padding: 16px;
    }
    .guide-image ul {
        max-width: 100%;
        margin: 0;
        text-align: center;
    }
    .guide-image ul li {
        width: 30%;
        list-style: none;
        display: inline-block;
        text-align: center;
        height: 60px;
        vertical-align: top;
    }
    .guide-image ul li img {
        height: 35px;
        margin: 0 auto;
    }
    .guide-image ul li img.mouse_icon {
        height: 20px;
        margin: 0 auto 10px;
    }
    div.agree-box p,
    .guide-image ul li p {
        font: 300 12px/1.2 'Poppins Light', 'Open Sans', sans-serif;
    }

    input[type="submit"] {
        width: 170px;
        height: 32px;
        font: 500 16px/1 'Poppins Medium', 'Open Sans', sans-serif;
        color: #c35051;
        text-decoration: none;
        text-align: center;
        margin: 10px 0 0 0;
        padding: 0;
        position: relative;
        cursor: pointer;
        border: none;
        background-color: #fff;
        border-radius: 20px;
    }

    div.text-center {
        text-align: center;
    }
</style>

<div class="how_to_play">
    <h1 class="form-header">How To Play?</h1>
    <p>Guide Santa through his shopping trip!</p>
    <p>Submit your score to be in the leaderboard and stand to win up to <b>60,000 Great Rewards Points</b> (worth $300)! </p>
    <div class="guide-image">
        <ul>
            <li>
                <div>
										<img src="<?php echo RUNNER_GAME_URL; ?>/assets/images/music-notes.png" />
                    <p>Collect musical notes to earn points</p>
                </div>
            </li>
            <li>
                <div>
                    <img class="mouse_icon" src="<?php echo RUNNER_GAME_URL; ?>/assets/images/mouse-icon.png" />
                    <p>Click or tap to Jump</p>
                </div>
            </li>
            <li>
                <div>
                    <img src="<?php echo RUNNER_GAME_URL; ?>/assets/images/box-avoid.png" />
                    <p>Avoid Gift Boxes</p>
                </div>
            </li>
        </ul>
    </div>
    <div class="text-center agree-box">
        <p>
            <label for="agreeInput"><input type="checkbox" id="agreeInput" name="agree" value="">
            I agree to the <a href="#">Terms and Conditions</a> and acknowledge the Privacy Policy.
            </label>
        </p>
        <input type="submit" value="Let’s Sleigh" id="submitButton" name="submitButton">
    </div>
</div>
