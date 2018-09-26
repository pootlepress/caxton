export const sectionRender = function ( props, block, childrenBlocks ) {
	const el = wp.element.createElement;
	var
		cls    = 'relative', bgHTML, padUnit, padT, padL, padB, padR,
		colCls = 'relative caxton-section-block',
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
		colCls += ' ' + block.attrs['Column gap'];
	}

	bgHTML = '<div class="cover bg-center absolute absolute--fill" style="{{Background color}}{{Background image}}{{Background image position}}{{Background parallax}}"></div>';

	if ( + block.attrs['Background colors opacity'] < 1 ) {
		bgHTML += '<div class="absolute absolute--fill" style="{{Background color}};background-image:{{Gradient type}}{{Background color}}{{Gradient color}});{{Background colors opacity}}"></div>';
	}

	return el(
		// Element
		'div',
		{
			className: cls,
			key      : 'caxton-section-block',
			style    : {
				'gridArea'   : block.attrs['Grid area'],
			}
		},
		[
			// Background div
			el( 'div', {key: 'bg', className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( bgHTML )} ),
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