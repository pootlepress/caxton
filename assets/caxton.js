
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

		this.tpl = block.tpl;
		this.fields = this.processFields( block.fields );
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
				field.default = field.default ? field.default : '';
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
			id = field.id,
			that = this,
			fieldProps = $.extend( {
				value: that.attrs[ id ],
				onChange: function ( val ) {
					var attrs = {};
					attrs[ id ] = val;
					if ( field.type === 'checkbox' && val ) {
						attrs[ id ] = field.value;
					}
					that.props.setAttributes( attrs );
				},
			}, field );

		delete fieldProps.id;
		delete fieldProps.type;
		return fieldProps;
	};

	CxB.prototype.imageFieldInit = function( field ) {
		var props = this.fieldProps( field );
		return el(
			wp.components.BaseControl,
			{},
			el(
				blocks.MediaUpload,
				{
					onSelect: function ( media ) {
						props.onChange( media.url );
					},
					type: 'image',
					value: props.value,
					label: props.label,
					render: function ( obj ) {
						return el( wp.components.Button, {
								className: props.value ? 'image-button' : 'button button-large',
								onClick: obj.open
							},
							! props.value ? props.label : el( 'img', {src: props.value} )
						);
					},
				}
			)
		);
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
		var fieldProps = this.fieldProps( field );
		fieldProps.checked = !! this.attrs[ field.id ];
		console.log( fieldProps );
		return el( wp.components.CheckboxControl, fieldProps );
	};
	CxB.prototype.radioFieldInit = function( field ) {
		var fieldProps = this.fieldProps( field );
		fieldProps.selected = fieldProps.value;
		return el( wp.components.RadioControl, fieldProps );
	};
	CxB.prototype.rangeFieldInit = function( field ) {
		return el(
			wp.components.RangeControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.selectFieldInit = function( field ) {
		return el(
			wp.components.SelectControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.textFieldInit = function( field ) {
		return el(
			wp.components.TextControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.textareaFieldInit = function( field ) {
		return el(
			wp.components.TextareaControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.toggleFieldInit = function( field ) {
		return el(
			wp.components.ToggleControl,
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

	CxB.prototype.outputHTML = function ( edit ) {
		var html = this.tpl;

		for ( let f in this.fields ) {
			if ( this.fields.hasOwnProperty( f ) ) {
				var
					fld = this.fields[ f ],
					val = this.attrs[fld.id];
				if ( edit && fld.type === 'editable' ) {
					val = '<div contentEditable="true" data-editableproperty="' + fld.id + '">' +  val + '</div>';
				}
				html = html.replace( '[' + fld.id + ']', val );
			}
		}

		return { __html: html };
	};
	CxB.prototype.edit = function ( props ) {
		var
			id = 'Unknown',
			that = this;
		if ( this.block ) {
			if ( typeof this.block.edit === 'function' ) {
				return this.block.edit();
			}
			id = this.block.id;
		}
		return el( 'div', {
			dangerouslySetInnerHTML: this.outputHTML( 'edit' ),
			onClick: function ( e ) {
				e.preventDefault();
			},
			onBlur: function ( e ) {
				var
					$t = $( e.target ),
					attrs = {},
					prop = $t.data( 'editableproperty' );
				attrs[ prop ] = $t.html();
				that.props.setAttributes( attrs );
			},
		} );
	};

	CxB.prototype.save = function ( props ) {
		var id = 'Unknown';
		if ( this.block ) {
			if ( typeof this.block.save === 'function' ) {
				return this.block.save();
			}
			id = this.block.id;
		}
		return el( 'div', {dangerouslySetInnerHTML: this.outputHTML()} );
	};

	CxB.prototype.saveBlockProperties = function ( props ) {
		this.props = props;
		this.attrs = props.attributes;
		for ( let f in this.fields ) {
			if ( this.fields.hasOwnProperty( f ) ) {
				var fld = this.fields[ f ];
				if ( ! this.attrs[fld.id] ) this.attrs[fld.id] = fld.default
			}
		}
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
				that.saveBlockProperties( props );
				return [
					! ! props.focus && that.inspectorFields(),
					that.edit( props )
				]
			},

			save: function ( props ) {
				that.saveBlockProperties( props );
				return that.save( props )
			},
		} );
	};

	// endregion Register block

	window.CaxtonBlock = function( block ) {
		return new CxB( block );
	};
}

initCaxton( jQuery, wp.blocks, wp.element.createElement, wp.components.withAPIData, window.wp.i18n );
