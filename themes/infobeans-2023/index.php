<!DOCTYPE html>
<?php 
/**
 * Index.
 *
 * @package infobeans-2023
 */
	
?>
<?php if ( is_user_logged_in() ) { ?>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" class="wpadmin-logged-in">
<?php } else { ?>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<?php } ?>

<?php require 'header.php'; ?>

<body>

<main>

<h1>infobeans</h1>

<p>This content is hard-coded into the `index.php` file in the root of the theme directory.</p>

</main>

<?php require 'footer.php'; ?>

</body>

</html>
