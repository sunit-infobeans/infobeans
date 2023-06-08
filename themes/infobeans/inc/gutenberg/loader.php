<?php
/**
 * Files for registering blocks and their attributes
 *
 * @package frontend
 */

/**
 * Enqueues gutenberg assets.
 *
 */
if (!function_exists('gutenberg_ib_assets')) { 
	function gutenberg_ib_assets()
	{ 
		$roles = [];
		global $post_type;
		if (is_user_logged_in()) {
			$user  = wp_get_current_user();
			$roles = (array) $user->roles;
		}

		wp_enqueue_script(
			'packages',
			get_template_directory_uri() . '/dist/scripts/' . INFOBEANS_PACKAGES_JS,
			[	'wp-blocks',
				'wp-i18n',
				'wp-element',
				'wp-edit-post',
				'wp-data',
			],
			'1.1.0',
			false
		);

		wp_enqueue_script(
			'gutenberg_ib_assets',
			get_template_directory_uri() . '/dist/scripts/' . INFOBEANS_GUTENBERG_JS,
			['wp-blocks', 'wp-i18n','wp-editor', 'wp-components', 'wp-element','wp-edit-post','wp-data'],
			filemtime(get_template_directory() . '/dist/scripts/' . INFOBEANS_GUTENBERG_JS),
			false
		);
		wp_enqueue_script('gutenberg_ib_assets');

	}
}
add_action('enqueue_block_editor_assets', 'gutenberg_ib_assets');

/**
 * Include files for blocks so it can be rendered with php.
 *
 */

// require_once plugin_dir_path( __FILE__ ) . '/blocks/content-stats.php';

/**
 * Register the block via php so it can be rendered with php.
 *
 */
if (!function_exists('register_php_rendered_blocks')) {

	function register_php_rendered_blocks() {

		register_block_type('infobeans/testimonials', 
			[
				'editor_script' => 'gutenberg_ib_assets',
			]
		);

		register_block_type('infobeans/firstblock', 
			[
				'editor_script' => 'gutenberg_ib_assets',
			]
		);
	}
}
add_action('init', 'register_php_rendered_blocks');