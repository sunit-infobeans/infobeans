<head>
<?php 
/**
 * Contains required functions for themes
 *
 * @package infobeans-2023
 */
	
?>

<title>
<?php 
/**
 * Get Page or post title.
 */

esc_html( get_the_title() ); 
?>
</title>

<!-- meta tag header includes -->
<meta name="author" content="Taylor Callsen" />
<meta name="robots" content="index, follow">

<!-- compatability header includes -->
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- open graph header includes -->

<!-- WordPress header includes -->
<?php wp_head(); ?>

</head>
