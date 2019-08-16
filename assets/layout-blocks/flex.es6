export const flexRender = function ( props, block, childrenBlocks ) {
	const el = wp.element.createElement;
	var
		cls    = 'relative', bgHTML, padUnit, padT, padL, padB, padR,
		colCls = 'relative caxton-flex-block',
		padMob = block.attrs['Inner Padding left/right tablet'],
		padTab = block.attrs['Inner Padding left/right mobile'];

	if ( block.name === 'caxon/horizontal' ) {
		colCls = 'relative caxton-listing-block';
	}

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

	if ( block.attrs['Column gap'] ) {
		colCls += ' ' + block.attrs['Column gap'];
	}

	var elProps = {
		className: cls,
		key      : 'caxton-section-block',
		style    : {
			'justify-content': block.attrs['Alignment'],
			'min-height': block.attrs['Minimum content height'],
			'align-items'    : block.attrs['Alignment'],
		},
	};

	if ( block.attrs['Content height unit'] === 'px' ) {
		elProps.style['min-height'] = ( elProps.style['min-height'] * 10 ) + 'px';
	} else {
		elProps.style['min-height'] = elProps.style['min-height'] + block.attrs['Content height unit'];
	}

	if ( block.attrs['Content direction'] ) {
		elProps.style['flex-direction'] = block.attrs['Content direction'];
	}

	if ( block.attrs['Content justify'] ) {
		elProps.style['justify-content'] = block.attrs['Content justify'];
	}

	if ( block.attrs['Mobile Alignment'] ) {
		elProps['data-mobile-css'] = 'justify-content:' + block.attrs['Mobile Alignment'] + ';';
		elProps['data-desktop-css'] = 'justify-content:' + block.attrs['Content justify'] + ';';
	}

	if ( block.attrs['Tablet Alignment'] ) {
		elProps['data-tablet-css'] = 'justify-content:' + block.attrs['Tablet Alignment'] + ';';
		elProps['data-desktop-css'] = 'justify-content:' + block.attrs['Content justify'] + ';';
	}

	return el(
		'div', elProps,
		[
			// Background div
			el( 'div', { key: 'bg', className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( '{{Background}}' ) } ),
			// Blocks inserter
			el( 'div', {
					className        : colCls,
					style            : {
						'paddingTop'   : padT,
						'paddingLeft'  : padL,
						'paddingBottom': padB,
						'paddingRight' : padR,
					},
					'data-mobile-css': 'padding-left:' + padMob + 'em;padding-right:' + padMob + 'em;',
					'data-tablet-css': 'padding-left:' + padTab + 'em;padding-right:' + padTab + 'em;',
					key              : 'block',
				},
				childrenBlocks
			)
		]
	);
};