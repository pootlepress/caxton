import layoutsData from './layouts.json';

export function gridRender ( props, block, childrenBlocks ) {
	const el = wp.element.createElement;
	var cls    = 'relative ', bgHTML, padUnit, padT, padL, padB, padR, columns,
			colCls = 'relative caxton-columns caxton-grid-block',
			padMob = block.attrs['Inner Padding left/right tablet'],
			padTab = block.attrs['Inner Padding left/right mobile'];

	padUnit = block.attrs['Inner Padding unit'];
	padT = block.attrs['Inner Padding top'];
	padL = block.attrs['Inner Padding left'];
	padB = block.attrs['Inner Padding bottom'];
	padR = block.attrs['Inner Padding right'];
	columns = block.attrs['Columns'];

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

	bgHTML = '<div class="cover bg-center absolute absolute--fill" style="{{Background image}}{{Background image position}}{{Background parallax}}"></div>' +
					 '<div class="absolute absolute--fill" style="background-color: {{Background color}};background-image:{{Gradient type}}{{Background color}}{{Gradient color}});{{Background colors opacity}}"></div>';


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
//					'gridTemplateColumns': 'repeat(' + columns + ', 1fr )',
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
		const tpl = lyt.tpl[i];
		if ( typeof tpl[0] === 'object' ) {
			tpl.splice( 0, 0, 'caxton/section' );
			layout.tpl.push( tpl );
		} else if ( ! isNaN( tpl[0] + tpl[1] ) ) {
			layout.tpl.push( [
				'caxton/section',
				{
					'Columns span': tpl[0],
					'Rows span'   : tpl[1],
				}
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
	let
		tpl,
		sections = [];

	for ( let i = 0; i < lyt.tpl.length; i ++ ) {
		tpl = lyt.tpl[i];
		sections.push(
			el( 'div', {
				className: 'caxton-layout-preview-section',
				key      : 'layout-section-' + i,
				style    : {
					'gridColumn': 'span ' + tpl[1]['Columns span'],
					'gridRow'   : 'span ' + tpl[1]['Rows span'],
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