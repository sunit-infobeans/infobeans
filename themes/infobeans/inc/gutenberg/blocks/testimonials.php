<?php
/**
 * Processes Testimonials block.
 *
 * @package infobeans.
 */

if (!function_exists('ib_testimonials_process_query')) {
    /**
     * Processes each post/page to return the the correct data format for our render function.
     *
     * @param WP_Query $query Current WP_Query.
     * @param array    $attributes Current Block attributes.
     * @return array|bool
     */
    function ib_testimonials_process_query($query, $attributes)
    {
        $posts = false;
        if ($query->have_posts()) {
            $posts = [];
            while ($query->have_posts()) {
                $query->the_post();
                $posts[] = [
                    'title'           => $query->post->post_title,
                    'link'            => get_permalink($query->post->ID),
                    'featured_image'  => get_post_thumbnail_id(),
                    'excerpt'         => $query->post->post_excerpt,
                    'date'            => $query->post->post_date,
                    'author'          => get_the_author(),
                    'bg_color'        => (isset($attributes['sectionBgColor'])) ? $attributes['sectionBgColor'] : '#aa142d',
                ];
            }
            wp_reset_query();
        }
        return $posts;
    }
}

if (!function_exists('ib_testimonials_process_category')) {
    /**
     * Process the attributes for the current block for the html render.
     *
     * @param array $attributes Current Block attributes.
     * @return array|bool
     */
    function ib_testimonials_process_category($attributes)
    {
        if (empty($attributes)) return false;
        $image_attr = '';
        if (isset($attributes['id'])) {
            $thumbnail = wp_get_attachment_image_src($attributes['id'], 'thumbnail');
            $image_url = (isset($thumbnail[0])) ? $thumbnail[0] : '';
            $image_attr = '<div class="company-logo">';
            $image_attr .= '<img src="' . esc_url($image_url) . '" alt="Image">';
            $image_attr.= '</div>';
        }
        $bgcolor =  (isset($attributes['sectionBgColor'])) ? $attributes['sectionBgColor'] : '#aa142d';
        $html = '';
        $html .= '<div class="testimonials" id="testimonial" style="background-color: ' . $bgcolor . ';">';
        $html .= '<div class="container">';
        $html .=  $image_attr;
        $html .=  (isset($attributes['text'])) ? '<div class="text">'.$attributes['text'].'</div>' : ''  ;
        $html .=  ( isset($attributes['designation'])) ? '<div class="designation">'.$attributes['designation'].'</div>' : '';
        $html .=  ( isset($attributes['companyName'])) ? '<div class="company-name">' .$attributes['companyName']. '</div>' : '';
        $html .= '</div>';
        $html .= '</div>';
        return $html;
    }
}

if (!function_exists('ib_testimonials_process_select')) {
    /**
     * Process the attributes for the current block for the object query process.
     *
     * @param array $attributes Current Block attributes.
     * @return array|bool
     */
    function ib_testimonials_process_select($attributes)
    {
        if (empty($attributes) || !isset($attributes['selectedPosts']) || !$attributes['selectedPosts']) {
            return false;
        }
        $post_types = get_post_types(
            [
                'public' => true,
            ]
        );
        $query = new WP_Query(
            [
                'post_type'     => 'post',
                'post__in'      => $attributes['selectedPosts'],
                'no_found_rows' => true,
                'orderby'     => 'post__in',
                'post_status'   => ['publish'],
            ]
        );

        return ib_testimonials_process_query($query, $attributes);
    }
}

if (!function_exists('ib_testimonials_process_content')) {
    /**
     * Process the attributes for the current block for the object selection.
     *
     * @param array $attributes Current block attributes.
     * @return array|bool
     */
    function ib_testimonials_process_content($attributes)
    {
        if (empty($attributes['type'])) {
            return '';
        }

        switch ($attributes['type']) {
            case 'category':
                $testimonial = ib_testimonials_process_category($attributes);
                return $testimonial;
            case 'select':
                return ib_testimonials_process_select($attributes);
            default:
                return ib_testimonials_process_category($attributes);
        }
    }
}
if (!function_exists('ib_render_testimonials_item')) {
    /**
     * Render the current item.
     *
     * @param array $item Item data.
     * @return string
     */
    function ib_render_testimonials_item($item)
    {
        $image = '';
        if ($item['featured_image']) {
            $thumbnail = wp_get_attachment_image_src($item['featured_image'], 'thumbnail');
            $image_url = $thumbnail[0];
            $image = '<div class="company-logo">';
            $image .= '<img src="' . esc_url($image_url) . '" alt="Image" style=" max-width: 25%; max-height: 100px;">';
            $image .= '</div>';
        }

        $bgcolor =  ($item['bg_color']) ? $item['bg_color'] : '#aa142d';
        $testimonial = '<div class="testimonials" id="testimonial" style="background-color:' . $bgcolor . ';">';
        $testimonial .= '<div class="container">';
        $testimonial .= $image;
        $testimonial .= '<div class="text">' . $item['title'] . '</div>';
        $testimonial .= '<div class="designation">' . $item['author'] . '</div>';
        $testimonial .= ' <div class="company-name">' . $item['excerpt'] . '</div>';
        $testimonial .= '</div>';
        $testimonial .= ' </div>';
        return $testimonial;
    }
}

if (!function_exists('ib_render_testimonials_block')) {
    /**
     * Render the testimonial block.
     *
     * @param array $attributes Current block attributes.
     * @return string
     */

    function ib_render_testimonials_block($attributes)
    {    
        if (is_admin()) {
            return '';
        }

        $data = ib_testimonials_process_content($attributes);

        if (!$data) {
            return '';
        }

        if ($attributes['type'] === 'category') {
            return $data;
        }
       
        foreach ($data as $index => $item) {
            $testimonials = ib_render_testimonials_item($item);
            return  $testimonials;
        }
    }
}
