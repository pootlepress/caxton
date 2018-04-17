/**
 * Plugin front end scripts
 *
 * @package Caxton
 * @version 1.0.0
 */
jQuery(function ($) {

	function processResponsiveCSS( css, $t ) {
		var styles = {},
			attributes = css.split(';');

		for (var i = 0; i < attributes.length; i++) {
			var entry = attributes[i].split(':');
			styles[entry.splice(0,1)[0]] = entry.join(':');
		}
		$t.css( styles );
	}

	$( window ).resize( function() {
		if ( window.innerWidth > 1024 ) {
			// Desktop
			$( '[data-desktop-css]' ).each( function () {
				var $t = $(this );
				processResponsiveCSS( $t.data( 'desktop-css' ), $t )
			} );
		} else if ( window.innerWidth > 700 ) {
			// Tab
			$( '[data-tablet-css]' ).each( function () {
				var $t = $(this );
				processResponsiveCSS( $t.data( 'tablet-css' ), $t )
			} );
		}  else {
			// Mobile
			$( '[data-mobile-css]' ).each( function () {
				var $t = $(this );
				processResponsiveCSS( $t.data( 'mobile-css' ), $t )
			} );
		}
	} );

	$( '.caxton-posts-slider' ).each( function() {
		var $t = $( this );
		$t.initSlider();// @TODO Get slider intiated here
	} );

});