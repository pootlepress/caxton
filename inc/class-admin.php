<?php

/**
 * Caxton - Gutenberg pro Admin class
 */
class Caxton_Admin {

	/** @var Caxton_Admin Instance */
	private static $_instance = null;
	/* @var string $token Plugin token */
	public $token; // End __construct()
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
	}

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
	} // End instance()

	public function admin_menu() {
		add_menu_page( 'Caxton', 'Caxton', 'manage_options', 'caxton', [ $this, 'caxton_page' ] );
	}

	public function admin_init() {
		register_setting( 'caxton_disabled_block', 'caxton_disabled_block' );
	}

	public function caxton_page() {
		include 'tpl.caxton-admin-page.php';
	}

	/**
	 * Adds front end stylesheet and js
	 * @action wp_enqueue_scripts
	 */
	public function enqueue() {
		$url   = $this->url . 'assets/';
		Caxton::instance()->public->enqueue();

//		wp_enqueue_script( "$token-components", $url . 'assets/caxton-components.build.js', array( 'wp-blocks' ) );
		wp_enqueue_script( "caxton", $url . 'caxton.min.js', array( 'wp-i18n', 'wp-edit-post', 'wp-element', 'wp-editor', 'wp-components', 'wp-data', 'wp-plugins', 'wp-edit-post', 'wp-api', 'wp-block-library', 'caxton-utils' ) );

		wp_enqueue_script( "caxton-blocks", $url . 'blocks.min.js', array( "caxton" ) );
		wp_enqueue_style( "caxton-blocks", $url . 'blocks.css' );

		$this->localize_scripts( $url );

		$this->hide_disable_blocks();
	}

	protected function localize_scripts( $url ) {
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

		$post_id = filter_input( INPUT_GET, 'post' );

		wp_localize_script( "caxton", 'caxton', [
			'post'           => $post_id,
			'content_vars'   => self::get_content_vars( $post_id ),
			'postCategories' => $categories,
			'fonts'          => $caxton_fonts,
		] );

	}

	public static function get_content_vars( $post_id ) {
		return [
			'featured_image_medium_large' => get_the_post_thumbnail_url( $post_id, 'medium_large' ),
			'featured_image_large'        => get_the_post_thumbnail_url( $post_id, 'large' ),
			'featured_image_full'         => get_the_post_thumbnail_url( $post_id, 'full' ),
			'featured_image'              => get_the_post_thumbnail_url( $post_id, 'large' ),
		];
	}

	public function add_meta_boxes() {
		add_meta_box( 'caxton', __( 'Caxton Styles', 'caxton' ), [ $this, 'caxton_metabox' ], null, 'side' );
	}

	public function block_categories( $categories ) {
		$categories[] = [
			'slug' => 'caxton',
			'title' => __( 'Caxton', 'caxton' ),
		];
		return $categories;
	}

	public function caxton_metabox( $post ) {
		$settings = array(
			'codeEditor' => wp_enqueue_code_editor( compact( 'file' ) ),
		);

		$caxton_style = get_post_meta( $post->ID, 'caxton_style', true );
		$caxton_data  = get_post_meta( $post->ID, 'caxton_data', true );

		wp_enqueue_script( 'wp-theme-plugin-editor' );
		wp_localize_script( 'wp-theme-plugin-editor', 'caxtonCSSEditor', $settings );
		wp_add_inline_script( 'wp-theme-plugin-editor', "
			caxtonInitStylEditor = function() {
				caxtonCSSEditor.codeEditor.codemirror.mode = 'css';
				var textarea = jQuery( '#caxton-style' );
				if ( textarea.length ) wp.themePluginEditor.init( textarea, caxtonCSSEditor );
			};
			caxtonInitStylEditor();" );
		wp_add_inline_script( 'wp-theme-plugin-editor', sprintf( 'wp.themePluginEditor.themeOrPlugin = "plugin";' ) );

		wp_nonce_field( 'caxton_meta_nonce', 'caxton_meta_nonce' );

//		var_dump( $caxton_style, $caxton_data );
		?>
		<input type="hidden" name="caxton_data" value="<?php echo $caxton_data ?>">
		<div id="caxton-style">
			<textarea name="caxton_style" id="newcontent" cols="30" rows="10"><?php echo $caxton_style ?></textarea>
		</div>
		<?php
	}

	public function save_post( $post_id ) {
		if ( empty( $post_id ) || ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) ) {
			return;
		}

		// Validate nonce
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'caxton_meta_nonce' ), 'caxton_meta_nonce' ) ) {
			return;
		}

		update_post_meta( $post_id, 'caxton_style', filter_input( INPUT_POST, 'caxton_style' ) );
		update_post_meta( $post_id, 'caxton_data', filter_input( INPUT_POST, 'caxton_data' ) );
	}

	public function rest_permission() {
		return is_user_logged_in();
	}

	public function rest_api_init() {
		register_rest_route( 'caxton/v1', '/posts', array(
			'permission_callback' => [ $this, 'rest_permission' ],
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
	 *
	 * @param array $args WP_Query args
	 *
	 * @return array Posts
	 */
	public function posts( $args = [] ) {
		$output = [];
		$args   = array_merge(
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

		if ( ! empty( $args['post__in'] ) && ! is_array( $args['post__in'] ) ) {
			$args['post__in'] = explode( ',', $args['post__in'] );
		}

		$args['post__not_in'][] = get_the_ID();

		$qry = new WP_Query( $args );

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

		wp_reset_postdata();

		return $output;
	}

	public function caxton_save_blocks() {
		die( update_option( 'caxton_all_locks', $_POST['blocks'], false ) );
	}

	private function hide_disable_blocks() {
		$disabled_blocks = get_option( 'caxton_disabled_block' );
		if ( $disabled_blocks ) {
			?>
			<style id="caxton-hidden-block-styles">
				.block-editor-block-list-item-<?php echo str_replace( '/', '-', implode( ', .block-editor-block-list-item-', $disabled_blocks ) ); ?> {
					display: none !important;
				}
			</style>
			<?php
		}
	}
}
