<?php
/*
 * Plugin Name: Caxton
 * Plugin URI: http://shramee.me/
 * Description: Caxton - blocks for Gutenberg
 * Author: PootlePress
 * Version: 1.30.1
 * Author URI: https://pootlepress.com/
 * @developer shramee <shramee.srivastav@gmail.com>
 * TACHYONS v4.9.0 | http://tachyons.io - MIT License
 */
function caxton_init() {
	if ( function_exists( 'register_block_type' ) ) {
		define( 'CAXTON_VERSION', '1.30.1' );
		/** Plugin variables */
		require 'inc/vars.php';
		/** Plugin admin class */
		require 'inc/class-admin.php';
		/** Plugin public class */
		require 'inc/class-public.php';
		/** Plugin main class */
		require 'caxton-main.php';

		/** Intantiating main plugin class */
		Caxton::instance( __FILE__ );
	}
}
add_action( 'plugins_loaded', 'caxton_init', 0 );