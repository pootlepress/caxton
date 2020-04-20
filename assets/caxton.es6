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

	const styleObject = ( styles ) => {
		let
			stOb  = {},
			rules = styles.split( ';' );

		for ( var i = 0; i < rules.length; i ++ ) {
			var rule = rules[i].split( /:(.+)/ );
			stOb[rule[0]] = rule[1];
		}
		return stOb;
	};

	const copyObj = ( target, obj ) => {
		for ( var ki in obj ) {
			if ( obj.hasOwnProperty( ki ) ) target[ ki ] = obj[ ki ];
		}
		return target;
	};

	const html2el = (html, props, tag) => {
		if ( ! html ) {
			html = '';
		} else if ( html.__html ) {
			html = html.__html;
		}
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

	const el2html = els => {
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

	const getFAIconSvg = ( icon, el = {} ) => {
		let svg = caxtonFAIconsSvg[icon];
		if ( ! svg ) {
			svg = caxtonFAIconsSvg[icon + '-solid'];
			if ( ! svg ) {
				svg = caxtonFAIconsSvg[icon + '-brand'];
				if ( ! svg ) {
					svg = caxtonFAIconsSvg[icon + '-regular'];
				}
			}
		}

		if ( el ) {
			let elProps = typeof el === 'object' ? el : {};
			return html2el( svg, elProps );
		}
		return svg;
	};

	class CxB {
		setProps() {
			this.keySuffix = 0;
		}

		constructor(block) {
			const th = this;

			this.setProps();

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

			// region Resizable attributes
			if ( block.resizable ) {
				if ( block.resizable.height ) {
					this.block.attributes[block.resizable.height] = {type: 'string'};
				}
				if ( block.resizable.width ) {
					this.block.attributes[block.resizable.width] = {type: 'string'};
				}
			}
			// endregion Resizable attributes

			th.fields = th.processFields( block.fields );
			th.sections = block.sections ? block.sections : {};
			th.sectionsFields = th.processSections( th.fields );
			th.toolbars = th.processFields( block.toolbars );

			th.registerBlock();
		}

		preprocessField_overlay( id, fields ) {

			let defaults = copyObj( {
				'color'   : '',
				'color2'  : '',
				'gradient': 'linear-gradient( ',
				'opacity' : '1',
			}, fields[id].defaults || {} );

			let
				tplStyle = 'background-color:{{Background color}};{{Gradient type}}{{Background colors opacity}}',
				tpl      = '<div class="absolute absolute--fill" style="' + tplStyle + '"></div>';

			fields[id] = Object.assign( { section: 'Overlay', tpl }, fields[id] );

			let section = fields[id].section;

			Object.assign( fields, {
				'Background color'         : {
					type   : 'color',
					section,
					default: defaults['color']
				},
				'Gradient color'           : {
					type   : 'color',
					section,
					tpl    : ', %s',
					default: defaults['color2']
				},
				'Gradient type'            : {
					type   : 'select',
					options: [
						{value: 'linear-gradient( ', label: 'Linear vertical',},
						{value: 'linear-gradient( 90deg, ', label: 'Linear horizontal',},
						{value: 'linear-gradient( 45deg, ', label: 'Linear 45 deg',},
						{value: 'linear-gradient( -45deg, ', label: 'Linear 45 deg anticlockwise',},
						{value: 'radial-gradient( ', label: 'Radial gradient',},
					],
					section,
					tpl    : 'background-image:%s{{Background color}}{{Gradient color}});',
					default: defaults['gradient']
				},
				'Background colors opacity': {
					type   : 'range',
					min    : 0,
					max    : 1,
					step   : .05,
					help   : 'Reduce opacity to have transparent colors over image',
					section,
					tpl    : 'opacity:%s;',
					default: defaults['opacity']
				},
			} );
		}

		preprocessField_background( id, fields ) {

			let defaults = copyObj( {
				'image'         : '',
				'image_position': '',
				'parallax'      : '',
			}, fields[id].defaults || {} );

			let
				colorStyle = 'background-color:{{Background color}};{{Gradient type}}',
				imgStyle = '{{Background image}}{{Background image position}}{{Background parallax}}',
				tpl =
						'<div class="absolute absolute--fill cover bg-center" style="' + colorStyle + imgStyle + '"></div>' +
						'<div class="absolute absolute--fill" style="' + colorStyle + '{{Background colors opacity}}"></div>';

			fields[id] = Object.assign( { section: 'Background', tpl }, fields[id] );

			let section = fields[id].section;

			Object.assign( fields, {
				'Background image'         : {
					type   : 'image',
					section,
					tpl    : 'background-image:url(%s);',
					default: defaults['image'],
				},
				'Background image position': {
					type   : 'position',
					section,
					tpl    : 'background-position:%s;',
					default: defaults['image_position'],
				},
				'Background parallax'      : {
					type   : 'toggle',
					value  : 'background-attachment:fixed;',
					section,
					default: defaults['parallax'],
				},
			} );

			// Add overlay fields
			this.preprocessField_overlay( id, fields );

			fields[id].tpl = tpl;
		}

		preprocessFields(fields) {
			for ( const id in fields ) {
				if ( fields.hasOwnProperty( id ) && fields[id].type && 'function' === typeof this['preprocessField_' + fields[id].type] ) {
					this['preprocessField_' + fields[id].type]( id, fields );
				}
			}

			return fields;
		}

		processFields(fields) {
			const ret = [];

			fields = this.preprocessFields( fields );

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
					} else {
						// Make sure default is string
						field.default = '' + field.default;
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
			if ( ! fieldProps.onChange ) {
				fieldProps.value = that.attrs[id];
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
			}

			return fieldProps;
		}

		editableFieldEl(field, index) {
			return null;
		}

		overlayFieldEl(field, index) {
			return null;
		}

		backgroundFieldEl(field, index) {
			return null;
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
										className: props.value ? 'image-button' : 'ml3 button button-large ',
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

		customFieldEl(field, index) {
			return field.render( this.fieldProps( field ), this );
		}

		textareaFieldEl(field, index) {
			return el(
				components.TextareaControl,
				this.fieldProps( field, index )
			)
		}

		dateTimeFieldEl(field, index) {
			return datetimeFieldEl( field, index );
		}

		datetimeFieldEl(field, index) {
			const fieldProps = this.fieldProps( field, index );
			fieldProps.currentDate = fieldProps.value;
			return el(
				components.PanelBody,
				{ title: fieldProps.label, },
				el( components.DateTimePicker, fieldProps )
			);
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
				let ico = caxtonFAIconsData[i];
				defaultIcons.push( getFAIconSvg( ico.n, {key: i, className: 'icon-choice', 'data-icon': ico.n}, 'i' ) );
			}
			defaultIcons.push( el( 'p', {key: 'helptext'}, 'Search icons for more from all Font Awesome icons' ) );

			return el(
				components.PanelBody,
				props,
				el( 'div', {
						className: 'caxton-icon-picker',
						onClick({target}) {
							const $p = $( target ).closest( '.icon-choice' );
							if ( $p.length ) {
								props.onChange( $p.html() );
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
							for ( let i = 0; iconsMatched < 50 && i < caxtonFAIconsData.length; i ++ ) {
								const ico = caxtonFAIconsData[i];
								if ( ico.n.includes(searchTerm) ) {
									iconsMatched ++;
									$wrp.append( `<i data-icon="${ico.n}" class="icon-choice">` + getFAIconSvg( ico.n, false ) + '</i>' )
								} else if ( iconsMatched < 34 && ico.s.includes(searchTerm) ) {
									iconsMatched ++;
									$wrp.append( `<i data-icon="${ico.n}" class="icon-choice order-2">` + getFAIconSvg( ico.n, false ) + '</i>' )
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

			const values = $.extend( {
				left: ' tl',
				right: ' tr',
				center: ' tc',
			}, props.values || {} );

			props.controls = [
				{
					icon: 'editor-alignleft',
					title: __( 'Align left' ),
					isActive: props.value === values.left,
					onClick() {
						props.onChange( values.left );
					}
				},
				{
					icon: 'editor-aligncenter',
					title: __( 'Align center' ),
					isActive: props.value === values.left,
					onClick() {
						props.onChange( values.left );
					}
				},
				{
					icon: 'editor-alignright',
					title: __( 'Align right' ),
					isActive: props.value === values.center,
					onClick() {
						props.onChange( values.center );
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
					f.type = f.type.replace( 'Toolbar', '' )
				}

				if ( typeof f.render === 'function' ) {
					f.type = 'custom';
				}

				func = f.type + functionSuffix;


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
				} else if ( !f.type.includes('Toolbar') ) {
					console.error( `${functionSuffix.replace( 'Init', '' )} ${f['id']} of type ${f['type']} and callback ${func} not supported.` );
				}
			}
			return els;
		}

		resizableElement( resizable, children, props ) {
			props = props || this.props;
			const
				attrs         = props.attributes,
				setAttributes = props.setAttributes,
				isSelected    = props.isSelected,
				heightProp    = resizable.height,
				widthProp     = resizable.width,
				DEFAULTS      = {
					enable       : [],
					onResizeStop : () => {},
					onResize     : () => {},
					onResizeStart: () => {},
				};
			const [ isResizing, setIsResizing ] = wp.element.useState( false );
			let height, width = '100%', enableStr;

			if ( heightProp || widthProp ) {
				resizable = jQuery.extend( DEFAULTS, resizable );
				enableStr = resizable.enable.toString().toLowerCase();

				const enable = {
					top        : false,
					right      : false,
					bottom     : false,
					left       : false,
					topRight   : false,
					bottomRight: false,
					bottomLeft : false,
					topLeft    : false,
				};
				const RESIZABLE_PROPS = {
					key:'caxton-resizable',
					className: {
						'caxton-resizable': true,
						'is-selected': isSelected,
						'is-resizing': isResizing,
					},
					size: {},
					onResizeStop: ( event, direction, elt, delta ) => {
						resizable.onResizeStop( event, direction, elt, delta );
						setIsResizing( false );
					},
					onResize: ( event, direction, elt, delta ) => {
						resizable.onResize( event, direction, elt, delta );
						let atts = {};
						if ( heightProp ) {
							atts[heightProp] = elt.clientHeight;
						}
						if ( widthProp ) {
							atts[widthProp] = elt.clientWidth;
						}
						setAttributes( atts );
//						toggleSelection( true );
					},
					onResizeStart: ( event, direction, elt, delta ) => {
						resizable.onResizeStart( event, direction, elt, delta );
						setIsResizing( true );
					},
				};

				if ( resizable.size ) {
					RESIZABLE_PROPS.size = resizable.size;
				}

				if ( heightProp ) {
					attrs[heightProp] && ( RESIZABLE_PROPS.size.height = attrs[heightProp] );
					RESIZABLE_PROPS.minHeight = resizable.minHeight || 50;
					enableStr.indexOf( 'top' ) > - 1 || enableStr.indexOf( 'bottom' ) > - 1 || resizable.enable.push( 'bottom' );
				}

				if ( widthProp ) {
					attrs[widthProp] && ( RESIZABLE_PROPS.size.width = attrs[widthProp] );
					RESIZABLE_PROPS.minWidth = resizable.minWidth || 50;
					enableStr.indexOf( 'left' ) > - 1 || enableStr.indexOf( 'right' ) > - 1 || resizable.enable.push( 'right' );
				}

				resizable.enable.forEach( handle => {
					if ( enable.hasOwnProperty( handle ) ) {
						enable[handle] = true;
					}
				} );

				RESIZABLE_PROPS.enable = enable;

				return el(
					components.ResizableBox, RESIZABLE_PROPS,
					el( 'div', { className: 'caxton-resizable-contents h-100'}, children )
				);
			}

			return children;
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

		populateField_editable( val, fld, edit ) {

			let c2e = __( 'Click to Edit' );
			if ( ! fld.tag ) {
				fld.tag = 'span';
			}
			if ( edit ) {
				if ( val === fld.default ) {
					val = `<${fld.tag} class="default">${val}</${fld.tag}>`;
				}
				val =
					`<${fld.tag} contentEditable="true" title="${c2e}" data-caxtonEditableProp="${fld.id}">${val}</${fld.tag}>`;
			} else {
				if ( val ) {
					val = `<${fld.tag}>${val}</${fld.tag}>`;
				}
			}

			return val;
		}

		populateField_overlay( val, f ) {
			return '1';
		}

		populateField_background( val, f ) {
			return '1';
		}

		populateFields( html, editing ) {
			if ( ! html ) {
				return '';
			}
			for ( let f in this.fields ) {
				if ( this.fields.hasOwnProperty( f ) ) {
					let _val;
					const fld = this.fields[ f ];
					let val = _val = this.attrs[fld.id];

					if ( typeof this[ 'populateField_' + fld.type ] === 'function' ) {
						val = this[ 'populateField_' + fld.type ]( val, fld, editing )
					}

					if ( ( val || typeof val === 'number' ) && fld.tpl ) {
						val = this.callbackValue( fld.tpl, val ).replace( /%s/g, val );
					}
					html = html.split( `{{_${fld.id}}}` ).join( _val );
					html = html.split( `{{${fld.id}}}` ).join( val );
				}
			}

			return html;
		}

		parseTpl( html, editing ) {
			html = this.populateFields( html, editing );
			return this.populateFields( html, editing );
		}

		outputHTML( html, editing ) {
			return { __html: this.parseTpl( html, editing ) };
		}

		callbackValue( tpl, payload ) {
			return typeof tpl === 'function' ? tpl( payload, this ) : tpl;
		}

		editableTpl(props, tpl, elProps = {} ) {
			const that = this;
			tpl = this.callbackValue( tpl, props );

			elProps = copyObj( {
				key: 'block',
				dangerouslySetInnerHTML: that.outputHTML( tpl, 'edit' ),
				onClick( e ) {
					e.preventDefault();
				},
				onKeyDown( {target} ) {
					const $def = $( target ).find( '.default' );
					if ( $def.length ) $def.remove();
				},
				onBlur( {target} ) {
					const $t = $( target );
					const attrs = {};
					const prop = $t.attr( 'data-caxtonEditableProp' );
					attrs[prop] = $t.html();
					that.focussedProps.setAttributes( attrs );
				},
			}, elProps );

			return el( 'div', elProps );
		}

		edit(props) {
			let that = this;
			if ( that.block ) {
				if ( typeof that.block.edit === 'function' ) {
					return that.block.edit( props, that );
				}
				return this.editableTpl( props, this.tpl );
			}
		}

		save(props) {
			const id = this.block.id;
			if ( this.block ) {
				if ( typeof this.block.save === 'function' ) {
					return this.block.save( props, this );
				}
				return el( 'div', {dangerouslySetInnerHTML: this.outputHTML( this.callbackValue( this.tpl, props ) )} );
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
				block.icon = html2el( $icon.html(), props, 'svg' );
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

				let content = that.edit( props );

				if ( that.block.resizable ) {
					content = that.resizableElement( that.block.resizable, content );
				}
				els.push( content );

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

			if ( 'undefined' !== typeof block.apiUrl ) {
				if ( 'function' !== typeof block.apiUrl ) {
					block.apiUrl = () => ( {apiData: block.apiUrl,} );
				}
				if ( 'function' === typeof block.apiCallback ) {
					that.block.edit = block.apiCallback;
				}

				const APIWrapper = function ( props ) {
					const [_apiData, setApiData] = wp.element.useState( '{}' );
					let
						apiData = JSON.parse( _apiData ),
						urls = block.apiUrl( props );

					for ( const dataKey in urls ) {
						if ( urls.hasOwnProperty( dataKey ) ) {
							if ( ! apiData[dataKey] || urls[dataKey] !== apiData[dataKey].path ) {
								apiData[dataKey] = {};
								wp.apiFetch( {path: urls[dataKey]} ).then( data => {
									if ( apiData[dataKey].data !== data ) {
										apiData[dataKey].data = data;
										apiData[dataKey].path = urls[dataKey];
										setApiData( JSON.stringify( apiData ) );
									}
								} );
							}
						}
					}

					return editCallback( copyObj( { ...props }, apiData ) );
				};

				registerBlockProps.edit = APIWrapper;
				if ( typeof this.block.save !== 'function' ) {
					registerBlockProps.save = () => null;
				}
			}

			if ( -1 === block.id.indexOf( '/' ) ) {
				block.id = `caxton/${block.id}`;
			}

			registerBlockType( block.id, registerBlockProps );
		}
	}

	CxB.prototype.orderedselectFieldEl = CxB.prototype.orderedSelectFieldEl;

	// endregion Register block

	window.CaxtonBlock = block => new CxB( block );


	window.CaxtonContentBlock = function ( block ) {
		const args = Caxton.copyObj( {
			tag        : 'div',
			props      : {},
			tplProps   : {},
			innerProps : {classname: 'caxton-content-wrapper'},
			prefix     : '',
			prefixProps: {},
			suffix     : '',
			suffixProps: {},
			template   : [],
		}, block );

		const knownProps = [
			'tag',
			'props',
			'innerProps',
			'template',
			'prefix',
			'prefixProps',
			'tplProps',
			'suffix',
			'suffixProps',
		];

		for ( var i = 0; i < knownProps.length; i ++ ) {
			const prop = knownProps[i];
			delete block[prop];
		}

		block.edit = function ( props, block ) {
			const processVal = val => block.callbackValue( val, props );
			return el(
				args.tag,
				processVal( args.props ),
				args.prefix && block.editableTpl( props, processVal( args.prefix ), processVal( args.prefixProps ) ),
				args.tpl && block.editableTpl( props, processVal( args.tpl ), processVal( args.tplProps ) ),
				el ( 'div',
					processVal( args.innerProps ),
					el( editor.InnerBlocks, {template: args.template} )
				),
				args.suffix && block.editableTpl( props, processVal( args.suffix ), processVal( args.suffixProps ) )
			);
		};

		block.save = function ( props, block ) {
			const processVal = val => block.callbackValue( val, props );

			return el(
				args.tag,
				block.callbackValue( args.props ),
				args.prefix && html2el( block.outputHTML( processVal( args.prefix ) ), processVal( args.prefixProps ) ),
				args.tpl && html2el( block.outputHTML( processVal( args.tpl ) ), processVal( args.tplProps ) ),
				el ( 'div',
					processVal( args.innerProps ),
					el( editor.InnerBlocks.Content )
				),
				args.suffix && html2el( block.outputHTML( processVal( args.suffix ) ), processVal( args.suffixProps ) )
			);
		};

		return new CxB( block );
	};

	window.caxtonRegisterFieldType = ( name, callback ) => {
	};

	window.Caxton = {
		el,
		el2html,
		html2el,
		copyObj,
		styleObject,
		tplProc    : processTemplate,
		iconSvg    : getFAIconSvg,
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

setTimeout( function() {
	CaxtonUtils.asset( 'icons-data.js' );
	CaxtonUtils.asset( 'icons-svg.js' );
}, 2500 );