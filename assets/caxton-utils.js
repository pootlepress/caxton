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

function caxtonHeadAsset( _url, callback ) {
	var head = document.head, el;

	url = _url.indexOf( '//' ) > - 1 ? _url : caxtonUtilProps.assetsUrl + _url;


	if ( ! callback ) {
		callback = function() {};
	}

	if ( url.indexOf( '.css' ) > -1 ) {
		el = head.querySelector( 'link[href="' + url + '"]' );

		if ( ! el ) {
			el = document.createElement("link");

			el.type = "text/css";
			el.rel = "stylesheet";
			el.href = url;
		} else {
			callback( el );
			return el;
		}

	} else if ( url.indexOf( '.js' ) > -1 ) {
		el = head.querySelector( 'script[src="' + url + '"]' );

		if ( ! el ) {
			el = document.createElement( "script" );
			el.type = "text/javascript";
			el.src = url;
		} else {
			callback( el );
			return el;
		}
	} else {
		return console.error( 'Unhandled URL, neither JS nor CSS ' + _url );
	}

	head.appendChild(el);

	if ( el ) {
		el.onload = function() { callback( el ) };
	}

	return el;
}

var isMSBrowser = caxtonDetectIE();
if ( isMSBrowser && -1 === isMSBrowser.indexOf( 'Edge' ) ) {
	CaxtonUtils.asset( 'ie.css' );
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
			callback.apply( els[i], [ els[i], i ] );
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
		var caxtonFontsToLoad = [];
		CaxtonUtils.each( '[style*="font-family"]', function () {
			var font = this.style.fontFamily;
			if ( font && -1 === font.indexOf( ',' ) && caxtonFontsToLoad.indexOf( font ) === - 1 ) {
				caxtonFontsToLoad.push( font );
			}
		} );
		if ( caxtonFontsToLoad.length ) {
			var gfUrl = 'https://fonts.googleapis.com/css?family=' + caxtonFontsToLoad.join( '|' ) + '#.css';
			CaxtonUtils.asset( gfUrl );
		}
	},
	asset: caxtonHeadAsset,
	ready: function ( fn ) {
		if ( document.readyState != 'loading' ) {
			fn();
		} else {
			document.addEventListener( 'DOMContentLoaded', fn );
		}
	},

	// region Flexslider
	addFlexslider: function ( callback ) {
		if ( typeof jQuery === 'undefined' ) {
			CaxtonUtils.asset( 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js' );
		}
		CaxtonUtils.asset( 'flexslider.css' );
		if ( typeof jQuery.flexslider === 'undefined' ) {
			CaxtonUtils.asset( 'flexslider.min.js', callback );
		} else {
			callback();
		}
	},

	flexslider: function () {
		if ( document.querySelector( '.caxton-slider-pending-setup' ) ) {
			CaxtonUtils.addFlexslider( function () {
				CaxtonUtils.each( '.caxton-slider-pending-setup', function () {
					jQuery( this ).removeClass( 'caxton-slider-pending-setup' ).flexslider();
				} );
			} );
		}
		if ( document.querySelector( '.caxton-carousel-pending-setup' ) ) {
			CaxtonUtils.addFlexslider( function () {
				CaxtonUtils.each( '.caxton-carousel-pending-setup', function () {
					var $t = jQuery( this );
					$t.removeClass( 'caxton-carousel-pending-setup' ).flexslider( {
						move         : 1,
						animation    : "slide",
						animationLoop: false,
						itemWidth    : 250,
						itemMargin   : + ( $t.data( 'item-margin' ) || 16 ),
						minItems     : 1.6,
						maxItems     : 4.3,
					} );
				} );
			} );
		}
	},
	// endregion Flexslider

};
// endregion UX Utilities

// region Init default UX watchers
CaxtonUtils.watchScroll( '.caxton-scroll', Math.min( 50, window.innerHeight / 12 ) );
// endregion Init default UX watchers

CaxtonUtils.ready( function () {
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

	CaxtonUtils.flexslider();

	if ( document.querySelector( '.fas, .fab, .far' ) ) {
		CaxtonUtils.asset( '//use.fontawesome.com/releases/v5.5.0/css/all.css' );
	}
	setTimeout( function () { CaxtonUtils.loadFonts() }, 1100 );
	setTimeout( function () { CaxtonUtils.loadFonts() }, 2000 );
	setTimeout( function () { CaxtonUtils.loadFonts() }, 3200 );
	setTimeout( function () { CaxtonUtils.loadFonts() }, 5000 );
} );