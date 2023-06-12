<?php
/**
 * The template for displaying all single posts
 *
 * @package infobeans-2023
 */

get_header();
?>

	<main id="primary" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();
			the_content();
		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();
