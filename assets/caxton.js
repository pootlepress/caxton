
function initCaxton( $, blocks, el, i18n ) {
	var registerBlockType = blocks.registerBlockType;

	function CxB( block ) {
		if ( ! block.id ) {
			console.log( 'Parameter `id` is required for CaxtonBlock' )
		}
		this.block = $.extend( {
			title: block.id,
			icon: 'star-filled',
			category: 'layout',
			fields: {},
			attributes: {},
		}, block );

		this.fields = this.processFields( this.block.fields );
		this.registerBlock();
	};

	CxB.prototype.processFields = function( fields ) {
		var ret = [];

		for ( var id in fields ) {
			if( fields.hasOwnProperty( id ) ) {
				var
					type = fields[id],
					field = {};
				if ( typeof type === 'object' ) {
					field = type;
				} else {
					field.type = type;
				}
				field.id = id;
				field.label = field.label ? field.label : id;
				this.block.attributes[ id ] = field.attr ? field.attr : {
					type: 'string',
				};
				ret.push( field );
			}
		}
		return ret;
	};

	// region Inspector Fields

	CxB.prototype.fieldProps = function( field ) {
		var
			attrs = this.attrs,
			id = field.id,
			that = this,
			fieldProps = $.extend( {
				value: attrs[ id ],
				onChange: function ( val ) {
					var attrs = {};
					attrs[ id ] = val;
					that.props.setAttributes( attrs );
				},
			}, field );

		delete fieldProps.id;
		delete fieldProps.type;

		console.log( fieldProps );

		return fieldProps;
	};

	CxB.prototype.editableInit = function( field ) {
		return el(
			blocks.Editable,
			this.fieldProps( field )
		)
	};
	CxB.prototype.imageFieldInit = function( field ) {
		return el(
			blocks.MediaUpload,
			this.fieldProps( field )
		)
	};
	CxB.prototype.colorFieldInit = function( field ) {
		var props = this.fieldProps( field );
		props.title = props.label;
		return el(
			wp.components.PanelColor,
			props,
			el(
				wp.blocks.ColorPalette,
				props,
			)
		)
	};
	CxB.prototype.checkboxFieldInit = function( field ) {
		return el(
			blocks.InspectorControls.CheckboxControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.radioFieldInit = function( field ) {
		return el(
			blocks.InspectorControls.RadioControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.rangeFieldInit = function( field ) {
		return el(
			blocks.InspectorControls.RangeControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.selectFieldInit = function( field ) {
		return el(
			blocks.InspectorControls.SelectControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.textFieldInit = function( field ) {
		return el(
			blocks.InspectorControls.TextControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.textareaFieldInit = function( field ) {
		return el(
			blocks.InspectorControls.TextareaControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.toggleFieldInit = function( field ) {
		return el(
			blocks.InspectorControls.ToggleControl,
			this.fieldProps( field )
		)
	};

	// endregion

	CxB.prototype.inspectorFields = function () {
		var
			fields = this.fields,
			els = [];
		for ( var i = 0; i < fields.length; i ++ ) {
			var
				f = fields[i],
				func = f['type'] + 'FieldInit';
			if ( typeof this[ func ] === 'function' ) {
				els.push( this[func]( f ) );
			}
		}
		if ( els ) {
			return el(
				blocks.InspectorControls,
				{ key: 'inspector' },
				els
			);
		}
	};

	// region Register block

	CxB.prototype.edit = function ( props ) {
		var id = 'Unknown';
		if ( this.block ) {
			if ( typeof this.block.edit === 'function' ) {
				return this.block.edit();
			}
			id = this.block.id;
		}
		return el( 'div', {}, 'Editing block: ' + id + '.' );
	};

	CxB.prototype.save = function ( props ) {
		var id = 'Unknown';
		if ( this.block ) {
			if ( typeof this.block.save === 'function' ) {
				return this.block.save();
			}
			id = this.block.id;
		}
		return el( 'div', {}, 'Saved block: ' + id + '.' );
	};

	CxB.prototype.registerBlock = function () {
		var
			that = this,
			block = this.block;
		blocks.registerBlockType( 'caxton/' + block.id, {
			title: block.title,
			icon: block.icon,
			category: block.category,
			attributes: block.attributes,

			edit: function ( props ) {
				that.props = props;
				that.attrs = props.attributes;
				return [
					! ! props.focus && that.inspectorFields(),
					that.edit( props )
				]
			},

			save: that.save,
		} );
	};

	// endregion Register block

	window.CaxtonBlock = CxB;
}

initCaxton( jQuery, wp.blocks, wp.element.createElement, wp.components.withAPIData, window.wp.i18n );
