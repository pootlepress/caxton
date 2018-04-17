
function initCaxton( $, blocks, el, i18n, components ) {
	var
		__ = i18n.__,
		registerBlockType = blocks.registerBlockType;

	function CxB( block ) {
		if ( ! block.id ) {
			console.error( 'Parameter `id` is required for CaxtonBlock' )
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
		this.sections = this.processSections( this.fields );
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

	CxB.prototype.processSections = function( fields ) {
		var sections = {};

		for ( var i = 0; i < fields.length; i ++ ) {
			var section = fields[i].section;
			if ( section ) {
				if ( ! sections[ section ] ) {
					sections[ section ] = [];
				}
				sections[ section ].push( fields[i] )
			}
		}
		return sections;
	};

	// region Inspector Fields

	CxB.prototype.fieldProps = function( field ) {
		var
			id = field.id,
			that = this,
			fieldProps = $.extend( {}, field );

		fieldProps.value = that.attrs[ id ];
		fieldProps.onChange = function ( val, moreValues ) {
			var attrs = {};
			attrs[ id ] = val;
			if ( field.type === 'checkbox' || field.type === 'toggle' && val ) {
				attrs[ id ] = field.value;
			}
			that.props.setAttributes( attrs );

			if ( typeof field.onChange === 'function' ) {
				field.onChange( val, that, moreValues );
			}
		};

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
						props.onChange( media.url, media );
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
								[
									el( 'img', {src: props.value} ),
									__( 'Click the image to edit or update' ),
								]
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
			[
				el(
					wp.blocks.ColorPalette,
					props,
				),
				field.help ? field.help : ''
			]
		)
	};
	CxB.prototype.checkboxFieldInit = function( field ) {
		var fieldProps = this.fieldProps( field );
		fieldProps.checked = !! this.attrs[ field.id ];
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
	CxB.prototype.fontFieldInit = function( field ) {
		if ( ! field.tpl ) {
			field.tpl = 'font-family: %s;';
		}
		var props = this.fieldProps( field );
		props.options = caxton.fonts;
		return el(
			components.SelectControl,
			props
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
		var fieldProps = this.fieldProps( field );
		fieldProps.checked = !! this.attrs[ field.id ];
		return el( components.ToggleControl, fieldProps );
	};

	// endregion

	CxB.prototype.renderFields = function ( fields, section ) {
		var els = [];
		for ( var i = 0; i < fields.length; i ++ ) {
			var
				f = fields[i],
				func = f['type'] + 'FieldInit';
			if ( typeof this[ func ] === 'function' && ! f.hide && f.section == section ) {
				els.push( this[func]( f ) );
			}
		}
		return els;
	};

	CxB.prototype.inspectorFields = function () {
		var
			fields = this.fields,
			els = [];

		for ( var id in this.sections ) {
			if ( this.sections.hasOwnProperty( id ) ) {
				els.push(
					el(
						components.PanelBody,
						{
							title: id,
							className: 'caxton-section caxton-section-' + id.toLowerCase().replace( /[^0-z]/g, '-' ),
						},
						this.renderFields( this.sections[ id ], id )
					)
				);
			}
		}

		els = els.concat( this.renderFields( fields ) );

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

		var _props = $.extend( {
			dangerouslySetInnerHTML: { __html: html },
		}, props );

		return el( tag, _props );
	};

	CxB.prototype.populateFields = function ( html, edit ) {
		var c2e, tag;
		for ( let f in this.fields ) {
			if ( this.fields.hasOwnProperty( f ) ) {
				var
					fld = this.fields[ f ],
					val = this.attrs[fld.id];
				if ( fld.type === 'editable' ) {
					tag = fld.tag ? fld.tag : 'span';
					if ( edit ) {
						if ( val === fld.default ) {
							val = '<' + tag + ' class="default">' + val + '</' + tag + '>';
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
				if ( val && fld.tpl ) {
					val = fld.tpl.replace( '%s', val );
				}
				html = html.split( '[' + fld.id + ']' ).join( val );
				html = html.split( '{{' + fld.id + '}}' ).join( val );
			}
		}

		return html;
	};

	CxB.prototype.outputHTML = function ( html, edit ) {
		html = this.populateFields( html, edit );
		html = this.populateFields( html, edit ); // Twice to allow using dynamic fields in
		return { __html: html };
	};
	CxB.prototype.edit = function ( props ) {
		var that = this;
		if ( this.block ) {
			if ( typeof this.block.edit === 'function' ) {
				return this.block.edit( props, this );
			}
			return el( 'div', {
				dangerouslySetInnerHTML: this.outputHTML( this.tpl, 'edit' ),
				onClick: function ( e ) {
					e.preventDefault();
				},
				onKeyDown: function ( e ) {
					var $def = $( e.target ).find( '.default' );
					if ( $def.length ) $def.remove();
				},
				onBlur: function ( e ) {
					var
						$t = $( e.target ),
						attrs = {},
						prop = $t.data( 'editableproperty' );
					attrs[prop] = $t.html();
					that.props.setAttributes( attrs );
				},
			} );
		}
	};

	CxB.prototype.save = function ( props ) {
		var id = this.block.id;
		if ( this.block ) {
			if ( typeof this.block.save === 'function' ) {
				return this.block.save( props, this );
			}
			return el( 'div', {dangerouslySetInnerHTML: this.outputHTML( this.tpl )} );
		}
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
