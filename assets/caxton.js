
function initCaxton( $, blocks, el, withAPIData, i18n ) {
	var
		registerBlockType = blocks.registerBlockType;

	function CaxtonBlock( block ) {

		this.block = block;

		var fields = block.fields;

		delete block.fields;

		for ( var f in fields ) {

		}
	}

	CaxtonBlock.prototype.fields = {
		'editable' : blocks.Editable,
//		'base'     : blocks.InspectorControls.BaseControl,
		'checkbox' : blocks.InspectorControls.CheckboxControl,
		'radio'    : blocks.InspectorControls.RadioControl,
		'range'    : blocks.InspectorControls.RangeControl,
		'select'   : blocks.InspectorControls.SelectControl,
		'text'     : blocks.InspectorControls.TextControl,
		'textarea' : blocks.InspectorControls.TextareaControl,
		'toggle'   : blocks.InspectorControls.ToggleControl,
	};

	CaxtonBlock.prototype.registerBlock = function() {

		blocks.registerBlockType( 'caxton/' + this.block.id, {
			title: __( block.title, 'caxton' ),
			icon: 'universal-access-alt',
			category: 'layout',

			attributes: {
				content: {
					type: 'array',
					source: 'children',
					selector: 'p',
				},
			},

			edit: function ( props ) {
				var content = props.attributes.content;
				var focus = props.focus;

				function onChangeContent( newContent ) {
					props.setAttributes( {content: newContent} );
				}

				return el(
					Editable,
					{
						tagName: 'p',
						className: props.className,
						onChange: onChangeContent,
						value: content,
						focus: focus,
						onFocus: props.setFocus
					}
				);
			},

			save: function ( props ) {
				return el( 'p', {}, props.attributes.content );
			},
		} );
	}
}

initCaxton( jQuery, wp.blocks, wp.element.createElement, wp.components.withAPIData, window.wp.i18n );
