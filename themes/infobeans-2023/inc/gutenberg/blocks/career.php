<?php
/**
 * Processes Career block.
 *
 * @package infobeans-2023.
 */

if ( ! function_exists( 'render_career_block_html' ) ) {
	/**
	 * Processes career block html.
	 *
	 * @param array $attributes Current Block attributes.
	 * @param array $title Current Block title.
	 * @param array $titleColor Current Block title color.
	 * @param array $linkUrl Current Block link.
	 * @param array $linkText Current Block link text.
	 */
	function render_career_block_html( $attributes, $title, $titleColor, $linkUrl, $linkText ) {

		$career_html  = '';
		$career_html .= ( isset( $attributes['backgroundColor'] ) ) ? '<div class="career" style="background-color: ' . $attributes['backgroundColor'] . ';">' : '';
		$career_html .= '<div class="container">';
		$career_html .= '<div class="content-wrapper">';
		$career_html .= '<div class="content">';
		$career_html .= '<div class="section-heading" style="color: ' . $titleColor . ';">' . $title;
		$career_html .= ( isset( $attributes['content'] ) ) ? '<div class="content-inner">' . $attributes['content'] . '</div>' : '';
		$career_html .= '<a href="' . esc_url( $linkUrl ) . '" class="link-with-arrow white">' . $linkText;
		$career_html .= ' <img src="#" alt="icon"></a> </div> </div>';
		$career_html .= ( isset( $attributes['backgroundImage'] ) ) ? '<div class="img-career-box one"><div class="image" style="background: url(' . $attributes['backgroundImage'] . ') no-repeat center;"></div></div>' : '';
		$career_html .= ( isset( $attributes['backgroundImage1'] ) ) ? '<div class="img-career-box two" style="background: url(' . $attributes['backgroundImage1'] . ') no-repeat center;"><div class="image"></div></div>' : '';
		$career_html .= ( isset( $attributes['backgroundImage2'] ) ) ? '<div class="img-career-box three" style="background: url(' . $attributes['backgroundImage2'] . ') no-repeat center;"><div class="image"></div></div>' : '';
		$career_html .= '</div> </div>';
		return $career_html;
	
	}
}

if ( ! function_exists( 'render_career_block' ) ) {
	/**
	 * Processes career block.
	 *
	 * @param array $attributes Current Block attributes.
	 */
	function render_career_block( $attributes ) {
		$title       = ( ( isset( $attributes['title'] ) ) ) ? $attributes['title'] : '';
		$titleColor  = ( ( isset( $attributes['titleColor'] ) ) ) ? $attributes['titleColor'] : '';
		$linkUrl     = ( ( isset( $attributes['linkUrl'] ) ) ) ? $attributes['linkUrl'] : '';
		$linkText    = ( ( isset( $attributes['linkText'] ) ) ) ? $attributes['linkText'] : '';
		$career_html = render_career_block_html( $attributes, $title, $titleColor, $linkUrl, $linkText );
		return $career_html;
	} 
}
