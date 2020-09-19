export function tplRender ( props, block, childrenBlocks ) {
	const el = wp.element.createElement;
	var cls    = 'relative ', bgHTML, padUnit, padT, padL, padB, padR,
			colCls = 'relative ' + block.block.id.replace( '/', '-' ),
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

	if ( block.attrs['Full height'] ) {
		colCls += ' ' + block.attrs['Full height'];
	}

	return el(
		// Element
		'div', {className: cls, key: 'caxton-grid-block'},
		// Background div
		el( 'div', {
			key                    : 'bg',
			className              : 'absolute absolute--fill',
			dangerouslySetInnerHTML: block.outputHTML( '{{Background}}' )
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

export function tplContent( props, block, optionsRenderer  ) {
	const el = wp.element.createElement;
	if ( props.attributes.tpl && props.attributes.tpl.indexOf( '[' ) === 0 && props.attributes.tpl.indexOf( ']' ) > 0 ) {

		let
			tpl = JSON.parse( props.attributes.tpl );

		return el(
			caxtonWPEditor.InnerBlocks,
			{
				template     : tpl,
				templateLock : false,
				key          : 'innerblocks',
				renderAppender: () => el( caxtonWPEditor.InnerBlocks.ButtonBlockAppender ),
			}
		);
	} else {
		return optionsRenderer( props, block );
	}
}
