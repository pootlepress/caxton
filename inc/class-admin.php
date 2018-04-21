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
		wp_enqueue_style( 'font-awesome', 'https://use.fontawesome.com/releases/v5.0.10/css/all.css' );
		wp_enqueue_style( $token . '-gb', $url . '/assets/block.css' );

		wp_enqueue_script( $token, $url . 'assets/caxton.js', array( 'wp-blocks' ) );
		wp_enqueue_script( "$token-blocks", $url . 'assets/block.js', array( $token ) );
		wp_enqueue_script( $token . '-js', $url . '/assets/caxton-utils.js', array( 'jquery' ) );

		$caxton_fonts = $categories = [
			[
				'label' => 'Please choose...',
				'value' => '',
			]
		];

		$cats = get_categories();

		foreach ( $cats as $cat ) {
			/** @var WP_Term $cat */
			$categories[] = [
				'label' => $cat->name,
				'value' => $cat->term_id,
			];
		}

		$fonts = caxton_fonts();
		foreach ( $fonts as $val => $label ) {
			/** @var WP_Term $cat */
			$caxton_fonts[] = [
				'label' => $label,
				'value' => $val,
			];
		}

		wp_localize_script( $token, 'caxton', [
			'post' => filter_input( INPUT_GET, 'post' ),
			'postCategories' => $categories,
			'fonts' => $caxton_fonts,
		] );
	}

	public function rest_api_init() {
		register_rest_route( 'caxton/v1', '/posts', array(
			'methods'  => 'GET',
			'callback' => [ $this, 'api_posts' ],
		) );
	}

	public function api_posts() {
		if ( isset( $_REQUEST['post_type'] ) ) {
			$type = get_post_type_object( $_REQUEST['post_type'] );
			if ( ! $type ) {
				return sprintf( __( "Post type %s doesn't exist", 'caxton' ), $_REQUEST['post_type'] );
			} else if ( ! $type->public ) {
				return sprintf( __( "Post type %s is not public", 'caxton' ), $type->name );
			}
		}

		$denied_params = [
			// Disallow password params
			'has_password',
			'post_password',
			// Disallow post status param
			'post_status',
			// Disallow changing permission param
			'perm',
			// Disallow caching params
			'cache_results',
			'update_post_meta_cache',
			'update_post_term_cache',
		];

		foreach ( $denied_params as $param ) {
			unset( $_REQUEST[ $param ] );
		}

		return $this->posts( $_REQUEST );
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
			], $args );

		if ( empty( $args['post__not_in'] ) ) {
			$args['post__not_in'] = [];
		}
		if ( ! is_array( $args['post__not_in'] ) ) {
			$args['post__not_in'] = explode( ',', $args['post__not_in'] );
		}

		$args['post__not_in'][] = get_the_ID();

		$qry    = new WP_Query( $args );

		while ( $qry->have_posts() ) {
			$qry->the_post();
			$output[] = [
				'id'       => get_the_ID(),
				'title'    => get_the_title(),
				'date'     => the_date( '', '', '', false ),
				'author'   => get_the_author_posts_link(),
				'comments' => get_comments_number_text(),
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
