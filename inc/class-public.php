<?php

/**
 * Caxton - Gutenberg pro public class
 */
class Caxton_Public{

	/** @var Caxton_Public Instance */
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
	 * Caxton - Gutenberg pro public class instance
	 * @return Caxton_Public instance
	 */
	public static function instance() {
		if ( null == self::$_instance ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Constructor function.
	 * @access  private
	 * @since   1.0.0
	 */
	private function __construct() {
		$this->token   =   Caxton::$token;
		$this->url     =   Caxton::$url;
		$this->path    =   Caxton::$path;
		$this->version =   Caxton::$version;
	}

	/**
	 * Adds front end stylesheet and js
	 * @action wp_enqueue_scripts
	 */
	public function enqueue() {
		$token = $this->token;
		$url = $this->url;

		wp_enqueue_style( $token . '-css', $url . '/assets/front.css' );
		wp_enqueue_script( '-js', $url . '/assets/front.js', array( 'jquery' ) );
		wp_enqueue_script( $token . '-js', $url . '/assets/front.js', array( 'jquery' ) );
	}

	public function register_blocks() {
		register_block_type(
			'caxton/posts-grid',
			[ 'render_callback' => [ $this, 'post_grid' ] ]
		);


		function my_plugin_render_block_latest_post( $attributes ) {
			$recent_posts = wp_get_recent_posts( array(
				'numberposts' => 1,
				'post_status' => 'publish',
			) );
			if ( count( $recent_posts ) === 0 ) {
				return 'No posts';
			}
			$post = $recent_posts[ 0 ];
			$post_id = $post['ID'];
			return sprintf(
				'<a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a>',
				esc_url( get_permalink( $post_id ) ),
				esc_html( get_the_title( $post_id ) )
			);
		}

		register_block_type( 'my-plugin/latest-post', array(
			'render_callback' => 'my_plugin_render_block_latest_post',
		) );
	}

	public function post_grid( $block ) {
		$order = ! empty( $block['order'] ) ? explode( '/', $block['order'] ) : [ 'date', 'desc' ];
		$args = [
			'posts_per_page' => $block['rows'] * $block['columns'],
			'cat'            => $block['cat'],
			'orderby'        => $order[0],
			'order'          => $order[1],
		];
		$posts = Caxton_Admin::instance()->posts( $args );
		ob_start();

		$classes = "caxton-posts-grid caxton-grid";

		if ( ! empty( $block['circularImages'] ) )	$classes .= ' caxton-circle-images';
		if ( ! empty( $block['titleBelowImage'] ) )	$classes .= ' caxton-title-below-image';

		echo "<div class='$classes'>";
		$width = $block['columns'] ? 100 / $block['columns'] : 50;
		foreach ( $posts as $post ) {
			$in_image = $after_image = '';

			if ( empty( $block['titleBelowImage'] ) )	{
				$in_image .= "<h3 class='grid-title'>$post[title]</h3>\n";
			} else {
				$after_image .= "<h3 class='grid-title'>$post[title]</h3>\n";
			}
			if ( $block['displayDate'] )		$after_image .= "<time>$post[date]</time>\n";
			if ( $block['displayExcerpt'] )	$after_image .= "<p>$post[excerpt]</p>\n";

			echo <<<HTML
<div class="grid-item" style="width: {$width}%">
	<a href="$post[link]">
		<div class="grid-image" style="background-image: url('$post[thumb_ml]');">
			$in_image
		</div>
	</a>
	$after_image
</div>
HTML;
		}
		echo '</div>';

		return ob_get_clean();
	}
}
