export const sectionRender = function ( props, block, childrenBlocks ) {
	const el = wp.element.createElement;
	var
		cls    = 'relative', bgHTML, padUnit, padT, padL, padB, padR,
		childWrapCls = 'relative caxton-section-block',
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

	if ( block.attrs['Column gap'] ) {
		childWrapCls += ' ' + block.attrs['Column gap'];
	}

	var elProps = {
		className        : cls,
		key              : 'caxton-section-block',
		style            : {
			'gridArea': block.attrs['Grid area'],
		},
	};
	const childWrapProps = {
		className        : childWrapCls,
		style            : {
			'paddingTop'   : padT,
			'paddingLeft'  : padL,
			'paddingBottom': padB,
			'paddingRight' : padR,
		},
		'data-mobile-css': 'padding-left:' + padMob + 'em;padding-right:' + padMob + 'em;',
		'data-tablet-css': 'padding-left:' + padTab + 'em;padding-right:' + padTab + 'em;',
		key              : 'block',
	};

	if ( block.attrs['Mobile grid area'] ) {
		elProps['data-mobile-css'] = 'grid-area:' + block.attrs['Mobile grid area'] + ';';
		elProps['data-desktop-css'] = 'grid-area:' + block.attrs['Grid area'] + ';';
	}
	if ( block.attrs['Tablet grid area'] ) {
		elProps['data-tablet-css'] = 'grid-area:' + block.attrs['Tablet grid area'] + ';';
		elProps['data-desktop-css'] = 'grid-area:' + block.attrs['Grid area'] + ';';
	}

	if ( block.attrs['Vertical Alignment'] ) {
		childWrapProps.style['justify-content'] = block.attrs['Vertical Alignment'];
	}

	return el(
		'div', elProps,
		[
			// Background div
			el( 'div', { key: 'bg', className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( '{{Background}}' ) } ),
			// Blocks inserter
			el( 'div', childWrapProps,
				childrenBlocks
			)
		]
	);
};