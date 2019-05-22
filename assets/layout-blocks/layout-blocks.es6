import {gridFields, sectionFields, listingFields, tplFields} from './fields.es6';
import {gridRender, gridContent, responsiveLayoutPicker} from './grid.es6';
import {sectionRender} from './section.es6';
import {listingRender} from './listing.es6';
import {tplRender, tplContent} from './tpl.es6';

export const CaxtonLayoutBlocksSetup = ( $, {element, editor} ) => {
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
		fields      : sectionFields,
		edit        : function ( props, block ) {
			return sectionRender(
				props, block,
				[el( editor.InnerBlocks, {key: 'innerblocks', templateLock: false,} )]
			);
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

	// region Caxton inline listings block
	CaxtonBlock( {
		id          : 'caxton/listing',
		title       : 'Caxton listing',
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
	// endregion Listings block

	// region template block
	window.caxtonTemplateBlock = ( blockProps, optionsRenderer ) => {
		if ( ! blockProps.id || ! blockProps.title ) {
			console.error( 'Function caxtonTemplateBlock requires `id` and `title` properties on first parameter object.' );
		}
		let defaultBlockProps = {
			icon      : 'screenoptions',
			category  : 'caxton',
			fields    : tplFields,
			attributes: {tpl: {type: 'string'},},
			edit      : function ( props, block ) {
				return tplRender( props, block, tplContent( props, block, optionsRenderer ) );
			},
			save      : function ( props, block ) {
				return tplRender( props, block, el( editor.InnerBlocks.Content, {key: 'innerblockscontent'} ) );
			},
		};

		for ( let prop in blockProps ) {
			defaultBlockProps[ prop ] = blockProps[ prop ];
		}

		CaxtonBlock( defaultBlockProps, optionsRenderer );
	};
	// endregion template block
};
