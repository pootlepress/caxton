import {gridFields, sectionFields} from './fields.es6';
import {gridRender, gridContent} from './grid.es6';
import {sectionRender} from './section.es6';

export const CaxtonLayoutBlocksSetup = ( $, {element, editor} ) => {
	const el = element.createElement;

	CaxtonBlock( {
		id        : 'caxton/grid',
		title     : 'Caxton Layouts',
		icon      : 'screenoptions',
		category  : 'caxton',
		toolbars  : {
			Layout: 'BlockWidthToolbar',
		},
		fields    : gridFields,
		attributes: {
			tpl: {
				type: 'string'
			},
		},
		edit      : function ( props, block ) {
			return gridRender( props, block, gridContent( props, block ) );
		},
		save      : function ( props, block ) {
			return gridRender( props, block, el( editor.InnerBlocks.Content, {key: 'innerblockscontent'} ) );
		}
	} );

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

};
