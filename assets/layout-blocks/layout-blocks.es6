import {gridFields, sectionFields, listingFields, tplFields} from './fields.es6';
import {gridRender, gridContent, responsiveLayoutPicker} from './grid.es6';
import {sectionRender} from './section.es6';
import {listingRender} from './listing.es6';
import {tplRender, tplContent} from './tpl.es6';

export const CaxtonLayoutBlocksSetup = ( $, {element} ) => {
	let editor = caxtonWPEditor;
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
			return gridRender( props, block, el( editor.InnerBlocks.Content, {key: 'innerblockscontent'} ) );
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
				caxtonWPEditor.InnerBlocks,
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
				[el( editor.InnerBlocks.Content, {key: 'innerblockscontent'} )]
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
		title       : 'Horizontal blocks (beta)',
		icon        : 'text',
		category    : 'caxton',
		fields      : listingFields,
		edit        : function ( props, block ) {
			return listingRender(
				props, block,
				[el( editor.InnerBlocks, {key: 'innerblocks', templateLock: false,} )]
			);
		},
		save        : function ( props, block ) {
			return listingRender(
				props, block,
				[el( editor.InnerBlocks.Content, {key: 'innerblockscontent'} )]
			);
		},
	} );
	// endregion Horizontal listings block

	// region template block
	window.CaxtonLayoutOptionsBlock = ( blockArgs, options ) => {
		if ( ! blockArgs.id || ! blockArgs.title ) {
			console.error( 'Function CaxtonLayoutOptionsBlock requires `id` and `title` properties on first parameter object.' );
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
			fields    : tplFields,
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
						el( 'h4', {key: 'heading'}, 'Select an layout' ),
						el( 'div', {key: 'options', className: 'caxton-layout-options'}, optEls ),
					] );
				},
			edit      : function ( props, block ) {
				return tplRender( props, block, tplContent( props, block, blockProps.optionsRenderer ) );
			},
			save      : function ( props, block ) {
				return tplRender( props, block, el( editor.InnerBlocks.Content, {key: 'innerblockscontent'} ) );
			},
		};

		for ( let prop in blockArgs ) {
			blockProps[ prop ] = blockArgs[ prop ];
		}

		CaxtonBlock( blockProps );
	};
	// endregion template block
};
