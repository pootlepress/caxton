/**
 * Plugin front end scripts
 *
 * @package Caxton
 * @version 1.0.0
 */
jQuery( function ( $ ) {
	var $b = $( 'body' );

	function applyStylesFromCSS( css, $t, saveCurrentStyles ) {
		var styles = {},
			attributes = css.split( ';' );

		for ( var i = 0; i < attributes.length; i ++ ) {
			var entry = attributes[i].split( ':' );
			styles[entry.splice( 0, 1 )[0]] = entry.join( ':' );
		}
		if ( $t ) {
			if ( saveCurrentStyles ) {
				if ( ! $t.data( 'defaultCss' ) ) {
					var presetStyles = {};
					for ( var prop in styles ) {
						if ( styles.hasOwnProperty( prop ) ) {
							presetStyles[prop] = $t.css( prop );
						}
					}
					$t.data( 'defaultCss', presetStyles );
					$t.css( styles );
				}
			} else {
				$t.css( styles );
			}
		}

		return styles;
	}

	window.caxtonResponsiveStyling = function ( width ) {
		width = isNaN( width ) ? window.innerWidth : width;
		if ( width > 1024 ) {
			// Desktop
			$( '[data-desktop-css]' ).each( function () {
				var $t = $( this );
				applyStylesFromCSS( $t.data( 'desktop-css' ), $t )
			} );
		} else if ( width > 700 ) {
			// Tab
			$( '[data-tablet-css]' ).each( function () {
				var $t = $( this );
				applyStylesFromCSS( $t.data( 'tablet-css' ), $t )
			} );
		} else {
			// Mobile
			$( '[data-mobile-css]' ).each( function () {
				var $t = $( this );
				applyStylesFromCSS( $t.data( 'mobile-css' ), $t )
			} );
		}
	}

	$( window ).resize( function () {
		caxtonResponsiveStyling();
	} ).resize();

	$( '[data-hover-css]' ).on( {
		mouseenter: function () {
			var $t = $( this );
			applyStylesFromCSS( $t.data( 'hover-css' ), $t, 'saveCurrentStyles' )
		},
		mouseleave: function () {
			var $t = $( this );
			$t.css( $t.data( 'defaultCss' ) );
			$t.data( 'defaultCss', null );
		}
	} );

	$( '.caxton-posts-slider' ).each( function () {
		var $t = $( this );
		$t.initSlider();// @TODO Get slider intiated here
	} );

	$b.append( "<link rel='stylesheet' id='caxton-google-fonts'>" );
	var $caxtonFontsLink = $( "#caxton-google-fonts" );

	function caxtonLoadFonts() {
		var caxtonFontsToLoad = [];
		$( '[style*="font-family"]' ).each( function () {
			var font = $( this ).css( 'font-family' );
			if ( - 1 === font.indexOf( ',' ) && caxtonFontsToLoad.indexOf( font ) === - 1 ) {
				caxtonFontsToLoad.push( font );
			}
		} );
		if ( caxtonFontsToLoad.length ) {
			$caxtonFontsLink.attr( "href", "http://fonts.googleapis.com/css?family=" + caxtonFontsToLoad.join( '|' ) );
		}
	}

	caxtonSetupCarousel = function () {
		var $sliders = $( '.caxton-carousel-pending-setup' );
		$sliders.each( function () {
			if ( ! $( this ).data( 'item-margin' ) ) {
				$( this ).data( 'item-margin', 16 )
			}
			$( this ).removeClass( 'caxton-carousel-pending-setup' ).flexslider( {
				animation: "slide",
				animationLoop: true,
				itemWidth: 210,
				itemMargin: $sliders.data( 'item-margin' ),
			} );
		} )
	};

	caxtonSetupSlider = function () {
		var $sliders = $( '.caxton-slider-pending-setup' );
		$sliders.each( function () {
			$( this ).removeClass( 'caxton-slider-pending-setup' ).flexslider();
		} )
	};

	caxtonLoadFonts();
	caxtonSetupCarousel();
	caxtonSetupSlider();

	setTimeout( caxtonLoadFonts, 1100 );
	setTimeout( caxtonLoadFonts, 2000 );
	setTimeout( caxtonLoadFonts, 3200 );
	setTimeout( caxtonLoadFonts, 5000 );
} );