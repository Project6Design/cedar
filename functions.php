<?php

// Configure Timber and theme.
Timber::$dirname = array( 'templates', 'views' );
Timber::$autoescape = false;


add_action('after_setup_theme', function() {
  // Add default posts and comments RSS feed links to head.
  add_theme_support('automatic-feed-links');
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('menus');

  add_theme_support(
    'html5', [
      'comment-form',
      'comment-list',
      'gallery',
      'caption'
    ]
  );

  add_theme_support(
    'post-formats', [
      'aside',
      'image',
      'video',
      'quote',
      'link',
      'gallery',
      'audio'
    ]
  );
});

