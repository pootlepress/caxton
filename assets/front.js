/**
 * Plugin front end scripts
 *
 * @package Caxton
 * @version 1.0.0
 */
jQuery(function ($) {

	$( '.caxton-posts-slider' ).each( function() {
		var $t = $( this );
		$t.initSlider();// @TODO Get slider intiated here
	} );

});