/**
 * Plugin front end scripts
 *
 * @package Caxton
 * @version 1.0.0
 */

// region UX Utilities
const CaxtonUtils = {
	closest    : function ( el, predicate ) {
		return predicate( el ) ? el : (
			el && CaxtonUtils.closest( el.parentNode, predicate )
		);
	},
	watchMouse: function ( selector ) {
		let monitorMouse = document.querySelectorAll( selector );

		if ( 0 < monitorMouse.length ) {

			document.body.style.setProperty( '--cxp-msx', 0 );
			document.body.style.setProperty( '--cxp-msy', 0 );
			document.addEventListener( 'mousemove', function ( e ) {
				let
					x = ( 2 * e.pageX / window.innerWidth ) - 1,
					y = ( 2 * e.pageY / window.innerHeight ) - 1,
					el = e.target;
				document.body.style.setProperty( '--cxp-msx', x );
				document.body.style.setProperty( '--cxp-msy', y );
			} );
		}
	},
	watchScrollSetup: function () {
		if ( this.setupDone ) return;
		console.log( 'scroll setup' );
		let ticking = false;
		this.setupDone = true;
		CaxtonUtils.watchScrollSetup
		let watchScroll = function () {
			let docHeight = window.innerHeight;
			for ( let i = 0; i < CaxtonUtils.watchScrollSetup.targets.length; ++ i ) {
				let el = CaxtonUtils.watchScrollSetup.targets[i];
				let
					boundingBox = el.getBoundingClientRect(),
					height      = boundingBox.height,
					top         = boundingBox.top;
				if ( top >= - 1 * height && top <= docHeight ) {
					scrollArea = docHeight + height;
					el.classList.add( '-in-view' );
					// height + top will max out at docHeight + height
					// So this would be between -1 to 1
					el.style.setProperty( '--scroll', 2 * (
						height + top
					) / scrollArea - 1 );
				} else {
					el.classList.remove( '-in-view' );
				}
			}
		};
		window.addEventListener( 'scroll', function ( e ) {
			console.log( 'scroll' );

			if ( !ticking ) {
				window.requestAnimationFrame( function () {
					watchScroll( e );
					ticking = false;
				} );
				ticking = true;
			}
		} );
		watchScroll();
	},
	watchScroll: function ( selector ) {
		CaxtonUtils.watchScrollSetup.targets = document.querySelectorAll( selector );
		if ( CaxtonUtils.watchScrollSetup.targets.length ) {
			CaxtonUtils.watchScrollSetup();
		}
	},
	each: function( selector, callback ) {
		let els = document.querySelectorAll( selector );
		for ( let i = 0; i < els.length; i ++ ) {
			callback.apply( els[i], [ els[i], i ] );
		}
	},
	delegate: function( eventName, elementSelector, handler ) {
		document.addEventListener( eventName, function ( e ) {
			// loop parent nodes from the target to the delegation node
			for ( let target = e.target; target && target != this; target = target.parentNode ) {
				if ( target.matches( elementSelector ) ) {
					handler.call( target, e );
					break;
				}
			}
		}, false );
	},
	loadFonts: function() {
		let caxtonFontsToLoad = [];
		CaxtonUtils.each( '[style*="font-family"]', function () {
			let font = this.style.fontFamily;
			if ( font && -1 === font.indexOf( ',' ) && caxtonFontsToLoad.indexOf( font ) === - 1 ) {
				caxtonFontsToLoad.push( font );
			}
		} );
		if ( caxtonFontsToLoad.length ) {
			let gfUrl = 'https://fonts.googleapis.com/css?family=' + caxtonFontsToLoad.join( '|' ) + '#.css';
			CaxtonUtils.asset( gfUrl );
		}
	},
	loadedAssets: {}, // Loaded assets record
	asset: function ( _url, callback ) {
		let el;
		const head = document.head;

		const url = _url.indexOf( '//' ) > - 1 ? _url : caxtonUtilProps.assetsUrl + _url;


		if ( ! callback ) {
			callback = function() {};
		}

		if ( url.indexOf( '.css' ) > -1 ) {
			el = head.querySelector( 'link[href="' + url.replace( /"/g, '\\"' ) + '"]' );

			if ( ! el ) {
				el = document.createElement("link");

				el.type = "text/css";
				el.rel = "stylesheet";
				el.href = url;
				head.appendChild(el);
			}
		} else if ( url.indexOf( '.js' ) > -1 ) {
			el = head.querySelector( 'script[src="' + url.replace( /"/g, '\\"' ) + '"]' );

			if ( ! el ) {
				el = document.createElement( "script" );
				el.type = "text/javascript";
				el.src = url;
				head.appendChild(el);
			}
		} else {
			return console.error( 'Unhandled URL, neither JS nor CSS ' + _url );
		}

		if ( el ) {
			if ( ! CaxtonUtils.loadedAssets[url] ) {
				el.addEventListener( 'load', function( e ) {
					CaxtonUtils.loadedAssets[url] = true;
					callback( el );
				} );
			} else {
				callback( el );
			}
		}

		return el;
	},
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
					jQuery( this ).flexslider().removeClass( 'caxton-slider-pending-setup' )
				} );
			} );
		}
		if ( document.querySelector( '.caxton-carousel-pending-setup' ) ) {
			CaxtonUtils.addFlexslider( function () {
				CaxtonUtils.each( '.caxton-carousel-pending-setup', function () {
					let $t = jQuery( this );
					$t.flexslider( {
						move         : 1,
						animation    : "slide",
						animationLoop: false,
						itemWidth    : 250,
						itemMargin   : + ( $t.data( 'item-margin' ) || 16 ),
						minItems     : 1.6,
						maxItems     : 4.3,
					} ).removeClass( 'caxton-carousel-pending-setup' )
				} );
			} );
		}
	},
	// endregion Flexslider

	applyCSS: function ( css, that, saveCurrentStyles ) {
		if ( css === 'default' ) {
			that.setAttribute( 'style', that.getAttribute( 'data-default-css' ) );
			that.removeAttribute( 'data-default-css' );
			return;
		}

		let styles     = {},
				attributes = css.split( ';' );

		for ( let i = 0; i < attributes.length; i ++ ) {
			let entry = attributes[i].split( ':' );
			styles[entry.splice( 0, 1 )[0]] = entry.join( ':' );
		}
		if ( this ) {
			if ( saveCurrentStyles ) {
				if ( ! that.getAttribute( 'data-default-css' ) ) {
					that.setAttribute( 'data-default-css', that.getAttribute( 'style' ) );
				}
			}
			for ( let prop in styles ) {
				if ( prop && styles.hasOwnProperty( prop ) ) {
					that.style[prop]=styles[prop];
				}
			}
		}

		return styles;
	},
	responsiveStyling: function ( width ) {
		width = isNaN( width ) ? window.innerWidth : width;
		let body = document.querySelector( 'body' );
		if ( width > 1024 ) {
			// Desktop
			body.setAttribute( 'data-rwd', 'desktop' );
			CaxtonUtils.each( '[data-desktop-css]', function () {
				CaxtonUtils.applyCSS( this.getAttribute( 'data-desktop-css' ), this )
			} );
		} else if ( width > 700 ) {
			// Tab
			body.setAttribute( 'data-rwd', 'tablet' );
			CaxtonUtils.each( '[data-tablet-css]', function () {
				CaxtonUtils.applyCSS( this.getAttribute( 'data-tablet-css' ), this )
			} );
		} else {
			// Mobile
			body.setAttribute( 'data-rwd', 'mobile' );
			CaxtonUtils.each( '[data-mobile-css]', function () {
				CaxtonUtils.applyCSS( this.getAttribute( 'data-mobile-css' ), this )
			} );
		}
	},
	_stylesManager: function() {
		window.addEventListener( 'resize', function() {
			CaxtonUtils.responsiveStyling()
		} );
		CaxtonUtils.delegate( 'mouseover', '[data-hover-css]', function () {
			CaxtonUtils.applyCSS( this.getAttribute( 'data-hover-css' ), this, 'saveCurrentStyles' )
		} );

		CaxtonUtils.delegate( 'mouseout', '[data-hover-css]', function () {
			CaxtonUtils.applyCSS( 'default', this );
		} );
	},
	_interactionsManager: function() {
		function findTarget( el, selector ) {
			if ( ! selector ) {
				return el.parentElement;
			}
			let target = el.parentElement.querySelector( selector );
			if ( ! target ) {
				target = document.querySelector( selector );
			}
			return target;
		}

		CaxtonUtils.delegate( 'click', '[data-toggle-class]', function( e ) {
			let el          = this,
					target      = findTarget( el, el.getAttribute( 'data-toggle-class' ) ),
					toggleClass = el.getAttribute( 'data-toggle-classname' ) || 'toggle';

			e.preventDefault();
			target.classList.toggle( toggleClass )
		} );
	},
	newContentManager: function() {
		CaxtonUtils.loadFonts();
		CaxtonUtils.flexslider();
		CaxtonUtils.responsiveStyling();
		if ( document.querySelector( '.fa,.fas,.fab,.far' ) ) {
			CaxtonUtils.asset( 'font-awesome.css' );
		}
		CaxtonUtils.watchScroll( '.cxp-scroll' );
		CaxtonUtils.watchMouse( '.cxp-mouse' );
	},
};
// endregion UX Utilities

CaxtonUtils._stylesManager();
CaxtonUtils._interactionsManager();
CaxtonUtils.ready( CaxtonUtils.newContentManager );

window.CaxtonUtils = CaxtonUtils;