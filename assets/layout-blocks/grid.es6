import layoutsData from './layouts.json';

export function gridRender ( props, block, childrenBlocks ) {
	const el = wp.element.createElement;
	var cls    = 'relative ', bgHTML, padUnit, padT, padL, padB, padR,
			colCls = 'relative caxton-columns caxton-grid-block',
			padMob = block.attrs['Inner Padding left/right tablet'],
			padTab = block.attrs['Inner Padding left/right mobile'];

	padUnit = block.attrs['Inner Padding unit'];
	padT = block.attrs['Inner Padding top'];
	padL = block.attrs['Inner Padding left'];
	padB = block.attrs['Inner Padding bottom'];
	padR = block.attrs['Inner Padding right'];

	if ( 'px' === padUnit ) {
		padT *= 5;
		padL *= 5;
		padB *= 5;
		padR *= 5;
	}

	padT = padT ? padT + padUnit : 0;
	padL = padL ? padL + padUnit : 0;
	padB = padB ? padB + padUnit : 0;
	padR = padR ? padR + padUnit : 0;

	if ( block.attrs['Layout'] ) {
		cls += ' ' + block.attrs['Layout'];
	}

	if ( block.attrs['Column gap'] ) {
		colCls += ' ' + block.attrs['Column gap'];
	}

	bgHTML = '<div class="cover bg-center absolute absolute--fill" style="{{Background color}}{{Background image}}{{Background image position}}{{Background parallax}}"></div>';
	if ( + block.attrs['Background colors opacity'] < 1 ) {
		bgHTML += '<div class="absolute absolute--fill" style="{{Background color}};background-image:{{Gradient type}}{{Background color}}{{Gradient color}});{{Background colors opacity}}"></div>';
	}

	return el(
		// Element
		'div', {className: cls, key: 'caxton-grid-block'},
		// Background div
		el( 'div', {
			key                    : 'bg',
			className              : 'absolute absolute--fill',
			dangerouslySetInnerHTML: block.outputHTML( bgHTML )
		} ),
		// Blocks inserter
		el( 'div', {
				className        : colCls,
				style            : {
					'paddingTop'         : padT,
					'paddingLeft'        : padL,
					'paddingBottom'      : padB,
					'paddingRight'       : padR,
					'gridTemplateColumns': 'repeat(12, 1fr)',
				},
				'data-tablet-css': 'padding-left:' + padTab + 'em;padding-right:' + padTab + 'em;',
				'data-mobile-css': 'padding-left:' + padMob + 'em;padding-right:' + padMob + 'em;',
				key              : 'block',
			},
			childrenBlocks
		)
	);
}

function parseLayout( lyt ) {
	let layout = {
		attr: {},
		tpl : [],
	};

	if ( ! lyt.tpl || ! lyt.tpl.length ) {
		return;
	}

	for ( let i = 0; i < lyt.tpl.length; i ++ ) {
		var
			secProps = lyt.tpl[i],
			children = [];

		if ( typeof secProps === 'object' && secProps.length === 2 ) {
			children = secProps[1];
			secProps = secProps[0];
		}

		if ( typeof secProps === 'object' ) {
			// Object found: Add as block with attrs secProps
			layout.tpl.push( [ 'caxton/section', secProps ] );
		} else if ( typeof secProps === 'string' ) {

			if ( /[0-9]{1,2},[0-9]{1,2}/.test( secProps ) ) {
				// secProps is of the form 2,5
				secProps = 'span ' + secProps.split( ',' ).join( '/span ' );
			}
			// String found: Add as block with `Grid area` attribute
			layout.tpl.push( [
				'caxton/section',
				{ 'Grid area': secProps, }
			] );
		}
	}
	if ( typeof lyt.attr === 'object' ) {
		layout.attr = lyt.attr;
	}

	return layout;
}

function layoutElement( lyt, id ) {
	id = id ? id : 0;
	const el = wp.element.createElement;
	let sections = [];

	for ( let i = 0; i < lyt.tpl.length; i ++ ) {
		let section = lyt.tpl[i];
		sections.push(
			el( 'div', {
				className: 'caxton-layout-preview-section',
				key      : 'layout-section-' + i,
				style    : {
					'gridArea': section[1]['Grid area'],
				}
			} )
		);
	}
	return el( 'div', {
		className    : 'caxton-layout-preview',
		key          : 'layout-' + id,
		'data-layout': JSON.stringify( lyt ),
	}, sections );
}

function gridLayoutPicker( props ) {
	var layoutEls = [];
	const el = wp.element.createElement;
	for ( let i = 0; i < layoutsData.length; i ++ ) {
		const lyt = parseLayout( layoutsData[i] );
		layoutEls.push( layoutElement( lyt, i ) );
		if ( lyt.attr ) {
			props.setAttributes( lyt.attr );
		}
	}


	function gridSelectLayout( e ) {
		let lyt = jQuery( e.target ).closest( '.caxton-layout-preview' ).data( 'layout' );
		if ( typeof lyt === 'string' ) {
			lyt = JSON.parse( lyt );
		}
		props.setAttributes( { tpl: JSON.stringify( lyt.tpl ) } );
	}

	return el(
		'div', {
			className: 'caxton-layout-picker',
			key      : 'caxton-layout-picker',
			onClick  : gridSelectLayout
		},
		el( 'h3', {}, 'Please choose a layout...' ),
		el( 'div', {}, layoutEls )
	);
}

export function gridContent( props, block  ) {
	const el = wp.element.createElement;
	if ( props.attributes.tpl && props.attributes.tpl.indexOf( '[' ) === 0 && props.attributes.tpl.indexOf( ']' ) > 0 ) {
		return el(
			wp.editor.InnerBlocks,
			{
				allowedBlocks: [
					'caxton/section',
				],
				template     : JSON.parse( props.attributes.tpl ),
				templateLock : 'insert',
				key          : 'innerblocks'
			}
		);
	} else {
		return gridLayoutPicker( props );
	}
}