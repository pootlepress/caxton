export const flexRender = function ( props, block, childrenBlocks ) {
	const el = wp.element.createElement;
	var
		cls    = 'relative', bgHTML, padUnit, padT, padL, padB, padR,
		blkProps = {
			className: 'relative caxton-flex-block',
			'data-mobile-css': '',
			'data-tablet-css': '',
			key              : 'block',
		},
		padMob = block.attrs['Inner Padding left/right tablet'],
		padTab = block.attrs['Inner Padding left/right mobile'];

	if ( block.name === 'caxon/horizontal' ) {
		blkProps.className = 'relative caxton-listing-block';
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

	blkProps.style = {
		paddingTop    : padT,
		paddingLeft   : padL,
		paddingBottom : padB,
		paddingRight  : padR,
		justifyContent: block.attrs['Alignment'],
		minHeight     : block.attrs['Minimum content height'],
		alignItems    : block.attrs['Alignment'],
	};

	blkProps['data-desktop-css'] = 'padding-left:' + padL + 'em;padding-right:' + padR + 'em;';
	blkProps['data-mobile-css'] = 'padding-left:' + padMob + 'em;padding-right:' + padMob + 'em;';
	blkProps['data-tablet-css'] = 'padding-left:' + padTab + 'em;padding-right:' + padTab + 'em;';

	if ( block.attrs['Column gap'] ) {
		blkProps.className += ' ' + block.attrs['Column gap'];
	}

	if ( block.attrs['Content height unit'] === 'px' ) {
		blkProps.style.minHeight = parseInt( blkProps.style.minHeight ) * 10 + 'px';
	} else {
		blkProps.style.minHeight = parseInt( blkProps.style.minHeight ) + block.attrs['Content height unit'];
	}

	if ( block.attrs['Content direction'] ) {
		blkProps.style['flex-direction'] = block.attrs['Content direction'];
	}

	if ( block.attrs['Items margin'] ) {
		blkProps.style['--caxton-gap'] = block.attrs['Items margin'] + 'px';
	}

	if ( block.attrs['Content justify'] ) {
		blkProps.style['justify-content'] = block.attrs['Content justify'];
	}

	if ( block.attrs['Mobile Alignment'] ) {
		blkProps['data-mobile-css'] += 'justify-content:' + block.attrs['Mobile Alignment'] + ';';
		blkProps['data-desktop-css'] += 'justify-content:' + block.attrs['Content justify'] + ';';
	}

	if ( block.attrs['Tablet Alignment'] ) {
		blkProps['data-tablet-css'] += 'justify-content:' + block.attrs['Tablet Alignment'] + ';';
		blkProps['data-desktop-css'] += 'justify-content:' + block.attrs['Content justify'] + ';';
	}

	return el(
		'div', {
			className: cls,
			key      : 'caxton-flex-block-wrap',
		},
		[
			// Background div
			el( 'div', { key: 'bg', className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( '{{Background}}' ) } ),
			// Blocks inserter
			el( 'div', blkProps,
				childrenBlocks
			)
		]
	);
};