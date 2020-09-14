import {gridFields, sectionFields, flexFields, tplFields} from './fields.es6';
import {gridRender, gridContent, responsiveLayoutPicker} from './grid.es6';
import {sectionRender} from './section.es6';
import {flexRender} from './flex.es6';
import {tplRender, tplContent} from './tpl.es6';

export const CaxtonLayoutBlocksSetup = ( $, {element} ) => {
	const {InnerBlocks} = caxtonWPEditor;
	const el = element.createElement;

	gridFields['Mobile layout'].render = responsiveLayoutPicker;
	gridFields['Tablet layout'].render = responsiveLayoutPicker;

	// region grid block
	CaxtonBlock( {
		id        : 'caxton/grid',
		title     : 'Caxton Layouts',
		icon      : 'screenoptions',
		category  : 'caxton',
		fields    : gridFields,
		attributes: { tpl: { type: 'string' }, },
		edit      : function ( props, block ) {
			return gridRender( props, block, gridContent( props, block ) );
		},
		save      : function ( props, block ) {
			return gridRender( props, block, el( InnerBlocks.Content, {key: 'innerblockscontent'} ) );
		}
	} );
	// endregion grid block

	// region Caxton section block
	CaxtonBlock( {
		id          : 'caxton/section',
		title       : 'Caxton section',
		icon        : 'screenoptions',
		parent      : ['caxton/grid'],
		category    : 'caxton',
		attributes: { tpl: { type: 'string' }, },
		fields      : sectionFields,
		edit        : function ( props, block ) {
			let tpl = [];
			if ( props.attributes.tpl && props.attributes.tpl.indexOf( '[' ) === 0 && props.attributes.tpl.indexOf( ']' ) > 0 ) {
				tpl = JSON.parse( props.attributes.tpl );
			}
			const content = el(
				InnerBlocks,
				{
					template     : tpl,
					templateLock : false,
					key          : 'innerblocks'
				}
			);
			return sectionRender( props, block, content );
		},
		save        : function ( props, block ) {
			return sectionRender(
				props, block,
				[el( InnerBlocks.Content, {key: 'innerblockscontent'} )]
			);
		},
		wrapperProps: function ( attrs, props ) {
			attrs['data-caxton-section'] = props['Grid area'];
			attrs.style = {};
			attrs.style.gridArea = props['Grid area'];

			function styleContent() {
				var els = document.querySelectorAll( '[data-caxtonsection]:not([data-caxtonsectiondone])' );
				for ( var i = 0; i < els.length; i ++ ) {
					els[i].style.gridArea = els[i].dataset.caxtonSection;
					els[i].setAttribute( 'data-caxtonsectiondone', '1' );
				}
			}

			return attrs;
		}
	} );
	// endregion Caxton section block

	// region Horizontal listings block
	CaxtonBlock( {
		id          : 'caxton/horizontal',
		title       : 'Horizontal blocks (deprecated)',
		icon        : 'text',
		category    : 'caxton',
		fields      : flexFields,
		edit        : function ( props, block ) {
			return flexRender(
				props, block,
				[el( InnerBlocks, {key: 'innerblocks', templateLock: false,} )]
			);
		},
		save        : function ( props, block ) {
			return flexRender(
				props, block,
				[el( InnerBlocks.Content, {key: 'innerblockscontent'} )]
			);
		},
	} );
	// endregion Horizontal listings block

	// region Flex block
	CaxtonBlock( {
		id          : 'caxton/flex',
		title       : 'Flex blocks (beta)',
		icon        : 'text',
		category    : 'caxton',
		fields      : flexFields,
		edit        : function ( props, block ) {
			return flexRender(
				props, block,
				[el( InnerBlocks, {
					key: 'innerblocks',
					templateLock: false,
					renderAppender: () => el( InnerBlocks.ButtonBlockAppender )
				} )]
			);
		},
		save        : function ( props, block ) {
			return flexRender(
				props, block,
				[el( InnerBlocks.Content, {key: 'innerblockscontent'} )]
			);
		},
		transforms: {
			from: [
				{
					type: 'caxton/horizontal',
				},
			]
		}
	} );
	// endregion Flex block

	// region Template block
	window.CaxtonLayoutOptionsBlock = ( blockArgs, options ) => {
		if ( ! blockArgs.id || ! blockArgs.title ) {
			console.error( 'Function CaxtonLayoutOptionsBlock requires `id` and `title` properties on first parameter object.' );
		}

		if ( typeof blockArgs.fields !== 'function' ) {
			blockArgs.fields = fields => fields;
		}

		if ( blockArgs.debug ) {
			tplFields.tpl = {
				type   : 'textarea',
				section: 'Layout',
			};
		}



		let blockProps = {
			icon      : 'screenoptions',
			category  : 'caxton',
			fields    : blockArgs.fields( tplFields, blockArgs ), // Call the fields function
			attributes: {tpl: {type: 'string'},},
			chooseLayoutTitle: 'Please choose a layout',
			optionsRenderer: ( props, block ) => {
				var applyProps = function ( e ) {
					let newProps = jQuery( e.target ).closest( '.caxton-layout-option' ).data( 'props' );
					if ( typeof newProps === 'string' ) {
						newProps = JSON.parse( newProps );
					}
					if ( typeof newProps.tpl === 'object' ) {
						newProps.tpl = JSON.stringify( newProps.tpl );
					}
					props.setAttributes( newProps );
				};

				var optEls = [];

				for ( var i = 0; i < options.length; i ++ ) {
					var opt = options[i];
					optEls.push(
						el(
							'div',
							{
								className   : 'caxton-layout-option',
								key         : 'option-' + i,
								"data-props": JSON.stringify( opt.props ),
								onClick     : applyProps
							},
							el( 'img', {src: opt.img} ),
							el( 'h5', {}, opt.title ),
						)
					);
				}

				return el( 'div', {}, [
					el( 'h4', {key: 'heading'}, blockProps.chooseLayoutTitle ),
					el( 'div', {key: 'options', className: 'caxton-layout-options'}, optEls ),
				] );
			},
			render: ( props, block, childrenBlocks ) => tplRender( props, block, childrenBlocks ),
			edit      : function ( props, block ) {
				return blockProps.render( props, block, tplContent( props, block, blockProps.optionsRenderer ) );
			},
			save      : function ( props, block ) {
				return blockProps.render( props, block, el( InnerBlocks.Content, {key: 'innerblockscontent'} ) );
			},
		};

		delete blockArgs.fields;

		for ( let prop in blockArgs ) {
			if ( blockArgs.hasOwnProperty( prop ) ) {
				blockProps[ prop ] = blockArgs[ prop ];
			}
		}

		CaxtonBlock( blockProps );
	};
	// endregion Template block
};
