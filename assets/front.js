/**
 * Plugin front end scripts
 *
 * @package Caxton
 * @version 1.0.0
 */
jQuery(function ($) {

	function applyStylesFromCSS( css, $t, saveCurrentStyles ) {
		var styles = {},
			attributes = css.split(';');

		for (var i = 0; i < attributes.length; i++) {
			var entry = attributes[i].split(':');
			styles[entry.splice(0,1)[0]] = entry.join(':');
		}
		if ( $t ) {
			if ( saveCurrentStyles ) {
				var presetStyles = {};
				for ( var prop in styles ) {
					if ( styles.hasOwnProperty( prop ) ) {
						presetStyles[prop] = $t.css( prop );
					}
				}
				$t.data( 'defaultCss', presetStyles );
			}
			$t.css( styles );
		}

		return styles;
	}

	$( window ).resize( function() {
		if ( window.innerWidth > 1024 ) {
			// Desktop
			$( '[data-desktop-css]' ).each( function () {
				var $t = $(this );
				applyStylesFromCSS( $t.data( 'desktop-css' ), $t )
			} );
		} else if ( window.innerWidth > 700 ) {
			// Tab
			$( '[data-tablet-css]' ).each( function () {
				var $t = $(this );
				applyStylesFromCSS( $t.data( 'tablet-css' ), $t )
			} );
		}  else {
			// Mobile
			$( '[data-mobile-css]' ).each( function () {
				var $t = $(this );
				applyStylesFromCSS( $t.data( 'mobile-css' ), $t )
			} );
		}
	} );

	$( '[data-hover-css]' ).hover( function () {
		var $t = $(this );
		applyStylesFromCSS( $t.data( 'hover-css' ), $t, 'saveCurrentStyles' )
	}, function () {
		var $t = $(this );
		$t.css( $t.data( 'defaultCss' ) );
	} );

	$( '.caxton-posts-slider' ).each( function() {
		var $t = $( this );
		$t.initSlider();// @TODO Get slider intiated here
	} );

});