<?php
/**
 * Plugin Name: Runner Game
 * Plugin URI: https://icreationslab.com/
 * Description: Add the runner game to your site using the [runner-game] shortcode.
 * Version: 1.0.8
 * Author: icreationslab
 * Author URI: https://icreationslab.com/
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

if (!defined('ABSPATH')) die;


function create_high_score_post_type()
{
    register_post_type('high-scores',
        array(
            'labels' => array(
                'name' => __('High Scores'),
                'singular_name' => __('High Score')
            ),
            'public' => true,
            'has_archive' => true,
            'capabilities' => [
                'read_post' => 'read',
                'read' => 'read',
                'edit_post' => 'read',
                'delete_post' => 'true',
                'create_posts' => 'do_not_allow', // Disables "Add New" button
            ],
            'supports' => array('title'),
        )
    );
}

add_action('init', 'create_high_score_post_type');

function my_custom_meta_box()
{
    add_meta_box(
        'high_score_box_id',           // Unique ID
        'High Score',           // Box title
        'my_meta_box_callback',      // Content callback, function name
        'high-scores',                      // Post type (use 'post' or 'page' or a custom post type)
        'normal',                    // Context (where on the page)
        'default'                    // Priority
    );
}

add_action('add_meta_boxes', 'my_custom_meta_box');
function my_meta_box_callback($post)
{
    // Add a nonce field for security
    wp_nonce_field('my_meta_box_nonce', 'meta_box_nonce');

    // Retrieve existing metadata if available
    $name = get_post_meta($post->ID, 'name', true);
    $email = get_post_meta($post->ID, 'email', true);
    $score = get_post_meta($post->ID, 'score', true);

    // HTML for the fields
    echo '<label for="gm_user_name">Name: </label>';
    echo '<input type="text" id="gm_user_name" name="name" value="' . esc_attr($name) . '" /> <br><br>';

    echo '<label for="gm_user_email">Email: </label>';
    echo '<input type="email" id="gm_user_email" name="email" value="' . esc_attr($email) . '" /> <br><br>';

    echo '<label for="gm_user_score">Score: </label>';
    echo '<input type="number" id="gm_user_score" name="score" value="' . esc_attr($score) . '" /> <br><br>';
}


add_action('rest_api_init', function () {
    register_rest_route('jumpgame/v1', '/submit-score', array(
        'methods' => 'POST',
        'callback' => 'submit_score_callback',
        'permission_callback' => '__return_true',
    ));
});


// Add a custom column to the posts table
function my_custom_columns($columns)
{
    $date = $columns['date'];
    unset($columns['date']);

    $columns['email'] = 'Email'; // 'custom_meta' is the column ID, and 'Custom Meta' is the column title
    $columns['score'] = 'Score';

    $columns['date'] = $date;
    return $columns;
}

add_filter('manage_posts_columns', 'my_custom_columns');


// Display custom meta data in the custom column
function my_custom_column_content($column, $post_id)
{
    if ($column === 'score') {
        // Retrieve the custom meta data
        $custom_meta_value = get_post_meta($post_id, 'score', true); // Replace '_custom_text' with your meta key

        // Display the meta data or a default message if not available
        echo $custom_meta_value ? esc_html($custom_meta_value) : 'No data';
    }
    if ($column === 'email') {
        // Retrieve the custom meta data
        $custom_meta_value = get_post_meta($post_id, 'email', true); // Replace '_custom_text' with your meta key

        // Display the meta data or a default message if not available
        echo $custom_meta_value ? esc_html($custom_meta_value) : 'No data';
    }
}

add_action('manage_posts_custom_column', 'my_custom_column_content', 10, 2);


function submit_score_callback($request)
{
    $score = sanitize_text_field($request->get_param('score'));
    $name = sanitize_text_field($request->get_param('name'));
    $email = sanitize_text_field($request->get_param('email'));
    $current_user_score = array(
        'name' => $name,
        'score' => $score,
        'email' => $email,
    );
    $post_id = wp_insert_post(array(
        'post_type' => 'high-scores',
        'post_title' => $name,
        'meta_input' => $current_user_score,
        'post_status' => 'publish'
    ));

    setcookie('current_user_score', $post_id, time() + 3600, COOKIEPATH, COOKIE_DOMAIN);

    return $post_id ? ['status' => 'success'] : ['status' => 'error'];
}

add_action('rest_api_init', function () {
    register_rest_route('jumpgame/v1', '/high-scores', array(
        'methods' => 'GET',
        'callback' => 'get_high_scores_callback',
        'permission_callback' => '__return_true',
    ));
});

function get_high_scores_callback()
{
    $scores = new WP_Query(array(
        'post_type' => 'high-scores',
        'posts_per_page' => 10,
        'orderby' => 'meta_value_num',
        'meta_key' => 'score',
        'order' => 'DESC'
    ));

    $results = [];
    while ($scores->have_posts()) {
        $scores->the_post();
        $results[] = array(
            'name' => get_the_title(),
            'score' => get_post_meta(get_the_ID(), 'score', true),
            'email' => get_post_meta(get_the_ID(), 'email', true)
        );
    }
    wp_reset_postdata();
    return $results;
}



// GAME FUNCTION

// Version (to be changed any time sprites, js, css, or plugin version changes.
defined('RUNNERGAME_VER') or define('RUNNERGAME_VER', '1.0.7');

// URL of directory where plugin assets are found.
defined('RUNNERGAME_URL') or define('RUNNERGAME_URL', plugin_dir_url(__FILE__));

// URL of JS file used for game logic.
defined('RUNNERGAME_JS') or define('RUNNERGAME_JS', plugins_url('/assets/index-Bf6HNmjN.js', __FILE__));

// Allows duplicate check to be turned off as some caching plugins don't work well with duplicate check).
defined('RUNNERGAME_DUPLICATE_CHECK') or define('RUNNERGAME_DUPLICATE_CHECK', true);

/**
 * Register CSS and JS used by the game.
 */
add_action('wp_enqueue_scripts', 'runnergame_js_css');
function runnergame_js_css()
{
    wp_register_script('runner-game-logic', RUNNERGAME_JS, array('jquery'), RUNNERGAME_VER, true);
}

/**
 * Define and register [runner-game] shortcode.
 */
add_shortcode('runner-game', 'runnergame_register_shortcode');
function runnergame_register_shortcode()
{
    if (RUNNERGAME_DUPLICATE_CHECK) {
        static $game_run = false;
        if ($game_run) {
            return '<p>The runner game can only be used once per page.</p>';
        }
    }
    $game_run = true;
    wp_enqueue_script('runner-game-logic');
    $game_html = '
    <style type="text/css">
    #runner-game-outer {
        max-width: 900px; margin: 0 auto;
    }
    #game-container > * {
        border-radius: 10px;
    }
    </style>
    <div id="runner-game-outer" class="runner-game-outer">
        <div id="game-container"></div>
    </div>';
    return $game_html;
}

/**
 * Skip Jetpack Photon CDN for game sprite png files.
 */
add_filter('jetpack_photon_skip_image', 'runnergame_skip_photon', 10, 3);
function dinogame_skip_photon($val, $src, $tag)
{
    if (strpos($src, RUNNERGAME_URL) !== false) {
        return true;
    }
    return $val;
}




