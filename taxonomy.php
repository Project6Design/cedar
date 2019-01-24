<?php
/**
 * The main taxonomy file
 */

$context = Timber::get_context();

$term = new TimberTerm();

$context['term'] = $term;
$context['posts'] = new Timber\PostQuery();

Timber::render('taxonomy/default.twig', $context );
