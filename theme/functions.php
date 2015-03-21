<?php
/* Theme setup */

function theme_slug_render_title()
{
    ?>
    <title><?php wp_title('|', true, 'right'); ?></title>
<?php
}

add_action('wp_head', 'theme_slug_render_title');

function register_theme_customizations()
{
    $html5args = array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'widgets'
    );
    add_theme_support('html5', $html5args);
    add_theme_support('automatic-feed-links');
    add_theme_support('title-tag');

}

add_action('after_setup_theme', 'register_theme_customizations');

/* Navigation menu setup */

function register_main_menu()
{
    register_nav_menu('main-menu', __('Main Menu'));
}

add_action('init', 'register_main_menu');