import FAIcons from './icons.json';

function initCaxton( $, blocks, el, i18n, components ) {
	window.caxtonWPEditor = wp.blockEditor ? wp.blockEditor : wp.editor;
	const editor = caxtonWPEditor;
	const __ = i18n.__;
	const registerBlockType = blocks.registerBlockType;

	const processTemplate = ( tpl, props ) => {
		let ki;
		for ( ki in props ) {
			if ( props.hasOwnProperty( ki ) ) {
				tpl = tpl.split( `{{${ki}}}` ).join( props[ ki ] );
			}
		}
		// Twice to populate references in values
		for ( ki in props ) {
			if ( props.hasOwnProperty( ki ) ) {
				tpl = tpl.split( `{{${ki}}}` ).join( props[ ki ] );
			}
		}
		return tpl;
	};

	const caxtonCopy = ( target, obj ) => {
		for ( var ki in obj ) {
			if ( obj.hasOwnProperty( ki ) ) target[ ki ] = obj[ ki ];
		}
		return target;
	};

	const elementFromHTML = (html, props, tag) => {
		if ( ! props ) {
			props = {};
		}
		if ( ! tag ) {
			tag = 'div'
		}

		const _props = $.extend( {
			dangerouslySetInnerHTML: { __html: html },
		}, props );

		return el( tag, _props );
	};

	const HTMLFromElement = els => {
		let content = '';
		if ( els ) {
			if ( ! els.length ) {
				els = [els];
			}
			for ( let i = 0; i < els.length; i ++ ) {
				const node = els[i];
				switch ( typeof node ) {
					case 'object':
						content += wp.element.renderToString( node );
						break;
					default:
						content += node;
				}
			}
		}
		return content;
	};

	class CxB {

		constructor(block) {
			const th = this;

			this.keySuffix = 0;

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

			th.tpl = block.tpl;
			if ( block.toolbars ) {
				block.fields = jQuery.extend( block.fields, block.toolbars )
			} else {
				block.toolbars = {};
			}
			th.fields = th.processFields( block.fields );
			th.sections = block.sections ? block.sections : {};
			th.sectionsFields = th.processSections( th.fields );
			th.toolbars = th.processFields( block.toolbars );

			th.registerBlock();
		}

		processFields(fields) {
			const ret = [];

			for ( const id in fields ) {
				if( fields.hasOwnProperty( id ) ) {
					const type = fields[id];
					let field = {};
					if ( typeof type === 'object' ) {
						field = type;
					} else {
						field.type = type;
					}
					field.id = id;
					field.label = field.label ? field.label : id;

					if ( field.type === 'checkbox' || field.type === 'toggle' ) {
						field.value = field.value || '1';
					}

					if ( ! field.default && isNaN( field.default ) ) {
						field.default = '';
					}
					if ( field.attr ) {
						this.block.attributes[id] = field.attr;
					} else {
						this.block.attributes[id] = {
							type: this.fieldAttrType( field ),
						};
					}
					ret.push( field );
				}
			}

			return ret;
		}

		fieldAttrType({type}) {
			const attrTypeByFieldType = {
				'number': 'number',
				'range': 'number',
			};

			if ( attrTypeByFieldType[ type ] ) {
				return attrTypeByFieldType[ type ];
			}

			return 'string';
		}

		processSections(fields) {
			const sections = {};

			for ( let i = 0; i < fields.length; i ++ ) {
				const section = fields[i].section;
				if ( section ) {
					if ( ! sections[ section ] ) {
						sections[ section ] = [];
					}
					sections[ section ].push( fields[i] )
				}
			}
			return sections;
		}

		// region Inspector Fields

		fieldProps(field, index) {
			const id = field.id;
			const that = this;
			const fieldProps = $.extend( {}, field );

			fieldProps.key = `${fieldProps.type}-${index}`;
			fieldProps.value = that.attrs[ id ];
			fieldProps.onChange = (val, moreValues) => {
				const attrs = {};
				attrs[ id ] = val;
				if ( field.type === 'checkbox' || field.type === 'toggle' ) {
					attrs[ id ] = val ? field.value : '';
				}

				that.focussedProps.setAttributes( attrs );

				if ( typeof field.onChange === 'function' ) {
					field.onChange( val, that, moreValues );
				}
			};

			delete fieldProps.id;
			delete fieldProps.type;
			return fieldProps;
		}

		imageFieldEl(field, index) {
			const props = this.fieldProps( field, index );
			if ( ! props.className ) {
				props.className = '';
			}

			let btnContent = __( 'Select image' );
			let removeBtn = null;

			if ( props.value ) {
				if ( props.value.indexOf( 'featured_image' ) > -1 ) {
					props.onChange( caxton.content_vars[props.value] );
				}
				btnContent = [
					el( 'img', {src: props.value, key: 'image'} ),
					__( 'Click the image to edit or update' ),
				];
				removeBtn = el(
					'a', {
						className: 'caxton-remove-image',
						href     : '#',
						onClick() {
							props.onChange( '', {} )
						},
					},
					el( 'i', {className: 'dashicons dashicons-no',} ),
					'Remove'
				);
			}

			props.className += ' caxton-image-picker';
			return el(
				components.BaseControl,
				props,
				el(
					editor.MediaUpload,
					{
						key     : 'imagePicker',
						onSelect(media) {
							props.onChange( media.url, media );
						},
						type: 'image',
						value: props.value,
						label: props.label,
						render({open}) {
							return el( 'span', { className: 'v-mid dib'},
								removeBtn,
								el( components.Button, {
										className: props.value ? 'image-button' : 'button button-large',
										onClick  : open,
									},
									btnContent
								)
							);
						},
					}
				),
//				props.value ? null : el( 'span', {className: 'v-mid dib ph2'}, ' OR ' ),
//				props.value ? null : el(
//					'select',
//					{
//						key     : 'options',
//						onChange: function ( e ) {
//							if ( e.target.value ) {
//								props.onChange( e.target.value );
//							}
//						}
//					},
//					[
//						el( 'option', {disabled: 'disabled',selected: 'selected'}, __( 'Use featured image' ) ),
//						el( 'option', {value: 'featured_image_medium_large',}, __( 'Size: Medium large' ) ),
//						el( 'option', {value: 'featured_image_large',}, __( 'Size: Large' ) ),
//						el( 'option', {value: 'featured_image_full',}, __( 'Size: Full' ) ),
//					]
//				)
			);
		}

		colorFieldEl(field, index) {
			const panelChildren = [];
			const props = this.fieldProps( field, index );
			props.title = props.label;

			if ( props.initialOpen === undefined ) {
				props.initialOpen = props.value ? false : true;
			}

			if ( field.help ) {
				panelChildren.push( field.help );
			}

			props.colorSettings = [ {
				label: props.label,
				value: props.value,
				onChange: props.onChange,
			} ];

			return el( caxtonWPEditor.PanelColorSettings, props, panelChildren )
		}

		checkboxFieldEl(field, index) {
			const fieldProps = this.fieldProps( field, index );
			fieldProps.checked = !! this.attrs[ field.id ];
			return el( components.CheckboxControl, fieldProps );
		}

		radioFieldEl(field, index) {
			const fieldProps = this.fieldProps( field, index );
			fieldProps.selected = fieldProps.value;
			return el( components.RadioControl, fieldProps );
		}

		rangeFieldEl(field, index) {
			return el(
				components.RangeControl,
				this.fieldProps( field, index )
			)
		}

		selectFieldEl(field, index) {
			return el(
				components.SelectControl,
				this.fieldProps( field, index )
			)
		}

		orderedSelectFieldEl(field, index) {
			const
				props = this.fieldProps( field, index ),
				delimiter = props.delimiter ? props.delimiter : ',',
				multiple = typeof props.multiple === 'undefined' ? true : props.multiple,
				selectedOptionsData = {},
				selectedOptions = [],
				availableOption = [];

			let
				opt, optEl,
				controlValue = props.value ? props.value.split( delimiter ) : [];

			for ( var i = 0; i < props.options.length; i ++ ) {
				opt = props.options[i];
				optEl = el(
					'div',
					{
						className: 'caxton-orderedselect-option',
						'data-val': opt.value,
						key: `option-${opt.value}`,
					},
					(
						opt.image ? el( 'img', {src: opt.image} ) : null
					),
					opt.label
				);

				if ( typeof opt.value === 'number' ) {
					opt.value = opt.value.toString();
				}

				if ( !controlValue.includes(opt.value) ) {
					availableOption.push( optEl );
				} else {
					selectedOptionsData[ opt.value ] = opt;
				}
			}

			for ( var i = 0; i < controlValue.length; i ++ ) {
				opt = selectedOptionsData[controlValue[i]];
				optEl = el(
					'div',
					{
						className: 'caxton-orderedselect-option',
						'data-val': opt.value,
						key: `option-${opt.value}`,
					},
					(
						opt.image ? el( 'img', {src: opt.image} ) : null
					),
					opt.label
				);

				selectedOptions.push( optEl );
			}

			if ( ! selectedOptions.length ) {
				selectedOptions.push( el( 'span', {
					className: 'caxton-placeholder o70',
					key: 'placeholder',
				}, 'Please choose...' ) )
			}

			selectedOptions.push( el( 'i', {
				className: 'dashicons dashicons-arrow-down',
				key: 'down-arrow-icon',
			} ) );

			return el(
				components.BaseControl,
				props,
				el(
					'div',
					{
						className: 'caxton-orderedselect-wrap',
						key: 'orderedselect-wrap',
					},
					el( 'div', {
						className: 'caxton-orderedselect-selected',
						key: 'selected-options',
						onClick({target}) {
							let val;
							const $target = $( target );
							if ( $target.hasClass( 'caxton-orderedselect-option' ) ) {
								val = $target.attr( 'data-val' );
								controlValue.splice( controlValue.indexOf( val ), 1 );
								props.onChange( controlValue.join( delimiter ) );
							} else {
								$target.closest( '.caxton-orderedselect-wrap' ).toggleClass( 'caxton-orderedselect-open' );
							}
						},
					}, selectedOptions ),
					el( 'div', {
						className: 'caxton-orderedselect-available',
						key: 'available-options',
						onClick({target}) {
							let val;
							const $target = $( target );
							if ( $target.hasClass( 'caxton-orderedselect-option' ) ) {
								val = $target.attr( 'data-val' );
								multiple ? controlValue.push( val ) : ( controlValue = [ val ] );
								props.onChange( controlValue.join( delimiter ) );
							}
						},
					}, availableOption )
				),
			);
		}

		fontFieldEl(field, index) {
			if ( ! field.tpl ) {
				field.tpl = 'font-family: %s;';
			}
			const props = this.fieldProps( field, index );
			const onChange = props.onChange;
			props.onChange = val => {
				if ( !val.includes(',') ) {
					const link = $( "<link rel='stylesheet' class='caxton-google-font'>" );
					link.attr( "href", `https://fonts.googleapis.com/css?family=${val}` )
					$( 'body' ).append( link );
				}
				onChange( val );
			};
			props.options = caxton.fonts;
			return el(
				components.SelectControl,
				props
			)
		}

		textFieldEl(field, index) {
			return el(
				components.TextControl,
				this.fieldProps( field, index )
			)
		}

		textareaFieldEl(field, index) {
			return el(
				components.TextareaControl,
				this.fieldProps( field, index )
			)
		}

		toggleFieldEl(field, index) {
			const fieldProps = this.fieldProps( field, index );
			fieldProps.checked = !! this.attrs[ field.id ];
			return el( components.ToggleControl, fieldProps );
		}

		iconFieldEl(field, index) {
			const props = this.fieldProps( field, index );
			const that = this;
			const defaultIcons = [];
			props.title = props.label;

			props.className = 'caxton-icon-picker-panel';

			for ( let i = 0; i < 100; i ++ ) {
				const ico = caxton.fontAwesome[i];
				defaultIcons.push( el( 'i', {className: `fas fa-${ico.n}`, key: ico.n, title: ico.n.replace( ' fab', '' ) } ) );
			}
			defaultIcons.push( el( 'p', {key: 'helptext'}, 'Search icons for more from all Font Awesome icons' ) );

			return el(
				components.PanelBody,
				props,
				el( 'div', {
						className: 'caxton-icon-picker',
						onClick({target}) {
							if ( target.tagName === 'I' ) {
								props.onChange( ` ${target.className.replace( ' o-70', '' )}` );
							}
						}
					},
					el( 'input', {
						type: 'text',
						placeholder: __( 'Search icons', 'caxton' ),
						onKeyUp({target}) {
							let searchTerm = target.value;
							let iconsMatched = 0;
							let $wrp;
							searchTerm = searchTerm.toLowerCase();
							$wrp = $( target ).siblings( '.caxton-matching-icons' );
							$wrp.html( '' );
							for ( let i = 0; iconsMatched < 50 && i < caxton.fontAwesome.length; i ++ ) {
								const ico = caxton.fontAwesome[i];
								if ( ico.n.includes(searchTerm) ) {
									iconsMatched ++;
									$wrp.append( `<i class="fas fa-${ico.n}"></i>` )
								} else if ( iconsMatched < 34 && ico.s.includes(searchTerm) ) {
									iconsMatched ++;
									$wrp.append( `<i class="fas fa-${ico.n} o-70"></i>` )
								}
							}
						}
					} ),
					el( 'span', {
						className: 'dashicons dashicons-search',
						title: __( 'Search', 'caxton' ),
					} ),
					el( 'span', {
						className: 'dashicons dashicons-no',
						title: __( 'Remove icon', 'caxton' ),
						style: {
							cursor: 'pointer',
							display: props.value ? 'block' : 'none',
						},
						onClick() {
							props.onChange( '' );
						}
					} ),
					el( 'div', {
						className: 'caxton-matching-icons',
						onClick({target}) {
							if ( target.tagName === 'I' ) {
								props.onChange( ` ${target.className.replace( ' o-70', '' )}` );
							}
						}
					}, defaultIcons )
				)
			);
		}

		positionFieldEl(field, index) {
			const fieldProps = this.fieldProps( field, index );
			fieldProps.selected = fieldProps.value;
			fieldProps.options = [
				//			{value: 'left top', label: 'Left top',},
				{value: 'center top', label: 'Top',},
				//			{value: 'right top', label: 'Right top',},
				//			{value: 'left center', label: 'Left center',},
				{value: '', label: 'Center',},
				//			{value: 'right center', label: 'Right center',},
				//			{value: 'left bottom', label: 'Left bottom',},
				{value: 'center bottom', label: 'Bottom',},
				//			{value: 'right bottom', label: 'Right bottom',},
			]
			return el( components.RadioControl, fieldProps );
		}

		AlignmentToolbarInit(field, index) {
			const props = this.fieldProps( field, index );

			props.controls = [
				{
					icon: 'editor-alignleft',
					title: __( 'Align left' ),
					isActive: props.value === ' tl',
					onClick() {
						props.onChange( ' tl' );
					}
				},
				{
					icon: 'editor-aligncenter',
					title: __( 'Align center' ),
					isActive: props.value === ' tc',
					onClick() {
						props.onChange( ' tc' );
					}
				},
				{
					icon: 'editor-alignright',
					title: __( 'Align right' ),
					isActive: props.value === ' tr',
					onClick() {
						props.onChange( ' tr' );
					}
				},
			];
			props.wideControlsEnabled = true;

			return el(
				components.Toolbar,
				props
			)
		}

		BlockWidthToolbarInit(field, index) {
			const props = this.fieldProps( field, index );

			props.controls = [
				{
					icon: 'align-center',
					title: __( 'Default' ),
					isActive: ! props.value,
					onClick() {
						props.onChange( '' );
					}
				},
				{
					icon: 'align-wide',
					title: __( 'Wide width' ),
					isActive: props.value === ' vw-100-bg',
					onClick() {
						props.onChange( ' vw-100-bg' );
					}
				},
				{
					icon: 'align-full-width',
					title: __( 'Full width' ),
					isActive: props.value === ' vw-100',
					onClick() {
						props.onChange( ' vw-100' );
					}
				},
			];
			props.wideControlsEnabled = true;

			return el(
				components.Toolbar,
				props
			)
		}

		BlockAlignToolbarInit(field, index) {
			const props = this.fieldProps( field, index );

			props.controls = [
				{
					icon: 'align-left',
					title: __( 'Align left' ),
					isActive: props.value === ' fl',
					onClick() {
						props.onChange( ' fl' );
					}
				},
				{
					icon: 'align-center',
					title: __( 'Align center' ),
					isActive: ! props.value,
					onClick() {
						props.onChange( '' );
					}
				},
				{
					icon: 'align-right',
					title: __( 'Align right' ),
					isActive: props.value === ' rl',
					onClick() {
						props.onChange( ' rl' );
					}
				},
			];
			props.wideControlsEnabled = true;

			return el(
				components.Toolbar,
				props
			)
		}

		// endregion

		renderPanel(id) {
			const fields = this.fields;
			let panelProps = {};
			let panelFields;
			const th = this;

			if ( th.sections[id] ) {
				panelProps = th.sections[id];
			}

			panelProps = $.extend( panelProps, {
				title: id,
				className: '',
				key: `CaxtonPanel${id}`,
				initialOpen: false,
			} );

			panelProps.className += `caxton-section caxton-section-${id.toLowerCase().replace( /[^0-z]/g, '-' )}`;

			panelFields = th.renderFields( th.sectionsFields[id], id );

			return el( components.PanelBody, panelProps, panelFields );
		}

		fieldEl ( f, func, key_suffix ) {

			if ( 'undefined' === typeof key_suffix ) {
				key_suffix = this.keySuffix++;
			}

			if ( typeof f.render === 'function' ) {
				return f.render( this.fieldProps( f, key_suffix ), this );
			}

			if ( ! func ) {
				func = f['type'] + 'FieldEl';
			}

			return this[ func ]( f, key_suffix );
		}

		renderFields(fields, section, functionSuffix) {
			const els = [];
			const panelsRenderd = [];

			if ( ! functionSuffix ) {
				functionSuffix = 'FieldEl';
			}

			for ( let i = 0; i < fields.length; i ++ ) {
				const f = fields[i];
				let func;

				if ( functionSuffix.includes('Toolbar') ) {
					f['type'] = f['type'].replace( 'Toolbar', '' )
				}

				func = f['type'] + functionSuffix;


				if ( typeof this[ func ] === 'function' ) {
					if ( ! f.hide ) {
						if ( ! section ) {
							if ( ! f.section ) {
								els.push( this.fieldEl( f, func, i ) );
							} else if ( !panelsRenderd.includes(f.section) ) {
								panelsRenderd.push( f.section );
								els.push( this.renderPanel( f.section ) );
							}
						} else if ( f.section == section ) {
							els.push( this.fieldEl( f, func, i ) );
						}
					}
				} else if ( !f['type'].includes('Toolbar') ) {
					console.error( `${functionSuffix.replace( 'Init', '' )} ${f['id']} of type ${f['type']} and callback ${func} not supported.` );
				}
			}
			return els;
		}

		toolbarElements() {
			const els = this.renderFields( this.toolbars, false, 'ToolbarInit' );

			if ( els.length ) {
				return el(
					editor.BlockControls,
					{ key: 'toolbars' },
					els
				);
			}
		}

		inspectorFields() {
			const fields = this.fields;
			const panelProps = {};
			let panelFields;
			let els = [];
			const th = this;

			els = els.concat( th.renderFields( fields ) );

			if ( els && els.length ) {
				return el(
					editor.InspectorControls,
					{ key: 'inspector' },
					els
				);
			}
		}

		// region Register block

		populateFields(html, edit) {
			if ( ! html ) {
				return '';
			}
			let c2e;
			let tag;
			for ( let f in this.fields ) {
				if ( this.fields.hasOwnProperty( f ) ) {
					let _val;
					const fld = this.fields[ f ];
					let val = _val = this.attrs[fld.id];
					if ( fld.type === 'editable' ) {
						tag = fld.tag ? fld.tag : 'span';
						if ( edit ) {
							if ( val === fld.default ) {
								val = `<${tag} class="default">${val}</${tag}>`;
							}
							c2e = __( 'Click to Edit' );
							val =
								`<${tag} contentEditable="true" title="${c2e}" data-editableproperty="${fld.id}">${val}</${tag}>`;
						} else {
							if ( val ) {
								val = `<${tag}>${val}</${tag}>`;
							}
						}
					}
					if ( ( val || typeof val === 'number' ) && fld.tpl ) {
						val = fld.tpl.replace( /%s/g, val );
					}
					html = html.split( `{{_${fld.id}}}` ).join( _val );
					html = html.split( `{{${fld.id}}}` ).join( val );
				}
			}

			return html;
		}

		outputHTML(html, edit) {
			html = this.populateFields( html, edit );
			html = this.populateFields( html, edit ); // Twice to allow using dynamic fields in
			return { __html: html };
		}

		getBlockTpl( props ) {
			if ( typeof this.tpl === 'function' ) {
				return this.tpl( props, this );
			} else {
				return this.tpl;
			}
		}

		edit(props) {
			let that = this;
			if ( that.block ) {
				if ( typeof that.block.edit === 'function' ) {
					return that.block.edit( props, that );
				}
				return el( 'div', {
					key: 'block',
					dangerouslySetInnerHTML: that.outputHTML( that.getBlockTpl( props ), 'edit' ),
					onClick(e) {
						e.preventDefault();
					},
					onKeyDown({target}) {
						const $def = $( target ).find( '.default' );
						if ( $def.length ) $def.remove();
					},
					onBlur({target}) {
						const $t = $( target );
						const attrs = {};
						const prop = $t.data( 'editableproperty' );
						attrs[prop] = $t.html();
						console.log( attrs, prop );
						that.focussedProps.setAttributes( attrs );
					},
				} );
			}
		}

		save(props) {
			const id = this.block.id;
			if ( this.block ) {
				if ( typeof this.block.save === 'function' ) {
					return this.block.save( props, this );
				}
				return el( 'div', {dangerouslySetInnerHTML: this.outputHTML( this.getBlockTpl( props ) )} );
			}
		}

		saveBlockProperties( props ) {
			this.props = props;
			this.attrs = this.props.attributes;

			for ( let f in this.fields ) {
				if ( this.fields.hasOwnProperty( f ) ) {
					const fld = this.fields[ f ];
					if ( ! this.attrs[fld.id] && isNaN( this.attrs[fld.id] ) ) {
						this.attrs[fld.id] = fld.default
					} else if ( 'image' === fld.type && this.attrs[ fld.id ].indexOf( 'featured_image' ) > -1 ) {
						this.attrs[ fld.id ] = caxton.content_vars[ this.attrs[ fld.id ] ];
					} else {
						this.attrs[ fld.id ] = this.attrs[ fld.id ];
					}
				}
			}
		}

		registerBlock() {
			let attrName;
			const that = this;
			const block = this.block;
			const registerBlockProps = $.extend( {}, block );
			if ( block.icon.includes('<svg') ) {
				const $icon = jQuery( block.icon );
				const props = {};
				$.each( $icon[0].attributes, function () {
					if ( this.specified ) {
						attrName = this.name.replace(/[-:]([a-z])/g, g => g[1].toUpperCase());
						props[attrName] = this.value;
					}
				} );
				props.height = 20;
				props.width = 20;
				block.icon = elementFromHTML( $icon.html(), props, 'svg' );
			}

			delete registerBlockProps.fields;
			delete registerBlockProps.tpl;
			delete registerBlockProps.id;

			registerBlockProps.icon = block.icon;

			const editCallback = function ( props ) {
				const els = [];
				that.saveBlockProperties( props );

				if ( typeof that.block.beforeEdit === 'function' ) {
					const beforeCallback = that.block.beforeEdit( props, that );
					if ( beforeCallback ) {
						els.push( beforeCallback );
					}
				}

				if ( props.isSelected ) {
					that.focussedProps = props;
					els.push( that.inspectorFields() );
					els.push( that.toolbarElements() );
				}

				els.push( that.edit( props ) );

				if ( typeof that.block.afterEdit === 'function' ) {
					const afterCallback = that.block.afterEdit( props, that );
					if ( afterCallback ) {
						els.push( afterCallback );
					}
				}
				return el( 'div', { key: 'block-content'}, els );
			};

			registerBlockProps.edit = editCallback;

			registerBlockProps.getEditWrapperProps = function( attributes ) {
				let attrs = {};
				const layout = attributes.Layout;
				let float = attributes.BlockAlignment;

				float = float ? float : attributes['Block Alignment'];

				if ( layout ) {
					attrs['caxton-layout'] = layout;
				}
				if ( float ) {
					const floatMaps = {
						' fl': 'left',
						' rl': 'right',
					};
					attrs['data-align'] = floatMaps[ float ];
				}

				if ( typeof block.registerBlockProps === 'function' ) {
					attrs = jQuery.extend( block.registerBlockProps( attributes, that ), attrs );
				}

				if ( typeof that.block.wrapperProps === 'function' ) {
					attrs = that.block.wrapperProps( attrs, attributes, this );
				}

				return attrs;
			};

			registerBlockProps.save = props => {
				that.saveBlockProperties( props );
				return that.save( props );
			};

			if ( 'function' === typeof block.apiCallback ) {
				if ( 'function' !== typeof block.apiUrl ) {
					block.apiUrl = () => (
						{
							apiData: block.apiUrl,
						}
					);
				}
				that.block.edit = block.apiCallback;

				class CaxtonAPIDataComponent extends React.Component {
					constructor( props ) {
						super( ...arguments );
						this.state = {
							dataProps: caxtonCopy( {}, props ),
							block: block,
							editCallback: editCallback,
						};
					}
					fetchUrls() {
						let
							state = this.state,
							urls = this.state.block.apiUrl( state.dataProps ),
							cmp = this;

						for ( const dataKey in urls ) {
							if ( urls.hasOwnProperty( dataKey ) ) {
								if ( ! state.dataProps[dataKey] || urls[dataKey] !== state.dataProps[dataKey].path ) {
									state.dataProps[dataKey] = {};
									wp.apiFetch( {path: urls[dataKey]} ).then( data => {
										if ( cmp && state.dataProps[dataKey].data !== data ) {
											state.dataProps[dataKey].data = data;
											state.dataProps[dataKey].path = urls[dataKey];
											cmp.setState( state );
										}
									} );
								}
							}
						}
					}

					render() {
						caxtonCopy( this.state.dataProps, this.props );
						this.fetchUrls();
						return this.state.editCallback( this.state.dataProps );
					}
				}

				registerBlockProps.edit = CaxtonAPIDataComponent;
				registerBlockProps.save = () => null;
			}

			if ( !block.id.includes('/') ) {
				block.id = `caxton/${block.id}`;
			}

			registerBlockType( block.id, registerBlockProps );
		}
	}

	CxB.prototype.orderedselectFieldEl = CxB.prototype.orderedSelectFieldEl;

	// endregion Register block

	window.CaxtonBlock = block => new CxB( block );

	window.caxtonRegisterFieldType = ( name, callback ) => {

	};

	window.Caxton = {
		el2html: HTMLFromElement,
		html2el: elementFromHTML,
		copyObj: caxtonCopy,
		tplProc: processTemplate,
	};
}

initCaxton( jQuery, wp.blocks, wp.element.createElement, window.wp.i18n, wp.components );

jQuery( $ => {
	setTimeout( () => {
		if ( typeof ajaxurl !== 'string' ) return;
		let blk;
		let icon;
		const blocksData = wp.data.select( 'core/blocks' ).getBlockTypes();
		const blocks = {};
		for ( let i = 0; i < blocksData.length; i ++ ) {
			blk = blocksData[i];
			icon = blk.icon.src;
			if ( typeof icon === 'object' ) {
				icon = Caxton.el2html( icon );
			} else {
				icon = `<span class="dashicons dashicons-${icon}"></span>`;
			}
			blocks[blk.name] = {
				title: blk.title,
				icon,
				category: blk.category,
			};
		}

		$.post(
			ajaxurl,
			{
				action: 'caxton_save_blocks',
				blocks: JSON.stringify( blocks ),
			}
		);
	}, 2500 );
} );

caxton.fontAwesome = FAIcons;