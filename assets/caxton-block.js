( function ( $, blocks, el, withAPIData, i18n, components ) {
	var
		createBlock = blocks.createBlock,
		InspectorControls = wp.editor.InspectorControls,
		__ = i18n.__;

	CaxtonBlock( {
		id: 'caxton/grid',
		title: 'Caxton',
		icon: 'screenoptions',
		toolbars: {
			Layout: 'BlockWidthToolbar',
		},
		fields: {
			'Columns': {
				type: 'range',
				min: 1,
				max: 8,
				section: 'Layout',
				default: 1,
			},
			'Column gap': {
				type: 'select',
				options: [
					{value: 'grid-gap-none', label: 'None',},
					{value: 'grid-gap-tight', label: 'Tight',},
					{value: '', label: 'Normal',},
					{value: 'grid-gap-wide', label: 'Wide',},
					{value: 'grid-gap-wider', label: 'Wider',},
				],
				section: 'Layout',
			},
			'Inner Padding top': {
				type: 'range',
				section: 'Layout',
				default: 5,
			},
			'Inner Padding left': {
				type: 'range',
				max: 70,
				section: 'Layout',
				default: 5,
			},
			'Inner Padding bottom': {
				type: 'range',
				section: 'Layout',
				default: 5,
			},
			'Inner Padding right': {
				type: 'range',
				max: 70,
				section: 'Layout',
				default: 5,
			},
			'Inner Padding left/right tablet': {
				type: 'range',
				max: 70,
				section: 'Layout',
				default: 5,
			},
			'Inner Padding left/right mobile': {
				type: 'range',
				max: 70,
				section: 'Layout',
				default: 5,
			},
			'Inner Padding unit': {
				type: 'select',
				options: [
					{value: '%', label: 'Responsive',},
					{value: 'px', label: 'Pixels x 5',},
				],
				default: '%',
				section: 'Layout',
			},
			'Background image': {
				type: 'image',
				section: 'Background',
				tpl: 'background-image:url(%s);',
			},
			'Background image position': {
				type: 'position',
				section: 'Background',
				tpl: 'background-position:%s;',
			},
			'Background parallax': {
				type: 'toggle',
				value: 'background-attachment:fixed;',
				section: 'Background',
			},
			'Background color': {
				type: 'color',
				section: 'Background',
			},
			'Gradient color': {
				type: 'color',
				section: 'Background',
				tpl: ', %s',
			},
			'Gradient type': {
				type: 'select',
				options: [
					{value: 'linear-gradient( ', label: 'Linear vertical',},
					{value: 'linear-gradient( 90deg, ', label: 'Linear horizontal',},
					{value: 'linear-gradient( 45deg, ', label: 'Linear 45 deg',},
					{value: 'linear-gradient( -45deg, ', label: 'Linear 45 deg anticlockwise',},
					{value: 'radial-gradient( ', label: 'Radial gradient',},
				],
				default: 'linear-gradient( ',
				section: 'Background',
			},
			'Background colors opacity': {
				type: 'range',
				min: 0,
				max: 1,
				step: .05,
				help: 'Reduce opacity to have transparent colors over image',
				default: '.9',
				section: 'Background',
				tpl: 'opacity:%s;',
			},
		},
		edit: function ( props, block ) {

			var cls = 'relative ', bgHTML, padUnit, padT, padL, padB, padR, columns,
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
					key: 'bg',
					className: 'absolute absolute--fill',
					dangerouslySetInnerHTML: block.outputHTML( bgHTML )
				} ),
				// Blocks inserter
				el( 'div', {
						className: colCls,
						style: {
							'paddingTop': padT,
							'paddingLeft': padL,
							'paddingBottom': padB,
							'paddingRight': padR,
							'gridTemplateColumns': '1fr '.repeat( columns ),
						},
						'data-tablet-css': 'padding-left:' + padTab + 'em;padding-right:' + padTab + 'em;',
						'data-mobile-css': 'padding-left:' + padMob + 'em;padding-right:' + padMob + 'em;',
						key: 'block',
					},
					el(
						wp.editor.InnerBlocks,
						{
							allowedBlocks: [
								'caxton/section',
								//	'core/paragraph',
							],
							template: [
								['caxton/section', {}],
								['caxton/section', {}],
							],
							key: 'innerblockscontent'
						}
					),
				)
			);
		},
		save: function ( props, block ) {
			var cls = 'relative', bgHTML, padUnit, padT, padL, padB, padR, columns,
				colCls = 'relative caxton-columns',
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

			bgHTML = '<div key="bg-image" class="cover bg-center absolute absolute--fill" style="{{Background image}}{{Background image position}}{{Background parallax}}"></div>' +
							 '<div key="bg-colors" class="absolute absolute--fill" style="background-color: {{Background color}};background-image:{{Gradient type}}{{Background color}}{{Gradient color}});{{Background colors opacity}}"></div>';

			var childrenBlocks = el( wp.editor.InnerBlocks.Content, {} );

			return el(
				// Element
				'div', { className: cls, key: 'caxton-grid-block' },
				[
					// Background div
					el( 'div', { key: 'bg', className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( bgHTML )} ),
					// Blocks inserter
					el( 'div', {
							className: colCls,
							style: {
								'paddingTop': padT,
								'paddingLeft': padL,
								'paddingBottom': padB,
								'paddingRight': padR,
								'gridTemplateColumns': '1fr '.repeat( columns ),
							},
							'data-mobile-css' : 'padding-left:' + padMob + 'em;padding-right:' + padMob + 'em;',
							'data-tablet-css' : 'padding-left:' + padTab + 'em;padding-right:' + padTab + 'em;',
							key: 'block',
						},
						childrenBlocks
					)
				]
			)
		}
	} );

	CaxtonBlock( {
		id: 'caxton/section',
		title: 'Caxton section',
		icon: 'screenoptions',
		parent: [ 'caxton/grid' ],
		fields: {
			'Columns span': {
				type: 'range',
				min: 1,
				max: 12,
				section: 'Layout',
				default: 1,
			},
			'Rows span': {
				type: 'range',
				min: 1,
				max: 12,
				section: 'Layout',
				default: 1,
			},
			'Inner Padding top': {
				type: 'range',
				section: 'Layout',
				default: 5,
			},
			'Inner Padding left': {
				type: 'range',
				max: 70,
				section: 'Layout',
				default: 5,
			},
			'Inner Padding bottom': {
				type: 'range',
				section: 'Layout',
				default: 5,
			},
			'Inner Padding right': {
				type: 'range',
				max: 70,
				section: 'Layout',
				default: 5,
			},
			'Inner Padding left/right tablet': {
				type: 'range',
				max: 70,
				section: 'Layout',
				default: 5,
			},
			'Inner Padding left/right mobile': {
				type: 'range',
				max: 70,
				section: 'Layout',
				default: 5,
			},
			'Inner Padding unit': {
				type: 'select',
				options: [
					{value: '%', label: 'Responsive',},
					{value: 'px', label: 'Pixels x 5',},
				],
				default: '%',
				section: 'Layout',
			},
			'Background image': {
				type: 'image',
				section: 'Background',
				tpl: 'background-image:url(%s);',
			},
			'Background image position': {
				type: 'position',
				section: 'Background',
				tpl: 'background-position:%s;',
			},
			'Background parallax': {
				type: 'toggle',
				value: 'background-attachment:fixed;',
				section: 'Background',
			},
			'Background color': {
				type: 'color',
				section: 'Background',
			},
			'Gradient color': {
				type: 'color',
				section: 'Background',
				tpl: ', %s',
			},
			'Gradient type': {
				type: 'select',
				options: [
					{value: 'linear-gradient( ', label: 'Linear vertical',},
					{value: 'linear-gradient( 90deg, ', label: 'Linear horizontal',},
					{value: 'linear-gradient( 45deg, ', label: 'Linear 45 deg',},
					{value: 'linear-gradient( -45deg, ', label: 'Linear 45 deg anticlockwise',},
					{value: 'radial-gradient( ', label: 'Radial gradient',},
				],
				default: 'linear-gradient( ',
				section: 'Background',
			},
			'Background colors opacity': {
				type: 'range',
				min: 0,
				max: 1,
				step: .05,
				help: 'Reduce opacity to have transparent colors over image',
				default: '.9',
				section: 'Background',
				tpl: 'opacity:%s;',
			},
		},
		edit: function ( props, block ) {

			var cls = 'relative ', bgHTML, padUnit, padT, padL, padB, padR, columns,
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
				'div',
				{
					className: cls, key: 'caxton-section-block',
					style: {
						'gridColumns': props['Columns span'],
						'gridRows': props['Rows span'],
					},
				},
				// Background div
				el( 'div', {key: 'bg', className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( bgHTML )} ),
				// Blocks inserter
				el( 'div', {
						className: colCls,
						style: {
							'paddingTop': padT,
							'paddingLeft': padL,
							'paddingBottom': padB,
							'paddingRight': padR,
						},
						'data-tablet-css' : 'padding-left:' + padTab + 'em;padding-right:' + padTab + 'em;',
						'data-mobile-css' : 'padding-left:' + padMob + 'em;padding-right:' + padMob + 'em;',
						key: 'block',
					},
					el( wp.editor.InnerBlocks, {key: 'innerblockscontent' } ),
					el( wp.editor.Inserter, {key: 'insertBlocks'} )
				)
			);
		},
		save: function ( props, block ) {
			var cls = 'relative', bgHTML, padUnit, padT, padL, padB, padR, columns,
				colCls = 'relative',
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

			bgHTML = '<div key="bg-image" class="cover bg-center absolute absolute--fill" style="{{Background image}}{{Background image position}}{{Background parallax}}"></div>' +
							 '<div key="bg-colors" class="absolute absolute--fill" style="background-color: {{Background color}};background-image:{{Gradient type}}{{Background color}}{{Gradient color}});{{Background colors opacity}}"></div>';

			var childrenBlocks = el( wp.editor.InnerBlocks.Content, {} );

			return el(
				// Element
				'div', {
					className: cls,
					key: 'caxton-section-block',
					style: {
						'gridColumns': props['Columns span'],
						'gridRows': props['Rows span'],
					}
				},
				[
					// Background div
					el( 'div', { key: 'bg', className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( bgHTML )} ),
					// Blocks inserter
					el( 'div', {
							className: colCls,
							style: {
								'paddingTop': padT,
								'paddingLeft': padL,
								'paddingBottom': padB,
								'paddingRight': padR,
								'gridColumns': props['Columns span'],
								'gridRows': props['Rows span'],
							},
							'data-mobile-css' : 'padding-left:' + padMob + 'em;padding-right:' + padMob + 'em;',
							'data-tablet-css' : 'padding-left:' + padTab + 'em;padding-right:' + padTab + 'em;',
							key: 'block',
						},
						childrenBlocks
					)
				]
			)
		},
		wrapperProps: function ( attrs, props ) {
			attrs['data-caxton-section'] = 'cols:' + props['Columns span'] + '|rows:' + props['Rows span'];
			return attrs;
		}
	} );

} )( jQuery, wp.blocks, wp.element.createElement, wp.components.withAPIData, window.wp.i18n, wp.components );