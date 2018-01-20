<?php

/**
 * Caxton - Gutenberg pro Admin class
 */
class Caxton_Admin {

	/** @var Caxton_Admin Instance */
	private static $_instance = null;

	/* @var string $token Plugin token */
	public $token;

	/* @var string $url Plugin root dir url */
	public $url;

	/* @var string $path Plugin root dir path */
	public $path;

	/* @var string $version Plugin version */
	public $version;

	/**
	 * Constructor function.
	 * @access  private
	 * @since  1.0.0
	 */
	private function __construct() {
		$this->token   = Caxton::$token;
		$this->url     = Caxton::$url;
		$this->path    = Caxton::$path;
		$this->version = Caxton::$version;
	} // End instance()

	/**
	 * Main Caxton - Gutenberg pro Instance
	 * Ensures only one instance of Storefront_Extension_Boilerplate is loaded or can be loaded.
	 * @return Caxton_Admin instance
	 * @since  1.0.0
	 */
	public static function instance() {
		if ( null == self::$_instance ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	} // End __construct()

	/**
	 * Adds front end stylesheet and js
	 * @action wp_enqueue_scripts
	 */
	public function enqueue() {
		$token = $this->token;
		$url   = $this->url;

		wp_enqueue_style( $token . '-css', $url . '/assets/front.css' );

		wp_enqueue_style( $token . '-gb', $url . '/assets/block.css' );

		wp_enqueue_script( $token . '-gb', $url . 'assets/block.js', array( 'wp-blocks' ) );
		$categories = [];

		$cats = get_categories();

		foreach ( $cats as $cat ) {
			/** @var WP_Term $cat */
			$categories[] = [
				'label' => $cat->name,
				'value' => $cat->term_id,
			];
		}

		wp_localize_script( $token . '-gb', 'caxton', [
			'postCategories' => $categories,
		] );
	}

	public function rest_api_init() {
		register_rest_route( 'caxton/v1', '/posts', array(
			'methods'  => 'GET',
			'callback' => [ $this, 'api_posts' ],
		) );
	}

	public function api_posts() {
		die( json_encode( $this->posts() ) );
	}

	/**
	 * Returns posts from query args
	 * @param array $args WP_Query args
	 * @return array Posts
	 */
	public function posts( $args = [] ) {
		$output = [];
		$args = array_merge(
			[
				'post_type' => 'post',
				'meta_key'  => '_thumbnail_id',
			], $_REQUEST, $args );
		$qry    = new WP_Query( $args );

		while ( $qry->have_posts() ) {
			$qry->the_post();
			$output[] = [
				'title'    => get_the_title(),
				'date'     => the_date( '', '', '', false ),
				'excerpt'  => strip_tags( apply_filters( 'the_excerpt', get_the_excerpt() ) ),
				'img'      => get_the_post_thumbnail( null, 'medium' ),
				'thumb_md' => get_the_post_thumbnail_url( null, 'medium' ),
				'thumb_ml' => get_the_post_thumbnail_url( null, 'medium_large' ),
				'thumb_lg' => get_the_post_thumbnail_url( null, 'large' ),
				'link'     => get_the_permalink(),
			];
		}

		return $output;
	}
}
