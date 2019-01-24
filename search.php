<?php
/**
 * Search results page
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context = Timber::get_context();

$context['search_query'] = get_search_query();
$context['search_results'] = [];

$search_results = new Timber\PostQuery();
$context['pagination'] = $search_results->pagination();

foreach ($search_results as $sr) {
    $search_result = [
        'title' => $sr->title,
        'link' => $sr->link,
    ];

    switch ($sr->type) {
        default:
            $search_result['type'] = ucwords(str_replace('_', ' ', $sr->post_type));
            $search_result['summary'] = $sr->post_content;
            break;

    }

    if ($search_result) {
        $context['search_results'][] = $search_result;
    }
}


Timber::render('page/search-results.twig', $context);
