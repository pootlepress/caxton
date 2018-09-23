import {gridFields, sectionFields} from './fields.es6';
import {gridRender, gridContent} from './grid.es6';
import {sectionRender} from './section.es6';

export const CaxtonLayoutBlocksSetup = ( $, {element, editor} ) => {
	const el = element.createElement;

	CaxtonBlock( {
		id      : 'caxton/grid',
		title   : 'Caxton',
		icon    : 'screenoptions',
		toolbars: {
			Layout: 'BlockWidthToolbar',
		},
		fields  : gridFields,
		attributes: {
			tpl: {
				type: 'string'
			},
		},
		edit    : function ( props, block ) {
			return gridRender( props, block, gridContent( props, block  ) );
		},
		save    : function ( props, block ) {
			return gridRender( props, block, el( editor.InnerBlocks.Content, { key: 'innerblockscontent' } ) );
		}
	} );

	// region Caxton section block
	CaxtonBlock( {
		id          : 'caxton/section',
		title       : 'Caxton section',
		icon        : 'screenoptions',
		parent      : ['caxton/grid'],
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
			attrs['data-caxton-section'] = 'cols:' + props['Columns span'] + '|rows:' + props['Rows span'];
			return attrs;
		}
	} );
	// endregion Caxton section block

};
