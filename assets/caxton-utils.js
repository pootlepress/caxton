/**
 * Plugin front end scripts
 *
 * @package Caxton
 * @version 1.0.0
 */

// region Is IE
function caxtonDetectIE() {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf( "MSIE " );
	if ( msie > 0 ) {
		return 'IE/' + parseInt( ua.substring( msie + 5, ua.indexOf( ".", msie ) ), 10 )
	}
	var trident = ua.indexOf( "Trident/" );
	if ( trident > 0 ) {
		var rv = ua.indexOf( "rv:" );
		return 'Trident/' + parseInt( ua.substring( rv + 3, ua.indexOf( ".", rv ) ), 10 )
	}
	var edge = ua.indexOf( "Edge/" );
	if ( edge > 0 ) {
		return 'Edge/' + parseInt( ua.substring( edge + 5, ua.indexOf( ".", edge ) ), 10 )
	}
	return false
}

var isMSBrowser = caxtonDetectIE();
if ( isMSBrowser && -1 === isMSBrowser.indexOf( 'Edge' ) ) {
	var head = document.head;
	var link = document.createElement("link");

	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = caxtonUtilProps.url + 'assets/ie.css';

	head.appendChild(link);
}
// endregion Is IE

// region UX Utilities
var CaxtonUtils = {
	closest    : function ( el, predicate ) {
		return predicate( el ) ? el : (
			el && CaxtonUtils.closest( el.parentNode, predicate )
		);
	},
	watchScroll: function ( selector, startBuffer ) {
		var watchOnScroll = function () {
			var elems = document.querySelectorAll( selector );
			startBuffer = startBuffer ? startBuffer : 0;
			var docHeight = window.innerHeight;

			for ( var i = 0; i < elems.length; ++ i ) {

				var el = elems[i];

				var boundingBox = el.getBoundingClientRect();

				var inView = 0;
				if ( boundingBox.top >= 0 && boundingBox.top <= docHeight ) {
					el.classList.add( '-top-in-view' );
					inView = 1;
				} else {
					el.classList.remove( '-top-in-view' );
				}

				if ( boundingBox.bottom >= 0 && boundingBox.bottom <= docHeight ) {
					el.classList.add( '-bottom-in-view' );
					inView = 1;
				} else {
					el.classList.remove( '-bottom-in-view' );
				}

				if ( inView ) {
					el.classList.add( '-in-view' );
				} else {
					el.classList.remove( '-in-view' );
				}
			}
		};

		window.onscroll = watchOnScroll;
		watchOnScroll();
	},
	each: function( selector, callback ) {
		var els = document.querySelectorAll( selector );
		for ( var i = 0; i < els.length; i ++ ) {
			callback.apply( els[i], [ i ] );
		}
	},
	delegate: function( eventName, elementSelector, handler ) {
		document.addEventListener( eventName, function ( e ) {
			// loop parent nodes from the target to the delegation node
			for ( var target = e.target; target && target != this; target = target.parentNode ) {
				if ( target.matches( elementSelector ) ) {
					handler.call( target, e );
					break;
				}
			}
		}, false );
	},
	loadFonts: function() {
		if ( ! this.fontsLinkEl ) {
			this.fontsLinkEl = document.createElement('link');
			this.fontsLinkEl.setAttribute( 'id', 'caxton-google-fonts' );
			this.fontsLinkEl.setAttribute( 'rel', 'stylesheet' );
			document.querySelector( 'body' ).appendChild( this.fontsLinkEl );
		}

		var caxtonFontsToLoad = [];
		CaxtonUtils.each( '[style*="font-family"]', function () {
			var font = jQuery( this ).css( 'font-family' );
			if ( - 1 === font.indexOf( ',' ) && caxtonFontsToLoad.indexOf( font ) === - 1 ) {
				caxtonFontsToLoad.push( font );
			}
		} );
		this.fontsLinkEl.setAttribute( 'href', 'https://fonts.googleapis.com/css?family=' + caxtonFontsToLoad.join( '|' ) );
	}
};
// endregion UX Utilities

// region Init default UX watchers
CaxtonUtils.watchScroll( '.caxton-scroll', Math.min( 50, window.innerHeight / 12 ) );
// endregion Init default UX watchers

jQuery( function ( $ ) {
	function applyStylesFromCSS( css, that, saveCurrentStyles ) {
		if ( css === 'default' ) {
			that.setAttribute( 'style', that.getAttribute( 'data-default-css' ) );
			that.removeAttribute( 'data-default-css' );
			return;
		}

		var styles     = {},
				attributes = css.split( ';' );

		for ( var i = 0; i < attributes.length; i ++ ) {
			var entry = attributes[i].split( ':' );
			styles[entry.splice( 0, 1 )[0]] = entry.join( ':' );
		}
		if ( this ) {
			if ( saveCurrentStyles ) {
				if ( ! that.getAttribute( 'data-default-css' ) ) {
					that.setAttribute( 'data-default-css', that.getAttribute( 'style' ) );
				}
			}
			for ( var prop in styles ) {
				if ( prop && styles.hasOwnProperty( prop ) ) {
					that.style[prop]=styles[prop];
				}
			}
		}

		return styles;
	}

	window.caxtonResponsiveStyling = function ( width ) {
		width = isNaN( width ) ? window.innerWidth : width;
		if ( width > 1024 ) {
			// Desktop
			CaxtonUtils.each( '[data-desktop-css]', function () {
				applyStylesFromCSS( this.getAttribute( 'data-desktop-css' ), this )
			} );
		} else if ( width > 700 ) {
			// Tab
			CaxtonUtils.each( '[data-tablet-css]', function () {
				applyStylesFromCSS( this.getAttribute( 'data-tablet-css' ), this )
			} );
		} else {
			// Mobile
			CaxtonUtils.each( '[data-mobile-css]', function () {
				applyStylesFromCSS( this.getAttribute( 'data-mobile-css' ), this )
			} );
		}
	};

	window.addEventListener( 'resize', caxtonResponsiveStyling );
	caxtonResponsiveStyling();

	CaxtonUtils.delegate( 'mouseover', '[data-hover-css]', function () {
		applyStylesFromCSS( this.getAttribute( 'data-hover-css' ), this, 'saveCurrentStyles' )
	} );

	CaxtonUtils.delegate( 'mouseout', '[data-hover-css]', function () {
		applyStylesFromCSS( 'default', this );
	} );

	function findTarget( el, selector ) {
		if ( ! selector ) {
			return el.parentElement;
		}
		var target = el.parentElement.querySelector( selector );
		if ( ! target ) {
			target = document.querySelector( selector );
		}
		return target;
	}

	CaxtonUtils.delegate( 'click', '[data-toggle-class]', function affectToggleClass() {
		var el          = this,
				target      = findTarget( el, el.getAttribute( 'data-toggle-target' ) ),
				toggleClass = el.getAttribute( 'data-toggle-class' ) || 'toggle';

		target.classList.toggle( toggleClass )
	} );

	CaxtonUtils.delegate( 'click', '[data-toggle]', function ( e ) {
		var el     = this,
				target = findTarget( el, el.getAttribute( 'data-toggle' ) );
		target.style.display = target.style.display === 'none' ? '' : 'none';
	} );

	CaxtonUtils.loadFonts();

	// region @TODO Maybe use a non jQuery slider instead of flexslider
	caxtonSetupCarousel = function () {
		CaxtonUtils.each( '.caxton-carousel-pending-setup', function () {
			if ( ! el.getAttribute( 'data-item-margin' ) ) {
				el.setAttribute( 'data-item-margin', 16 )
			}
			$( this ).removeClass( 'caxton-carousel-pending-setup' ).flexslider( {
				animation    : "slide",
				animationLoop: true,
				itemWidth    : 210,
				itemMargin   : $sliders.data( 'item-margin' ),
			} );
		} );
	};

	caxtonSetupSlider = function () {
		CaxtonUtils.each( '.caxton-slider-pending-setup', function () {
			$( this ).removeClass( 'caxton-slider-pending-setup' ).flexslider();
		} );
	};
	caxtonSetupCarousel();
	caxtonSetupSlider();
	// endregion @TODO Maybe use a non jQuery slider instead of flexslider

	setTimeout( function () { CaxtonUtils.loadFonts() }, 1100 );
	setTimeout( function () { CaxtonUtils.loadFonts() }, 2000 );
	setTimeout( function () { CaxtonUtils.loadFonts() }, 3200 );
	setTimeout( function () { CaxtonUtils.loadFonts() }, 5000 );
} );