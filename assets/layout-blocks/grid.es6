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
					'gridTemplateColumns': 'repeat( ' + columns + ', 1fr )',
				},
				'data-tablet-css': 'padding-left:' + padTab + 'em;padding-right:' + padTab + 'em;',
				'data-mobile-css': 'padding-left:' + padMob + 'em;padding-right:' + padMob + 'em;',
				key              : 'block',
			},
			childrenBlocks
		)
	);
}

function gridLayoutPicker( props ) {
	return 'Render layout picker here.'
}

export function gridContent( props, block  ) {
	if ( props.attributes.tpl && props.attributes.tpl.indexOf( '[' ) === 0 && props.attributes.tpl.indexOf( ']' ) > 0 ) {
		return el(
			editor.InnerBlocks,
			{
				allowedBlocks: [
					'caxton/section',
					//	'core/paragraph',
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