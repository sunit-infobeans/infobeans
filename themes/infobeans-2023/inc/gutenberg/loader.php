<?php
/**
 * Files for registering blocks and their attributes
 *
 * @package frontend
 */

if ( ! function_exists( 'gutenberg_enqueues_scripts' ) ) { 
	/**
	 * Enqueues gutenberg scripts.
	 */
	function gutenberg_enqueues_scripts() {
		wp_enqueue_script(
			'gutenberg_ib_assets',
			get_template_directory_uri() . '/dist/scripts/' . INFOBEANS_2023_GUTENBERG_JS,
			[ 'wp-blocks', 'wp-i18n', 'wp-editor', 'wp-components', 'wp-element', 'wp-edit-post', 'wp-data' ],
			filemtime( get_template_directory() . '/dist/scripts/' . INFOBEANS_2023_GUTENBERG_JS ),
			false
		);

		wp_enqueue_style(
			'admin-styles',
			get_template_directory_uri() . '/dist/styles/' . INFOBEANS_2023_GUTENBERG_CSS,
			[],
			filemtime( get_template_directory() . '/dist/styles/' . INFOBEANS_2023_GUTENBERG_CSS ),
			'all'
		);
	}
}

if ( ! function_exists( 'gutenberg_ib_assets' ) ) { 
	/**
	 * Enqueues gutenberg assets.
	 */
	function gutenberg_ib_assets() {
		wp_enqueue_script(
			'packages',
			get_template_directory_uri() . '/dist/scripts/' . INFOBEANS_2023_PACKAGES_JS,
			[
				'wp-blocks',
				'wp-i18n',
				'wp-element',
				'wp-edit-post',
				'wp-data',
			],
			'1.1.0',
			false
		);

		gutenberg_enqueues_scripts();
		wp_enqueue_script( 'gutenberg_ib_assets' );

	}
}
add_action( 'enqueue_block_editor_assets', 'gutenberg_ib_assets' );

/**
 * Include files for blocks so it can be rendered with php.
 */
require_once plugin_dir_path( __FILE__ ) . '/blocks/testimonials.php';


if ( ! function_exists( 'register_php_rendered_blocks' ) ) {
	/**
	 * Register the block via php so it can be rendered with php.
	 */
	function register_php_rendered_blocks() {

		register_block_type(
			'infobeans-2023/testimonials',
			[
				'render_callback' => 'ib_render_testimonials_block',
				'editor_script'   => 'gutenberg_ib_assets',
				'attributes'      => [
					'type' => [
						'type'    => 'string',
						'default' => 'category',
					],
				],
			]
		);
	}
}
add_action( 'init', 'register_php_rendered_blocks' );
