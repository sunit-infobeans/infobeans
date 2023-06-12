<?php 
/**
 * Contains required functions for themes
 *
 * @package infobeans-2023
 */

/**
 * Register webpack compiled js and css with theme
 */
function enqueue_webpack_scripts() {
	
	$cssFileURI = get_template_directory_uri() . '/dist/styles/gutenberg.css';
	wp_enqueue_style( 'main_css', $cssFileURI, [], wp_get_theme()->get( 'Version' ), 'all' );
	
	$jsFileURI = get_template_directory_uri() . '/dist/scripts/gutenberg.js';
	wp_enqueue_script( 'main_js', $jsFileURI, [ 'wp-blocks', 'wp-i18n', 'wp-editor', 'wp-components', 'wp-element', 'wp-edit-post', 'wp-data' ], '1.0', false );
}
add_action( 'wp_enqueue_scripts', 'enqueue_webpack_scripts', 10 );

/**
 * Remove Comment Feature.
 */
function remove_comment_support() {
	remove_post_type_support( 'post', 'comments' );
	remove_post_type_support( 'page', 'comments' );
	remove_post_type_support( 'custom-post-type', 'comments' );
}
add_action( 'init', 'remove_comment_support' );

/**
 * Asset settings load.
 */
require get_template_directory() . '/inc/asset-settings.php';

/**
 * Gutenberg.
 */

require get_template_directory() . '/inc/gutenberg/loader.php';
