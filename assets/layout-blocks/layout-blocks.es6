import {gridFields, sectionFields} from './fields.es6';
import {gridRender} from './grid.es6';
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
		edit    : function ( props, block ) {
			console.log( props );
			return gridRender(
				props, block,
				el(
					editor.InnerBlocks,
					{
						allowedBlocks: [
							'caxton/section',
							//	'core/paragraph',
						],
						template     : [
							['caxton/section', {}],
							['caxton/section', {}],
						],
//							templateLock : 'insert',
						key          : 'innerblocks'
					}
				)
			);
		},
		save    : function ( props, block ) {
			return gridRender(
				props, block,
				el( editor.InnerBlocks.Content, { key: 'innerblockscontent' }
				)
			);
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
			console.log( editor.InnerBlocks );

			return sectionRender(
				props, block,
				[el( editor.InnerBlocks, {key: 'innerblocks'} )]
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
