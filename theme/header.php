<!DOCTYPE html  <?php language_attributes(); ?>>
<html>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/vendor.min.css"/>
    <link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/styles.min.css" />
    <?php wp_head(); ?>
</head>
<body class="front-page">
    <div class="mobile-content visible-xs">
        <!-- Mobile content (triggers, headers etc) -->
        <div class="xs-trigger nav-trigger">
            <span class="glyphicon glyphicon-menu-hamburger"></span>
        </div>
        <div class="xs-trigger search-trigger">
            <span class="glyphicon glyphicon-search"></span>
        </div>
        <h1 class="main-title"><?php bloginfo('name'); ?></h1>
    </div>
    <div class="container-fluid header-wrap bg bg-cover bg-panorama">

        <nav id="main-nav" class="row">
            <div class="container">
                <div class="row">
                    <div class="col-sm-1 hidden-xs">
                        <a href="/">
                            <img src="<?php bloginfo('template_directory'); ?>/assets/img/small-logo-transparent-full.png" alt="Smash Norge logo"
                                 class="nav-logo"/>
                        </a>
                    </div>
                    <div class="col-sm-11">
                        <?php

                        $navOpts = array(
                            'menu' => 'main-menu',
                            'menu_class' => 'nav nav-pills nav-justified',
                            'container' => '',
                            'fallback_cb' => ''
                        );
                        wp_nav_menu($navOpts);

                        ?>
                    </div>
                </div>
            </div>
        </nav>

        <div class="container">
            <header id="main-header" class="row">
                <div class="col-sm-3">
                    <img src="<?php bloginfo('template_directory'); ?>/assets/img/logo-transparent.png" alt="Smash Norge logo" class="logo small hidden-xs"/>
                </div>
            </header>
        </div>
    </div>