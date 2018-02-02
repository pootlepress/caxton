<?php
/*
Plugin Name: Caxton
Plugin URI: http://shramee.me/
Description: Caxton - blocks for Gutenberg
Author: PootlePress
Version: 0.1.2.1
Author URI: https://pootlepress.com/
@developer shramee <shramee.srivastav@gmail.com>
*/

/** Plugin admin class */
require 'inc/class-admin.php';
/** Plugin public class */
require 'inc/class-public.php';

/**
 * Caxton - Gutenberg pro main class
 * @static string $token Plugin token
 * @static string $file Plugin __FILE__
 * @static string $url Plugin root dir url
 * @static string $path Plugin root dir path
 * @static string $version Plugin version
 */
class Caxton {

	/** @var Caxton Instance */
	private static $_instance = null;

	/** @var string Token */
	public static $token;

	/** @var string Version */
	public static $version;

	/** @var string Plugin main __FILE__ */
	public static $file;

	/** @var string Plugin directory url */
	public static $url;

	/** @var string Plugin directory path */
	public static $path;

	/** @var Caxton_Admin Instance */
	public $admin;

	/** @var Caxton_Public Instance */
	public $public;

	/**
	 * Return class instance
	 * @return Caxton instance
	 */
	public static function instance( $file ) {
		if ( null == self::$_instance ) {
			self::$_instance = new self( $file );
		}
		return self::$_instance;
	}

	/**
	 * Constructor function.
	 * @param string $file __FILE__ of the main plugin
	 * @access  private
	 * @since   0.1.0
	 */
	private function __construct( $file ) {

		self::$token   = 'caxton';
		self::$file    = $file;
		self::$url     = plugin_dir_url( $file );
		self::$path    = plugin_dir_path( $file );
		self::$version = '0.1.2.1';

		add_action( 'plugins_loaded', [ $this, 'init' ] );

	}

	public function init() {
		if ( function_exists( 'the_gutenberg_project' ) ) {
			$this->_admin(); //Initiate admin
			$this->_public(); //Initiate public
		}
	}

	/**
	 * Initiates admin class and adds admin hooks
	 */
	private function _admin() {
		//Instantiating admin class
		$this->admin = Caxton_Admin::instance();

		//Enqueue admin end JS and CSS
		add_action( 'enqueue_block_editor_assets',	array( $this->admin, 'enqueue' ) );
		add_action( 'rest_api_init',	array( $this->admin, 'rest_api_init' ) );
		add_action( 'wp_ajax_caxton_posts',	array( $this->admin, 'posts' ) );

	}

	/**
	 * Initiates public class and adds public hooks
	 */
	private function _public() {
		//Instantiating public class
		$this->public = Caxton_Public::instance();

		//Enqueue front end JS and CSS
		add_action( 'wp_enqueue_scripts',	array( $this->public, 'enqueue' ) );
		add_action( 'init',	array( $this->public, 'register_blocks' ) );

	}
}

/** Intantiating main plugin class */
Caxton::instance( __FILE__ );