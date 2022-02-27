<?php
/*
 * Plugin Name: Caxton
 * Plugin URI: http://shramee.me/
 * Description: Caxton - blocks for Gutenberg
 * Author: PootlePress
 * Version: 1.30.0
 * Author URI: https://pootlepress.com/
 * @developer shramee <shramee.srivastav@gmail.com>
 * TACHYONS v4.9.0 | http://tachyons.io - MIT License
 */
function caxton_init() {
	if ( function_exists( 'register_block_type' ) ) {
		define( 'CAXTON_VERSION', '1.30.0' );
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

// Create a helper function for easy SDK access.
function caxton_fs() {
	global $caxton_freemius;

	if ( ! isset( $caxton_freemius ) ) {
		// Include Freemius SDK.
		require_once dirname(__FILE__) . '/inc/wp-sdk/start.php';

		$caxton_freemius = fs_dynamic_init( array(
			'id'                  => '2122',
			'slug'                => 'caxton',
			'type'                => 'plugin',
			'public_key'          => 'pk_73bcf4bddd9d42811d4e755c16fab',
			'is_premium'          => false,
			'has_addons'          => false,
			'has_paid_plans'      => false,
			'is_org_compliant'    => false,
			'menu'                => array(
				'slug'           => 'caxton',
				'support'        => false,
			),
		) );
	}

	return $caxton_freemius;
}

// Init Freemius.
caxton_fs();
// Signal that SDK was initiated.
do_action( 'caxton_fs_loaded' );