
function initCaxton( $, blocks, el, i18n, components ) {
	var
		__ = i18n.__,
		registerBlockType = blocks.registerBlockType;

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
			components.BaseControl,
			props,
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
						return el( components.Button, {
								className: props.value ? 'image-button' : 'button button-large',
								onClick: obj.open,
							},
							! props.value ?
								__( 'Select image' ) :
								[el( 'img', {src: props.value} ), __( 'Click the image to edit or update' )]
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
			components.PanelColor,
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
		return el( components.CheckboxControl, fieldProps );
	};
	CxB.prototype.radioFieldInit = function( field ) {
		var fieldProps = this.fieldProps( field );
		fieldProps.selected = fieldProps.value;
		return el( components.RadioControl, fieldProps );
	};
	CxB.prototype.rangeFieldInit = function( field ) {
		return el(
			components.RangeControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.selectFieldInit = function( field ) {
		return el(
			components.SelectControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.textFieldInit = function( field ) {
		return el(
			components.TextControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.textareaFieldInit = function( field ) {
		return el(
			components.TextareaControl,
			this.fieldProps( field )
		)
	};
	CxB.prototype.toggleFieldInit = function( field ) {
		return el(
			components.ToggleControl,
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

	elementFromHTML = function ( html, props, tag ) {
		if ( ! props ) {
			props = {};
		}
		if ( ! tag ) {
			tag = 'div'
		}

		var _props = jQuery.extend( {
			dangerouslySetInnerHTML: { __html: html },
		}, props );

		return el( tag, _props );
	};

	CxB.prototype.outputHTML = function ( edit ) {
		var html = this.tpl, c2e, tag;

		for ( let f in this.fields ) {
			if ( this.fields.hasOwnProperty( f ) ) {
				var
					fld = this.fields[ f ],
					val = this.attrs[fld.id];
				if ( fld.type === 'editable' ) {
					tag = fld.tag ? fld.tag : 'span';
					if ( edit ) {
						if ( val === fld.default ) {
							val = '<span class="default">' + val + '</span>';
						}
						c2e = __( 'Click to Edit' );
						val =
							'<' + tag + ' contentEditable="true" title="' + c2e + '" ' + 'data-editableproperty="' + fld.id + '">' +
							val + '</' + tag + '>';
					} else {
						if ( val ) {
							val = '<' + tag + '>' + val + '</' + tag + '>';
						}
					}
				}
				html = html.split( '[' + fld.id + ']' ).join( val );
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
			onKeyDown: function ( e ) {
				var $def = $( e.target ).find( '.default' );
				if ($def.length ) $def.remove();
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
		if ( block.icon.indexOf( '<svg' ) > -1 ) {
			var $icon = jQuery( block.icon );
			var props = {};
			$.each($icon[0].attributes, function() {
				if(this.specified) {
					props[this.name] = this.value;
				}
			});
			props.height = 20;
			props.width = 20;
			block.icon = elementFromHTML( $icon.html(), props, 'svg' );
		}
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

initCaxton( jQuery, wp.blocks, wp.element.createElement, window.wp.i18n, wp.components );
