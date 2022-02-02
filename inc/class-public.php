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
	 * Registers Caxton scripts
	 */
	public function register_scripts() {
		$ver = $this->version;
		$assets = $this->url . 'assets';

		wp_register_style( 'caxton-front', "$assets/front.css", [], $ver );
		wp_register_script( 'caxton-utils', "$assets/caxton-utils.min.js", [], $ver, 'in_footer' );

		$this->localize();
	}

	/**
	 * Adds front end stylesheet and js
	 * @action wp_enqueue_scripts
	 */
	public function enqueue() {
		wp_enqueue_style( 'caxton-front' );
		wp_enqueue_script( 'caxton-utils' );

		$this->enqueue_compat();
	}

	private function enqueue_compat() {
		$ver = $this->version;
		$url = $this->url . 'assets/compat';

		if ( function_exists( 'twentynineteen_setup' ) ) {
			wp_enqueue_style( 'caxton-2019', "$url/2019.css", [], $ver, 'in_footer' );
		}
	}

	private function localize() {
		wp_localize_script( "caxton-utils", 'caxtonUtilProps', [
			'assetsUrl' => $this->url . 'assets/',
		] );
	}

	public function register_blocks() {
		register_block_type(
			'caxton/posts-grid',
			[
				'render_callback' => [ $this, 'post_grid' ],
				'supports'        => [],
				'script'          => 'caxton-front',
				'style'           => 'caxton-utils',
			]
		);
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

	public static function processTemplate( $template, $properties ) {
		$search = $replace = [];
		foreach ( $properties as $k => $v ) {
			$search[]  = '{{' . $k . '}}';
			$replace[] = $v;
		}
		return str_replace( $search, $replace, $template );
	}
}
