<?php 

  // register webpack compiled js and css with theme
  function enqueue_webpack_scripts() {
    
    $cssFilePath = glob( get_template_directory() . '/css/build/main.min.*.css' );
    $cssFileURI = get_template_directory_uri() . '/css/build/' . basename($cssFilePath[0]);
    wp_enqueue_style( 'main_css', $cssFileURI );
    
    $jsFilePath = glob( get_template_directory() . '/js/build/main.min.*.js' );
    $jsFileURI = get_template_directory_uri() . '/js/build/' . basename($jsFilePath[0]);
    wp_enqueue_script( 'main_js', $jsFileURI , null , null , true );
     
  }
  add_action( 'wp_enqueue_scripts', 'enqueue_webpack_scripts' );



//   // Register Podcast Post Type

//   function create_podcast_post_type() {
//     register_post_type( 'podcast',
//         array(
//             'labels' => array(
//                 'name' => __( 'Podcasts' ),
//                 'singular_name' => __( 'Podcast' )
//             ),
//             'public' => true,
//             'has_archive' => true,
//             'supports' => array( 'title', 'editor', 'thumbnail' ),
//             'taxonomies' => array( 'category', 'post_tag' ),
//             'menu_icon' => 'dashicons-microphone',
//         )
//     );
// }
// add_action( 'init', 'create_podcast_post_type' );

//   // End Podcast post type registeration here


//   function create_event_post_type() {
//     register_post_type( 'event',
//         array(
//             'labels' => array(
//                 'name' => __( 'Events' ),
//                 'singular_name' => __( 'Event' )
//             ),
//             'public' => true,
//             'has_archive' => true,
//             'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
//             'taxonomies' => array( 'category', 'post_tag' ),
//             'menu_icon' => 'dashicons-calendar-alt',
//         )
//     );
// }
// add_action( 'init', 'create_event_post_type' );


// function create_award_post_type() {
//   register_post_type( 'award',
//       array(
//           'labels' => array(
//               'name' => __( 'Awards' ),
//               'singular_name' => __( 'Award' )
//           ),
//           'public' => true,
//           'has_archive' => true,
//           'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
//           'taxonomies' => array( 'category', 'post_tag' ),
//           'menu_icon' => 'dashicons-awards',
//       )
//   );
// }
// add_action( 'init', 'create_award_post_type' );


// function create_case_study_post_type() {
//   register_post_type( 'case_study',
//       array(
//           'labels' => array(
//               'name' => __( 'Case Studies' ),
//               'singular_name' => __( 'Case Study' )
//           ),
//           'public' => true,
//           'has_archive' => true,
//           'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
//           'taxonomies' => array( 'category', 'post_tag' ),
//           'menu_icon' => 'dashicons-analytics',
//       )
//   );
// }
// add_action( 'init', 'create_case_study_post_type' );

// function create_testimonial_post_type() {
//   register_post_type( 'testimonial',
//       array(
//           'labels' => array(
//               'name' => __( 'Testimonials' ),
//               'singular_name' => __( 'Testimonial' )
//           ),
//           'public' => true,
//           'has_archive' => true,
//           'supports' => array( 'title', 'editor', 'thumbnail' ),
//           'taxonomies' => array( 'category', 'post_tag' ),
//           'menu_icon' => 'dashicons-format-quote',
//       )
//   );
// }
// add_action( 'init', 'create_testimonial_post_type' );


// function create_recruitment_post_type() {
//   register_post_type( 'recruitment',
//       array(
//           'labels' => array(
//               'name' => __( 'Recruitment' ),
//               'singular_name' => __( 'Recruitment' )
//           ),
//           'public' => true,
//           'has_archive' => true,
//           'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
//           'taxonomies' => array( 'category', 'post_tag' ),
//           'menu_icon' => 'dashicons-groups',
//       )
//   );
// }
// add_action( 'init', 'create_recruitment_post_type' );


// function create_people_db_post_type() {
//   register_post_type( 'people_db',
//       array(
//           'labels' => array(
//               'name' => __( 'People DB' ),
//               'singular_name' => __( 'People' )
//           ),
//           'public' => true,
//           'has_archive' => true,
//           'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
//           'taxonomies' => array( 'category', 'post_tag' ),
//           'menu_icon' => 'dashicons-id',
//       )
//   );
// }
// add_action( 'init', 'create_people_db_post_type' );


//Remove Comment Feature
function remove_comment_support() {
    remove_post_type_support( 'post', 'comments' );
    remove_post_type_support( 'page', 'comments' );
    remove_post_type_support( 'custom-post-type', 'comments' );
}
add_action('init', 'remove_comment_support');


?>