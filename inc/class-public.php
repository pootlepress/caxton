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
		$assets = $this->url . 'assets';

		wp_enqueue_style( 'flexslider', "$assets/flexslider.css" );
		wp_enqueue_script( 'flexslider', "$assets/flexslider.min.js", array( 'jquery' ) );

		wp_enqueue_style( 'caxton-front', "$assets/front.css" );
		wp_enqueue_style( 'fontawesome', 'https://use.fontawesome.com/releases/v5.5.0/css/all.css' );

		wp_enqueue_script( 'caxton-utils', "$assets/caxton-utils.js", array( 'flexslider' ) );

		$this->localize();
		$this->enqueue_compat();
	}

	private function enqueue_compat() {
		$url = $this->url . 'assets/compat';

		if ( function_exists( 'twentynineteen_setup' ) ) {
			wp_enqueue_style( 'caxton-2019', "$url/2019.css" );
		}
	}

	private function localize() {
		wp_localize_script( "{$this->token}-utils", 'caxtonUtilProps', [
			'url' => $this->url,
		] );
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
//		var_dump( $block );
		$block = wp_parse_args( $block, [
			'cat'        => [],
			'order'      => 'date/desc',
			'rows'       => 4,
			'columns'    => 2,
			'titleSize'  => 20,
			'imagesType' => '',
		] );
		$args = [
			'posts_per_page' => $block['rows'] * $block['columns'],
			'cat'            => $block['cat'],
			'orderby'        => $order[0],
			'order'          => $order[1],
		];
		if ( ! empty( $block['displayPostWithoutImages'] ) ) {
			$args['meta_key'] = '';
		}
		$posts = Caxton_Admin::instance()->posts( $args );
		ob_start();

		$classes = "caxton-posts-grid caxton-grid";

		$classes .= " caxton-$block[imagesType]-images";

		if ( ! empty( $block['titleBelowImage'] ) )	$classes .= ' caxton-title-below-image';

		$postClass = 'grid-item';
		if ( ! empty( $block['border'] ) )	$postClass .= ' ba';

		echo "<div class='$classes'>";
		$width = $block['columns'] ? 100 / $block['columns'] - 2 : 48;
		foreach ( $posts as $post ) {
			$in_image = $after_image = '';

			$title = "<h3 class='grid-title' style='font-size:$block[titleSize]px'>$post[title]</h3>\n";

			if ( empty( $block['titleBelowImage'] ) )	{
				$in_image .= $title;
			} else {
				$after_image .= $title;
			}

			if ( ! empty( $block['displayDate'] ) )		$after_image .= "<time>$post[date]</time>\n";
			if ( ! empty( $block['displayExcerpt'] ) )	$after_image .= "<p>$post[excerpt]</p>\n";
			if ( ! empty( $block['displayMeta'] ) ) {
				$after_image .=
					'<div class="grid-meta">' .
					"<span class='author'><span class='fa fa-user-circle-o'></span>$post[author]</span>" .
					"<span class='comments'><span class='fa fa-comments'></span>$post[comments]</span>" .
					'</div>';
			}
			echo <<<HTML
<div class="$postClass" style="width: {$width}%">
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

	public static function create_fancy_grid( $items, $data = false ) {
		$grid_items = [];
		$num_items = 0;

		foreach ( $items as $item ) {
			$num_items++;
			$style = 'background-image: url("' . $item['image'] . '")';
			$classes = "caxton-grid-item-$num_items";
			$grid_items[] =
				"<a class='$classes' style='$style' href='$item[link]'><span class='caxton-grid-item-content'>$item[label]</span></a>";

		}

		if ( $data ) {
			return [
				'class' => 'caxton-fancy-grid caxton-fancy-grid-' . $num_items,
				'items' => $grid_items,
			];
		}

		return '<div class="caxton-fancy-grid caxton-fancy-grid-' . $num_items . '">' . implode( '', $grid_items ) . '</div>';

	}

	public static function processTemplate( $template, $properties ) {
		$search = $replace = [];
		foreach ( $properties as $k => $v ) {
			$search[]  = '{{' . $k . '}}';
			$replace[] = $v;
		}
		return str_replace( $search, $replace, $template );
	}
}
