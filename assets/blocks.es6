import { CaxtonLayoutBlocksSetup } from './layout-blocks/layout-blocks.es6';

/**
 * Plugin front end scripts
 *
 * @package Caxton
 * @version 1.0.0
 */
(
	((
		$,
		blocks,
		el,
		i18n,
		{SelectControl, TextControl, ToggleControl, RangeControl}
	) => {
		const createBlock = blocks.createBlock;
		const InspectorControls = caxtonWPEditor.InspectorControls;
		const __ = i18n.__;

		CaxtonLayoutBlocksSetup( $, wp );

		CaxtonBlock( {
			id: 'hero',
			title: 'Cover with button',
			icon: 'archive',
			category: 'caxton',
			tpl:
				'<div class="cover bg-center{{Full width}}" style="background-image:url({{Background image}});{{Background parallax}}">' +
				'<div class="pv4 min-h-7 dt w-100 center-mid-children {{Dim image}}{{Full height}}">' +
				'<div class="tc white ph3 ph4-l{{Text position}}">' +
				'<h2 style="color:{{Title color}};font-size:{{Title size}}px">{{Title}}</h2>' +
				'<div style="margin: 0 1em 1em;color:{{Sub-title color}};font-size:{{Sub-title size}}px">{{Sub-title}}</div>' +
				'<a href="{{Button Link}}" class="no-underline tc {{Buttons style}} pa2" ' +
				'style="color:{{Button text color}};background:{{Button background color}};font-size:{{Button size}}px">' +
				'{{Call to action button}}</a></div></div></div>',
			fields: {
				'Background image': 'image',
				'Dim image': {
					type: 'radio',
					options: [
						{value: ' bg-white-50', label: 'Lighter',},
						{value: ' bg-white-30', label: 'Light',},
						{value: ' ', label: "Don't dim",},
						{value: ' bg-black-20', label: 'Dark',},
						{value: ' bg-black-40', label: 'Darker',},
					],
					default: ' bg-black-20',
				},
				'Text position': {
					type: 'radio',
					options: [
						{value: ' mba', label: 'Top',},
						{value: ' mva', label: 'Center',},
						{value: ' mta', label: 'Bottom',},
					],
					default: ' mva',
				},
				'Background parallax': {
					type: 'toggle',
					value: 'background-attachment:fixed;',
				},
				'Full width': {
					type: 'toggle',
					value: ' vw-100',
				},
				'Full height': {
					type: 'toggle',
					value: ' min-vh-100',
				},
				'Title': {
					type: 'editable',
					default: 'Click here to edit title'
				},
				'Title color': {
					type: 'color',
					default: '#fff'
				},
				'Title size': {
					type: 'range',
					default: '20'
				},
				'Sub-title': {
					type: 'editable',
					default: 'Edit sub-title'
				},
				'Sub-title color': {
					type: 'color',
					default: '#fff'
				},
				'Sub-title size': {
					type: 'range',
					default: '16'
				},
				'Call to action button': {
					type: 'editable',
					default: 'Button'
				},
				'Button Link': {
					type: 'text',
					default: '#'
				},
				'Button size': {
					type: 'range',
					default: '16'
				},
				'Button text color': {
					type: 'color',
					default: '#444'
				},
				'Button background color': {
					type: 'color',
					default: '#eee'
				},
				'Buttons style': {
					type: 'radio',
					options: [
						{value: 'br0', label: 'Boxed corners',},
						{value: 'br3', label: "Rounded corners",},
						{value: 'ph3 br-pill', label: 'Pill',},
					],
					default: 'br2',
				},
			},
		} );

		CaxtonBlock( {
			id: 'social-share-icons',
			title: 'Social share icons',
			icon: 'admin-links',
			category: 'caxton',
			tpl:
				'<div class="pv4 ph2 {{All caps}} tc-l">\n' +
				'<a class="no-underline white-80 hover-white inline-flex items-center ma2 tc {{Buttons style}} pa2" href="https://www.facebook.com/sharer/sharer.php?u={{Share URL}}" title="Facebook" style="background-color:#3b5998">' +
				'<svg class="dib h2 w2" fill="currentColor" enable-background="new 0 0 470.513 470.513" version="1.1" viewBox="0 0 470.51 470.51" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m271.52 154.17v-40.541c0-6.086 0.28-10.8 0.849-14.13 0.567-3.335 1.857-6.615 3.859-9.853 1.999-3.236 5.236-5.47 9.706-6.708 4.476-1.24 10.424-1.858 17.85-1.858h40.539v-81.08h-64.809c-37.5 0-64.433 8.897-80.803 26.691-16.368 17.798-24.551 44.014-24.551 78.658v48.82h-48.542v81.086h48.539v235.26h97.362v-235.26h64.805l8.566-81.086h-73.37z"/></svg>' +
				'<span class="f6 ml2">Facebook</span>' +
				'</a>' +
				'<a class="no-underline white-80 hover-white inline-flex items-center ma2 tc {{Buttons style}} {{All caps}} pa2" href="http://pinterest.com/pin/create/bookmarklet/?media=&url={{Share URL}}" title="Pinterest" style="background-color:#bd081c">' +
				'<svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title id="simpleicons-pinterest-icon">Pinterest icon</title><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>' +
				'<span class="f6 ml2">Pinterest</span>' +
				'</a>' +
				'<a class="no-underline white-80 hover-white inline-flex items-center ma2 tc {{Buttons style}} {{All caps}} pa2" href="http://twitter.com/share?url={{Share URL}}" title="Twitter" style="background-color:#1da1f2">' +
				'<svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.375-1.337.648-2.085.795-.598-.638-1.45-1.036-2.396-1.036-1.812 0-3.282 1.468-3.282 3.28 0 .258.03.51.085.75C5.152 5.39 2.733 4.084 1.114 2.1.83 2.583.67 3.147.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.416-.02-.617-.058.418 1.304 1.63 2.253 3.067 2.28-1.124.88-2.54 1.404-4.077 1.404-.265 0-.526-.015-.783-.045 1.453.93 3.178 1.474 5.032 1.474 6.038 0 9.34-5 9.34-9.338 0-.143-.004-.284-.01-.425.64-.463 1.198-1.04 1.638-1.7z" fill-rule="nonzero"/></svg>' +
				'<span class="f6 ml2">Twitter</span>' +
				'</a>' +
				'<a class="no-underline white-80 hover-white inline-flex items-center ma2 tc {{Buttons style}} {{All caps}} pa2" href="mailto:?body={{Share URL}}" title="Mail" style="background-color:#ea4335">' +
				'<svg class="dib h2 w2" fill="currentColor" enable-background="new 0 0 511.626 511.626" version="1.1" viewBox="0 0 511.63 511.63" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m49.106 178.73c6.472 4.567 25.981 18.131 58.528 40.685 32.548 22.554 57.482 39.92 74.803 52.099 1.903 1.335 5.946 4.237 12.131 8.71 6.186 4.476 11.326 8.093 15.416 10.852 4.093 2.758 9.041 5.852 14.849 9.277 5.806 3.422 11.279 5.996 16.418 7.7 5.14 1.718 9.898 2.569 14.275 2.569h0.575c4.377 0 9.137-0.852 14.277-2.569 5.137-1.704 10.615-4.281 16.416-7.7 5.804-3.429 10.752-6.52 14.845-9.277 4.093-2.759 9.229-6.376 15.417-10.852 6.184-4.477 10.232-7.375 12.135-8.71 17.508-12.179 62.051-43.11 133.62-92.79 13.894-9.703 25.502-21.411 34.827-35.116 9.332-13.699 13.993-28.07 13.993-43.105 0-12.564-4.523-23.319-13.565-32.264-9.041-8.947-19.749-13.418-32.117-13.418h-420.26c-14.655 0-25.933 4.948-33.832 14.844-7.898 9.898-11.847 22.27-11.847 37.115 0 11.991 5.236 24.985 15.703 38.974 10.466 13.99 21.604 24.983 33.403 32.976z"/><path d="m483.07 209.28c-62.424 42.251-109.82 75.087-142.18 98.501-10.849 7.991-19.65 14.229-26.409 18.699-6.759 4.473-15.748 9.041-26.98 13.702-11.228 4.668-21.692 6.995-31.401 6.995h-0.578c-9.707 0-20.177-2.327-31.405-6.995-11.228-4.661-20.223-9.229-26.98-13.702-6.755-4.47-15.559-10.708-26.407-18.699-25.697-18.842-72.995-51.68-141.9-98.501-10.852-7.228-20.464-15.513-28.839-24.838v226.68c0 12.57 4.471 23.319 13.418 32.265 8.945 8.949 19.701 13.422 32.264 13.422h420.27c12.56 0 23.315-4.473 32.261-13.422 8.949-8.949 13.418-19.694 13.418-32.265v-226.68c-8.186 9.132-17.7 17.417-28.555 24.838z"/></svg>' +
				'<span class="f6 ml2">Mail</span>' +
				'</a>' +
				'</ul>',
			fields: {
				'Share URL': {
					type: 'text',
					help: "Please specify a url for users to share",
					default: ''
				},
				'All caps': {
					type: 'toggle',
					value: 'ttu',
				},
				'Buttons style': {
					type: 'radio',
					options: [
						{value: 'br0', label: 'Boxed corners',},
						{value: 'br3', label: "Rounded corners",},
						{value: 'ph3 br-pill', label: 'Pill',},
					],
					default: 'br2',
				},
			},
		} );

		CaxtonBlock( {
			id: 'super-text',
			title: 'Super Text',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g><path d="M18 3v2H2V3h16zm-6 4v2H2V7h10zm6 0v2h-4V7h4zM8 11v2H2v-2h6zm10 0v2h-8v-2h8zm-4 4v2H2v-2h12z"/></g></svg>',
			category: 'caxton',
			tpl: '<{{Element Tag}} class="{{Alignment}}" ' +
					 'style="{{Letter Spacing}}{{Margin top}}{{Margin bottom}}{{Inner Padding}}{{Left/right Inner Padding}}{{Weight}}{{Font}}{{Text color}}{{Background color}}{{Font size}}{{Line height}}{{Text Glow/Shadow}}" ' +
					 'data-mobile-css="{{Font size mobile}}" ' +
					 'data-tablet-css="{{Font size tablet}}" ' +
					 'data-desktop-css="{{Font size}}">' +
					 '<span class="{{Lines as wide as content}}">{{Overline}}{{Text}}{{Underline}}</span>' +
					 '</{{Element Tag}}>',
			transforms: {
				from: [
					{
						type: 'block',
						blocks: ['core/paragraph'],
						transform({content}) {
							return createBlock( 'caxton/super-text', {
								Text: Caxton.el2html( content ),
							} );
						},
					},
					{
						type: 'block',
						blocks: ['core/heading'],
						transform({content, nodeName}) {
							return createBlock( 'caxton/super-text', {
								Text: Caxton.el2html( content ),
								'Element Tag': nodeName.toLowerCase(),
							} );
						},
					},
					{
						type: 'block',
						blocks: ['core/subhead'],
						transform({content}) {
							return createBlock( 'caxton/super-text', {
								Text: Caxton.el2html( content ),
							} );
						},
					},
				],
			},
			toolbars: {
				Alignment: 'AlignmentToolbar',
			},
			fields: {
				'Text': {
					type: 'editable',
					default: 'Click here to edit text'
				},
				'Element Tag': {
					type: 'radio',
					section: 'Layout',
					options: [
						{value: 'p', label: 'Paragraph',},
						{value: 'h1', label: 'Heading 1',},
						{value: 'h2', label: 'Heading 2',},
						{value: 'h3', label: 'Heading 3',},
						{value: 'h4', label: 'Heading 4',},
						{value: 'h5', label: 'Heading 5',},
						{value: 'h6', label: 'Heading 6',},
						{value: 'div', label: 'Normal div',},
					],
					default: 'p',

				},
				'Background color': {
					type: 'color',
					tpl: 'background-color:%s;',
					section: 'Layout',
				},

				'Font': {
					type: 'font',
					tpl: 'font-family:%s;',
					section: 'Typography',
				},
				'Letter Spacing': {
					type: 'range',
					max: 25,
					min: -5,
					tpl: 'letter-spacing:%spx;',
					section: 'Typography',
				},
				'Font size': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
					section: 'Typography',
				},
				'Line height': {
					type: 'range',
					min: .5,
					max: 5,
					step: .1,
					tpl: 'line-height:%s;',
					section: 'Typography',
				},
				'Font size tablet': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
					section: 'Typography',
				},
				'Font size mobile': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
					section: 'Typography',
				},
				'Weight': {
					type: 'range',
					min: 100,
					max: 900,
					step: 100,
					default: 400,
					help: 'Effect of weight depends on support by selected font.',
					tpl: 'font-weight:%s;',
					section: 'Typography',
				},
				'Text color': {
					type: 'color',
					default: '#555',
					tpl: 'color:%s;',
					section: 'Typography',
				},

				'Overline': {
					type: 'select',
					options: [
						{
							value: '',
							label: 'None',
						},
						{
							value: '<div style="border-bottom: 2px dotted {{Line color}};margin-bottom:{{Line spacing}};"></div>',
							label: 'Dotted',
						},
						{
							value: '<div style="border-bottom: 2px dashed {{Line color}};margin-bottom:{{Line spacing}};"></div>',
							label: 'Dashed',
						},
						{
							value: '<div style="border-bottom: 1px solid {{Line color}};margin-bottom:{{Line spacing}};"></div>',
							label: 'Thin',
						},
						{
							value: '<div style="padding:1px;border-top: 1px solid {{Line color}};border-bottom: 1px solid {{Line color}};margin-bottom:{{Line spacing}};"></div>',
							label: 'Thin + Thin',
						},
						{
							value: '<div style="padding:1px;border-top: 1px solid {{Line color}};border-bottom: 2px solid {{Line color}};margin-bottom:{{Line spacing}};"></div>',
							label: 'Thin + Thick',
						},
						{
							value: '<div style="padding:1px;border-top: 2px solid {{Line color}};border-bottom: 1px solid {{Line color}};margin-bottom:{{Line spacing}};"></div>',
							label: 'Thick + Thin',
						},
						{
							value: '<div style="border-bottom: 2px solid {{Line color}};margin-bottom:{{Line spacing}};"></div>',
							label: 'Thick',
						},
					],
					section: 'Underline & Overline',
				},
				'Underline': {
					type: 'select',
					options: [
						{
							value: '',
							label: 'None',
						},
						{
							value: '<div style="border-bottom: 2px dotted {{Line color}};margin-top:{{Line spacing}};"></div>',
							label: 'Dotted',
						},
						{
							value: '<div style="border-bottom: 2px dashed {{Line color}};margin-top:{{Line spacing}};"></div>',
							label: 'Dashed',
						},
						{
							value: '<div style="border-bottom: 1px solid {{Line color}};margin-top:{{Line spacing}};"></div>',
							label: 'Thin',
						},
						{
							value: '<div style="padding:1px;border-top: 1px solid {{Line color}};border-bottom: 1px solid {{Line color}};margin-top:{{Line spacing}};"></div>',
							label: 'Thin + Thin',
						},
						{
							value: '<div style="padding:1px;border-top: 1px solid {{Line color}};border-bottom: 2px solid {{Line color}};margin-top:{{Line spacing}};"></div>',
							label: 'Thin + Thick',
						},
						{
							value: '<div style="padding:1px;border-top: 2px solid {{Line color}};border-bottom: 1px solid {{Line color}};margin-top:{{Line spacing}};"></div>',
							label: 'Thick + Thin',
						},
						{
							value: '<div style="border-bottom: 2px solid {{Line color}};margin-top:{{Line spacing}};"></div>',
							label: 'Thick',
						},
					],
					section: 'Underline & Overline',
				},
				'Lines as wide as content': {
					type: 'toggle',
					value: ' dib',
					section: 'Underline & Overline',
				},
				'Line color': {
					type: 'color',
					section: 'Underline & Overline',
				},
				'Line spacing': {
					type: 'range',
					min: -.5,
					max: 2.5,
					step: .1,
					tpl: '%sem;',
					section: 'Underline & Overline',
				},

				'Text Glow/Shadow': {
					type: 'select',
					options: [
						{value: '', label: 'No shadow/glow',},
						{value: '255,255,255', label: 'Glow',},
						{value: '0,0,0', label: 'Shadow',},
					],
					section: 'Glow/Shadow',
					tpl: 'text-shadow:{{Shadow position}} {{Shadow Blur}} rgba(%s,{{Shadow Strength}});',
				},
				'Shadow position': {
					type: 'select',
					options: [
						{value: 'calc( -2px + -.05em ) calc( 2px + .03em )', label: 'Far Left',},
						{value: 'calc( -1px + -.03em ) calc( 1px + .01em )', label: 'Left',},
						{value: '0 0', label: 'Center',},
						{value: 'calc( 1px + .03em ) calc( 1px + .01em )', label: 'Right',},
						{value: 'calc( 2px + .05em ) calc( 2px + .03em )', label: 'Far Right',},
					],
					default: '0 0',
					section: 'Glow/Shadow',
				},
				'Shadow Blur': {
					type: 'range',
					tpl: '%spx ',
					default: 3,
					max: 25,
					section: 'Glow/Shadow',
				},
				'Shadow Strength': {
					type: 'range',
					min: .1,
					step: .1,
					default: .1,
					max: 1,
					section: 'Glow/Shadow',
				},

				'Margin top': {
					type: 'range',
					section: 'Margin/Padding',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-top:%sem;',
				},
				'Margin bottom': {
					type: 'range',
					section: 'Margin/Padding',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-bottom:%sem;',
				},
				'Inner Padding': {
					type: 'range',
					section: 'Margin/Padding',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'padding:%sem calc( .5em + %sem );',
				},
				'Left/right Inner Padding': {
					type: 'range',
					section: 'Margin/Padding',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'padding-left:%sem;padding-right:%sem;',
				},
			},
		} );

		CaxtonBlock( {
			id: 'super-button',
			title: 'Button',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M17 5H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm1 7c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v5z"></path></svg>',
			category: 'caxton',
			tpl: '<div class="{{Alignment}}{{BlockAlignment}}" style="{{Margin top}}{{Margin bottom}}">' +
					 '<a class="caxton-btn no-underline dib {{Text Glow/Shadow}}" href="{{URL}}" ' +
					 'data-hover-css="{{Hover Text color}}{{Hover Background color}}{{Hover Border color}}" ' +
					 'style="{{Letter Spacing}}{{Weight}}{{Font}}{{Text color}}{{Background color}}{{Button size}}' +
					 'border:{{Border weight}} solid {{Border color}};' +
					 'padding:{{Inner Padding top/bottom}} {{Inner Padding left/right}};{{Rounded Corners}}' +
					 '{{Button Glow/Shadow}};" ' +
					 'data-mobile-css="{{Font size mobile}}" ' +
					 'data-tablet-css="{{Font size tablet}}" ' +
					 'data-desktop-css="{{Button size}}">' +
					 '{{Icon before text}}{{Text}}{{Icon after text}}' +
					 '</a></div>',
			transforms: {
				from: [
					{
						type: 'block',
						blocks: ['core/button'],
						transform({text, url, textColor, color}) {
							return createBlock( 'caxton/super-button', {
								Text: Caxton.el2html( text ),
								URL: url,
								'Text color': textColor,
								'Background color': color,
							} );
						},
					},
				],
			},
			toolbars: {
				Alignment: 'AlignmentToolbar',
				BlockAlignment: 'BlockAlignToolbar',
			},
			fields: {
				'Text': {
					type: 'editable',
					default: 'Click here to edit text'
				},
				'URL': {
					type: 'text',
					default: '#'
				},
				'Text color': {
					type: 'color',
					default: '#555',
					tpl: 'color:%s;',
				},
				'Background color': {
					type: 'color',
					tpl: 'background-color:%s;',
				},
				'Button size': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
				},

				'Font': {
					type: 'font',
					tpl: 'font-family:%s;',
					section: 'Typography',
				},
				'Letter Spacing': {
					type: 'range',
					max: 25,
					min: -5,
					default: 2,
					tpl: 'letter-spacing:%spx;',
					section: 'Typography',
				},
				'Font size tablet': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
					section: 'Typography',
				},
				'Font size mobile': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
					section: 'Typography',
				},
				'Weight': {
					type: 'range',
					min: 100,
					max: 800,
					step: 100,
					default: 400,
					help: 'Effect of weight depends on support by selected font.',
					tpl: 'font-weight:%s;',
					section: 'Typography',
				},

				'Inner Padding left/right': {
					type: 'range',
					section: 'Margin/Padding',
					min: 0,
					default: 1,
					max: 5,
					step: 0.05,
					tpl: '%sem',
				},

				'Inner Padding top/bottom': {
					type: 'range',
					section: 'Margin/Padding',
					min: 0,
					default: .5,
					max: 5,
					step: 0.05,
					tpl: '%sem',
				},
				'Margin top': {
					type: 'range',
					section: 'Margin/Padding',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-top:%sem;',
				},
				'Margin bottom': {
					type: 'range',
					section: 'Margin/Padding',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-bottom:%sem;',
				},

				'Border color': {
					type: 'color',
					section: 'Border',
				},
				'Border weight': {
					type: 'range',
					min: 0,
					default: 2,
					max: 50,
					tpl: '%spx ',
					section: 'Border',
				},
				'Rounded Corners': {
					type: 'range',
					section: 'Border',
					min: 0,
					max: 50,
					tpl: 'border-radius:%spx;',
				},

				'Icons color': {
					type: 'color',
					tpl: 'color:%s;',
					section: 'Button icons',
				},
				'Icons size': {
					type: 'slider',
					min: 0.2,
					max: 5,
					step: 0.2,
					tpl: 'font-size:%sem;',
					section: 'Button icons',
				},
				'Icon before text': {
					type: 'icon',
					tpl: function( icon ) {
						if ( icon.indexOf( '<svg' ) === -1 ) {
							return '<i class="%s" class="{{Icons size}}{{Icons color}}"></i>';
						}
						return '<i class="caxton-icon" style="{{Icons size}}{{Icons color}}">%s</i>';
					},
					section: 'Button icons',
				},
				'Icon after text': {
					type: 'icon',
					tpl: function( icon ) {
						if ( icon.indexOf( '<svg' ) === -1 ) {
							return '<i class="%s" class="{{Icons size}}{{Icons color}}"></i>';
						}
						return '<i class="caxton-icon" style="{{Icons size}}{{Icons color}}">%s</i>';
					},
					section: 'Button icons',
				},

				'Hover Text color': {
					type: 'color',
					default: '#555',
					tpl: 'color:%s;',
					section: 'Hover Colors',
				},
				'Hover Background color': {
					type: 'color',
					tpl: 'background-color:%s;',
					section: 'Hover Colors',
				},
				'Hover Border color': {
					type: 'color',
					section: 'Hover Colors',
					tpl: 'border-color:%s;',
				},

				'Text Glow/Shadow': {
					type: 'select',
					options: [
						{value: '', label: 'None',},
						{value: ' text-glow', label: 'Glow',},
						{value: ' text-shadow', label: 'Shadow',},
					],
					section: 'Button Glow/Shadow',
				},
				'Button Glow/Shadow': {
					type: 'select',
					options: [
						{value: '', label: 'No shadow/glow',},
						{value: '255,255,255', label: 'Glow',},
						{value: '0,0,0', label: 'Shadow',},
					],
					section: 'Button Glow/Shadow',
					tpl: 'box-shadow:{{Shadow position}} {{Blur}} {{Spread}} rgba(%s,{{Strength}});',
				},
				'Shadow position': {
					type: 'select',
					options: [
						{value: 'calc( -2px + -.05em ) calc( 2px + .03em )', label: 'Far Left',},
						{value: 'calc( -1px + -.03em ) calc( 1px + .01em )', label: 'Left',},
						{value: '0 0', label: 'Center',},
						{value: 'calc( 1px + .03em ) calc( 1px + .01em )', label: 'Right',},
						{value: 'calc( 2px + .05em ) calc( 2px + .03em )', label: 'Far Right',},
					],
					default: '0 0',
					section: 'Button Glow/Shadow',
				},
				'Spread': {
					type: 'range',
					tpl: '%spx',
					default: 2,
					max: 25,
					section: 'Button Glow/Shadow',
				},
				'Blur': {
					type: 'range',
					tpl: '%spx',
					default: 8,
					max: 25,
					section: 'Button Glow/Shadow',
				},
				'Strength': {
					type: 'range',
					min: .1,
					step: .1,
					default: .2,
					max: 1,
					section: 'Button Glow/Shadow',
				},

			},
		} );
		CaxtonBlock( {
			id: 'super-icon',
			title: 'Icon',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M211.7 241.1v51.7c0 2.1-1.6 3.7-3.7 3.7h-22.2c-2.1 0-3.7-1.6-3.7-3.7v-51.7c0-2.1 1.6-3.7 3.7-3.7H208c2.1 0 3.7 1.6 3.7 3.7zm114.5-3.7H304c-2.1 0-3.7 1.6-3.7 3.7v51.7c0 2.1 1.6 3.7 3.7 3.7h22.2c2.1 0 3.7-1.6 3.7-3.7v-51.7c-.1-2.1-1.7-3.7-3.7-3.7zm-29.1 263.2c-.9.1-1.7.3-2.6.4-1 .2-2.1.3-3.1.5-.9.1-1.8.3-2.8.4-1 .1-2 .3-3 .4-1 .1-2 .2-2.9.3-1 .1-1.9.2-2.9.3-1 .1-2.1.2-3.1.3-.9.1-1.8.2-2.7.2-1.1.1-2.3.1-3.4.2-.8 0-1.7.1-2.5.1-1.3.1-2.6.1-3.9.1-.7 0-1.4.1-2.1.1-2 0-4 .1-6 .1s-4 0-6-.1c-.7 0-1.4 0-2.1-.1-1.3 0-2.6-.1-3.9-.1-.8 0-1.7-.1-2.5-.1-1.1-.1-2.3-.1-3.4-.2-.9-.1-1.8-.1-2.7-.2-1-.1-2.1-.2-3.1-.3-1-.1-1.9-.2-2.9-.3-1-.1-2-.2-2.9-.3-1-.1-2-.2-3-.4-.9-.1-1.8-.3-2.8-.4-1-.1-2.1-.3-3.1-.5-.9-.1-1.7-.3-2.6-.4-65.6-10.9-122.5-47.7-160-99.4-.2-.2-.3-.5-.5-.7-.8-1.1-1.6-2.2-2.3-3.3-.3-.4-.6-.8-.8-1.2-.7-1.1-1.4-2.1-2.1-3.2-.3-.5-.6-.9-.9-1.4-.7-1.1-1.4-2.1-2-3.2-.3-.5-.6-.9-.9-1.4-.7-1.1-1.3-2.2-2-3.3-.2-.4-.5-.8-.7-1.2-2.4-4-4.6-8.1-6.8-12.2-.1-.2-.2-.3-.3-.5-.6-1.1-1.1-2.2-1.7-3.3-.3-.6-.6-1.1-.8-1.7-.5-1-1-2.1-1.5-3.1-.3-.7-.6-1.3-.9-2-.5-1-.9-2-1.4-3l-.9-2.1c-.4-1-.9-2-1.3-3-.3-.7-.6-1.5-.9-2.2l-1.2-3c-.3-.8-.6-1.5-.9-2.3-.4-1-.8-2-1.1-3-.3-.9-.6-1.8-1-2.8-.6-1.6-1.1-3.3-1.7-4.9-.3-.9-.6-1.8-.9-2.8-.3-.9-.5-1.8-.8-2.7-.3-.9-.6-1.9-.8-2.8-.3-.9-.5-1.8-.8-2.7-.3-1-.5-1.9-.8-2.9-.2-.9-.5-1.8-.7-2.7-.3-1-.5-2-.7-3-.2-.9-.4-1.7-.6-2.6-.2-1.1-.5-2.2-.7-3.2-.2-.8-.3-1.6-.5-2.4-.3-1.3-.5-2.7-.8-4-.1-.6-.2-1.1-.3-1.7l-.9-5.7c-.1-.6-.2-1.3-.3-1.9-.2-1.3-.4-2.6-.5-3.9-.1-.8-.2-1.5-.3-2.3-.1-1.2-.3-2.4-.4-3.6-.1-.8-.2-1.6-.2-2.4-.1-1.2-.2-2.4-.3-3.5-.1-.8-.1-1.6-.2-2.4-.1-1.2-.2-2.4-.2-3.7 0-.8-.1-1.5-.1-2.3-.1-1.3-.1-2.7-.2-4 0-.7 0-1.3-.1-2 0-2-.1-4-.1-6 0-53.5 16.9-103 45.8-143.6 2.3-3.2 4.7-6.4 7.1-9.5 4.9-6.2 10.1-12.3 15.6-18 2.7-2.9 5.5-5.7 8.4-8.4 2.9-2.7 5.8-5.4 8.8-8 4.5-3.9 9.1-7.6 13.9-11.2 1.6-1.2 3.2-2.4 4.8-3.5C140 34.2 171.7 20.1 206 13c16.1-3.3 32.9-5 50-5s33.8 1.7 50 5c34.3 7 66 21.1 93.6 40.7 1.6 1.2 3.2 2.3 4.8 3.5 4.8 3.6 9.4 7.3 13.9 11.2 12 10.4 23 21.9 32.8 34.4 2.5 3.1 4.8 6.3 7.1 9.5C487.1 153 504 202.5 504 256c0 2 0 4-.1 6 0 .7 0 1.3-.1 2 0 1.3-.1 2.7-.2 4 0 .8-.1 1.5-.1 2.3-.1 1.2-.1 2.4-.2.7-.1.8-.1 1.6-.2 2.4-.1 1.2-.2 2.4-.3 3.5-.1.8-.2 1.6-.2 2.4-.1 1.2-.3 2.4-.4 3.6-.1.8-.2 1.5-.3 2.3-.2 1.3-.4 2.6-.5 3.9-.1.6-.2 1.3-.3 1.9l-.9 5.7c-.1.6-.2 1.1-.3 1.7-.2 1.3-.5 2.7-.8 4-.2.8-.3 1.6-.5 2.4-.2 1.1-.5 2.2-.7 3.2-.2.9-.4 1.7-.6 2.6-.2 1-.5 2-.7 3-.2.9-.5 1.8-.7 2.7-.3 1-.5 1.9-.8 2.9-.2.9-.5 1.8-.8 2.7-.3.9-.6 1.9-.8 2.8-.3.9-.5 1.8-.8 2.7-.3.9-.6 1.8-.9 2.8-.5 1.6-1.1 3.3-1.7 4.9-.3.9-.6 1.8-1 2.8-.4 1-.7 2-1.1 3-.3.8-.6 1.5-.9 2.3l-1.2 3c-.3.7-.6 1.5-.9 2.2-.4 1-.8 2-1.3 3l-.9 2.1c-.4 1-.9 2-1.4 3-.3.7-.6 1.3-.9 2-.5 1-1 2.1-1.5 3.1-.3.6-.6 1.1-.8 1.7-.6 1.1-1.1 2.2-1.7 3.3-.1.2-.2.3-.3.5-2.2 4.1-4.4 8.2-6.8 12.2-.2.4-.5.8-.7 1.2-.7 1.1-1.3 2.2-2 3.3-.3.5-.6.9-.9 1.4-.7 1.1-1.4 2.1-2 3.2-.3.5-.6.9-.9 1.4-.7 1.1-1.4 2.1-2.1 3.2-.3.4-.6.8-.8 1.2-.8 1.1-1.5 2.2-2.3 3.3-.2.2-.3.5-.5.7-37.6 54.7-94.5 91.4-160.1 102.4zm117.3-86.2c13-13 24.2-27.4 33.6-42.9v-71.3c0-2.1-1.6-3.7-3.7-3.7h-22.2c-2.1 0-3.7 1.6-3.7 3.7V326h-29.5V182c0-2.1-1.6-3.7-3.7-3.7h-22.1c-2.1 0-3.7 1.6-3.7 3.7v25.9h-29.5V182c0-2.1-1.6-3.7-3.7-3.7H304c-2.1 0-3.7 1.6-3.7 3.7v25.9h-29.5V182c0-4.8-6.5-3.7-9.5-3.7v-30.7c6.7-1.6 13.8-2.8 20.8-2.8 8.8 0 16.8 3.5 25.4 3.5 3.7 0 22.4-.9 22.4-6.5V93.4c0-2.1-1.6-3.7-3.7-3.7-4.2 0-12.2 3.5-19.4 3.5-7.9 0-16.9-3.5-26.3-3.5-6.5 0-12.9.9-19.2 2.3v-3.9c4.4-2.1 7.4-6.7 7.4-11.5 0-16.8-25.4-16.8-25.4 0 0 4.8 3 9.5 7.4 11.5v90.2c-3 0-9.5-1.1-9.5 3.7v25.9h-29.5V182c0-2.1-1.6-3.7-3.7-3.7h-22.2c-2.1 0-3.7 1.6-3.7 3.7v25.9h-29.5V182c0-2.1-1.6-3.7-3.7-3.7h-22.1c-2.1 0-3.7 1.6-3.7 3.7v144H93.5v-25.8c0-2.1-1.6-3.7-3.7-3.7H67.7c-2.1 0-3.7 1.6-3.7 3.7v71.3c9.4 15.5 20.6 29.9 33.6 42.9 20.6 20.6 44.5 36.7 71.2 48 13.9 5.9 28.2 10.3 42.9 13.2v-75.8c0-58.6 88.6-58.6 88.6 0v75.8c14.7-2.9 29-7.4 42.9-13.2 26.7-11.3 50.6-27.4 71.2-48"/></svg>',
			category: 'caxton',
			tpl: function( props, block ) {
				if ( props.attributes.Icon.indexOf( '<svg' ) === -1 ) {
					return '<div class="{{Alignment}}{{BlockAlignment}}" style="{{Margin top}}{{Margin bottom}}">' +
								 '<a {{URL}} class="no-underline caxton-icon {{Glow/Shadow}}{{Icon}}" ' +
								 'data-hover-css="{{Hover icon color}}{{Hover Background color}}{{Hover Border color}}" ' +
								 'style="{{Icon color}}{{Background color}}{{Icon size}}' +
								 'border:{{Border weight}} solid {{Border color}};' +
								 '{{Inner Padding}}{{Rounded Corners}};' +
								 '{{Icon Glow/Shadow}};" ' +
								 'data-mobile-css="{{Icon size mobile}}" ' +
								 'data-tablet-css="{{Icon size tablet}}" ' +
								 'data-desktop-css="{{Icon size}}">' +
								 '<span style="display:none;">&nbsp;</span>' +
								 '</a></div>';
				}
				return '<div class="{{Alignment}}{{BlockAlignment}}" style="{{Margin top}}{{Margin bottom}}">' +
							 '<a {{URL}} class="no-underline caxton-icon {{Glow/Shadow}}" ' +
							 'data-hover-css="{{Hover icon color}}{{Hover Background color}}{{Hover Border color}}" ' +
							 'style="{{Icon color}}{{Background color}}{{Icon size}}' +
							 'border:{{Border weight}} solid {{Border color}};' +
							 '{{Inner Padding}}{{Rounded Corners}};' +
							 '{{Icon Glow/Shadow}};" ' +
							 'data-mobile-css="{{Icon size mobile}}" ' +
							 'data-tablet-css="{{Icon size tablet}}" ' +
							 'data-desktop-css="{{Icon size}}">{{Icon}}' +
							 '</a></div>';
			},
			toolbars: {
				Alignment: 'AlignmentToolbar',
				BlockAlignment: 'BlockAlignToolbar',
			},
			fields: {
				'Icon': {
					type: 'icon',
					default: ' fab fa-font-awesome-flag'
				},
				'URL': {
					help: 'Type in a URL to make icon link to it.',
					type: 'text',
					tpl: 'href="%s"',
				},
				'Icon color': {
					type: 'color',
					default: '#555',
					tpl: 'color:%s;',
				},

				'Icon size': {
					type: 'range',
					min: 5,
					max: 250,
					default: 16,
					tpl: 'font-size:%spx;',
					section: 'Icon size',
				},
				'Icon size tablet': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
					section: 'Icon size',
				},
				'Icon size mobile': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
					section: 'Icon size',
				},

				'Inner Padding': {
					type: 'range',
					section: 'Margin/Padding',
					min: 0,
					default: .25,
					max: 5,
					step: 0.05,
					tpl: 'padding:%sem;',
				},
				'Margin top': {
					type: 'range',
					section: 'Margin/Padding',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-top:%sem;',
				},
				'Margin bottom': {
					type: 'range',
					section: 'Margin/Padding',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-bottom:%sem;',
				},

				'Background color': {
					type: 'color',
					tpl: 'background-color:%s;',
					section: 'Color and decoration',
				},
				'Border color': {
					type: 'color',
					section: 'Color and decoration',
				},
				'Border weight': {
					type: 'range',
					min: 0,
					default: 2,
					max: 50,
					tpl: '%spx ',
					section: 'Color and decoration',
				},
				'Rounded Corners': {
					type: 'range',
					min: 0,
					max: 50,
					tpl: 'border-radius:%spx;',
					section: 'Color and decoration',
				},

				'Glow/Shadow': {
					type: 'select',
					options: [
						{value: '', label: 'None',},
						{value: ' glow', label: 'Glow',},
						{value: ' shadow', label: 'Shadow',},
					],
					section: 'Icon Glow/Shadow',
				},
				'Icon Glow/Shadow': {
					type: 'select',
					options: [
						{value: '', label: 'No shadow/glow',},
						{value: '255,255,255', label: 'Glow',},
						{value: '0,0,0', label: 'Shadow',},
					],
					section: 'Icon Glow/Shadow',
					tpl: 'text-shadow:{{Shadow position}} {{Shadow Blur}} rgba(%s,{{Shadow Strength}});',
				},
				'Shadow position': {
					type: 'select',
					options: [
						{value: 'calc( -2px + -.05em ) calc( 2px + .03em )', label: 'Far Left',},
						{value: 'calc( -1px + -.03em ) calc( 1px + .01em )', label: 'Left',},
						{value: '0 0', label: 'Center',},
						{value: 'calc( 1px + .03em ) calc( 1px + .01em )', label: 'Right',},
						{value: 'calc( 2px + .05em ) calc( 2px + .03em )', label: 'Far Right',},
					],
					default: '0 0',
					section: 'Icon Glow/Shadow',
				},
				'Shadow Blur': {
					type: 'range',
					tpl: '%spx ',
					default: 3,
					max: 25,
					section: 'Icon Glow/Shadow',
				},
				'Shadow Strength': {
					type: 'range',
					min: .1,
					step: .1,
					default: .1,
					max: 1,
					section: 'Icon Glow/Shadow',
				},

				'Hover icon color': {
					type: 'color',
					default: '',
					tpl: 'color:%s;',
					section: 'Hover Colors',
				},
				'Hover Background color': {
					type: 'color',
					tpl: 'background-color:%s;',
					section: 'Hover Colors',
				},
				'Hover Border color': {
					type: 'color',
					section: 'Hover Colors',
					tpl: 'border-color:%s;',
				},
			},
		} );

		CaxtonBlock( {
			id: 'slider',
			title: 'Slider',
			icon: 'slides',
			category: 'caxton',
			tpl: '<div class="caxton-slider caxton-slider-pending-setup {{Alignment}}{{BlockAlignment}}" ' +
					 'style="{{Text color}}{{Height}}{{Font size}}{{Text Glow/Shadow}};" ' +
					 'data-mobile-css="{{Font size mobile}}" ' +
					 'data-tablet-css="{{Font size tablet}}" ' +
					 'data-desktop-css="{{Font size}}">' +
					 '<ul class="slides">' +
					 '{{Slide 1 image}}' +
					 '{{Slide 2 image}}' +
					 '{{Slide 3 image}}' +
					 '{{Slide 4 image}}' +
					 '{{Slide 5 image}}' +
					 '</ul></div>',
			toolbars: {
				Alignment: 'AlignmentToolbar',
				BlockAlignment: 'BlockAlignToolbar',
			},
			afterEdit() {
				setTimeout( CaxtonUtils.flexslider, 700 );
			},
			fields: {

				'Height': {
					type: 'range',
					tpl: 'min-height:%svh;',
					min: 25,
					max: 125,
					help: 'Relative to screen height. Set to 100 to have it full height.',
					section: 'Layout',
				},
				'Slide 1 image': {
					type: 'image',
					tpl: '<li style="background-image: url(\'%s\')">' +
							 '<div class="flex-caption  header-slide-text">' +
							 '{{Slide 1 title}}{{Slide 1 text}}{{Slide 1 button text}}' +
							 '</div>' +
							 '</li>',
					section: 'Slide 1',
				},
				'Slide 1 title': {
					type: 'text',
					tpl: '<h2>%s</h2>',
					section: 'Slide 1',
				},
				'Slide 1 text': {
					type: 'textarea',
					tpl: '<p>%s</p>',
					section: 'Slide 1',
				},
				'Slide 1 button text': {
					type: 'text',
					tpl: '<a style="{{Button color}}{{Button text color}}" class="button" href="{{Slide 1 button url}}">%s</a>',
					section: 'Slide 1',
				},
				'Slide 1 button url': {
					type: 'text',
					section: 'Slide 1',
				},

				'Slide 2 image': {
					type: 'image',
					tpl: '<li style="background-image: url(\'%s\')">' +
							 '<div class="flex-caption  header-slide-text">' +
							 '{{Slide 2 title}}{{Slide 2 text}}{{Slide 2 button text}}' +
							 '</div>' +
							 '</li>',
					section: 'Slide 2',
				},
				'Slide 2 title': {
					type: 'text',
					tpl: '<h2>%s</h2>',
					section: 'Slide 2',
				},
				'Slide 2 text': {
					type: 'textarea',
					tpl: '<p>%s</p>',
					section: 'Slide 2',
				},
				'Slide 2 button text': {
					type: 'text',
					tpl: '<a style="{{Button color}}{{Button text color}}" class="button" href="{{Slide 2 button url}}">%s</a>',
					section: 'Slide 2',
				},
				'Slide 2 button url': {
					type: 'text',
					section: 'Slide 2',
				},

				'Slide 3 image': {
					type: 'image',
					tpl: '<li style="background-image: url(\'%s\')">' +
							 '<div class="flex-caption  header-slide-text">' +
							 '{{Slide 3 title}}{{Slide 3 text}}{{Slide 3 button text}}' +
							 '</div>' +
							 '</li>',
					section: 'Slide 3',
				},
				'Slide 3 title': {
					type: 'text',
					tpl: '<h2>%s</h2>',
					section: 'Slide 3',
				},
				'Slide 3 text': {
					type: 'textarea',
					tpl: '<p>%s</p>',
					section: 'Slide 3',
				},
				'Slide 3 button text': {
					type: 'text',
					tpl: '<a style="{{Button color}}{{Button text color}}" class="button" href="{{Slide 3 button url}}">%s</a>',
					section: 'Slide 3',
				},
				'Slide 3 button url': {
					type: 'text',
					section: 'Slide 3',
				},

				'Slide 4 image': {
					type: 'image',
					tpl: '<li style="background-image: url(\'%s\')">' +
							 '<div class="flex-caption  header-slide-text">' +
							 '{{Slide 4 title}}{{Slide 4 text}}{{Slide 4 button text}}' +
							 '</div>' +
							 '</li>',
					section: 'Slide 4',
				},
				'Slide 4 title': {
					type: 'text',
					tpl: '<h2>%s</h2>',
					section: 'Slide 4',
				},
				'Slide 4 text': {
					type: 'textarea',
					tpl: '<p>%s</p>',
					section: 'Slide 4',
				},
				'Slide 4 button text': {
					type: 'text',
					tpl: '<a style="{{Button color}}{{Button text color}}" class="button" href="{{Slide 4 button url}}">%s</a>',
					section: 'Slide 4',
				},
				'Slide 4 button url': {
					type: 'text',
					section: 'Slide 4',
				},

				'Slide 5 image': {
					type: 'image',
					tpl: '<li style="background-image: url(\'%s\')">' +
							 '<div class="flex-caption  header-slide-text">' +
							 '{{Slide 5 title}}{{Slide 5 text}}{{Slide 5 button text}}' +
							 '</div>' +
							 '</li>',
					section: 'Slide 5',
				},
				'Slide 5 title': {
					type: 'text',
					tpl: '<h2>%s</h2>',
					section: 'Slide 5',
				},
				'Slide 5 text': {
					type: 'textarea',
					tpl: '<p>%s</p>',
					section: 'Slide 5',
				},
				'Slide 5 button text': {
					type: 'text',
					tpl: '<a style="{{Button color}}{{Button text color}}" class="button" href="{{Slide 5 button url}}">%s</a>',
					section: 'Slide 5',
				},
				'Slide 5 button url': {
					type: 'text',
					section: 'Slide 5',
				},

				'Button color': {
					type: 'color',
					default: '#0693e3',
					tpl: 'background:%s;',
					section: 'Typography',
				},
				'Button text color': {
					type: 'color',
					default: '#ffffff',
					tpl: 'color:%s;',
					section: 'Typography',
				},
				'Text color': {
					type: 'color',
					tpl: 'color:%s;',
					default: '#ffffff',
					section: 'Typography',
				},
				'Font size': {
					type: 'range',
					min: 5,
					max: 250,
					default: 16,
					tpl: 'font-size:%spx;',
					section: 'Typography',
				},
				'Font size tablet': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
					section: 'Typography',
				},
				'Font size mobile': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
					section: 'Typography',
				},

				'Text Glow/Shadow': {
					type: 'select',
					options: [
						{value: '', label: 'No shadow/glow',},
						{value: '255,255,255', label: 'Glow',},
						{value: '0,0,0', label: 'Shadow',},
					],
					section: 'Text Glow/Shadow',
					tpl: 'text-shadow:{{Text Shadow position}} .05em rgba(%s,{{Text Shadow strength}});',
				},
				'Text Shadow position': {
					type: 'select',
					options: [
						{value: 'calc( -3px + -.07em ) calc( 2px + .03em )', label: 'Far Left',},
						{value: 'calc( -1px + -.03em ) calc( 1px + .01em )', label: 'Left',},
						{value: '0 0', label: 'Center',},
						{value: 'calc( 1px + .03em ) calc( 1px + .01em )', label: 'Right',},
						{value: 'calc( 2px + .05em ) calc( 2px + .03em )', label: 'Far Right',},
					],
					default: '0 0',
					section: 'Text Glow/Shadow',
				},
				'Text Shadow strength': {
					type: 'select',
					options: [
						{value: '.25', label: 'Light',},
						{value: '.5', label: 'Normal',},
						{value: '.75', label: 'Strong',},
					],
					default: '.5',
					section: 'Text Glow/Shadow',
				}
			},
		} );

		CaxtonBlock( {
			id: 'super-hero',
			title: 'Super Hero',
			icon: 'archive',
			category: 'caxton',
			toolbars: {
				Layout: 'BlockWidthToolbar',
			},
			fields: {
				'Background image': {
					type: 'image',
					section: 'Background image',
					tpl: 'background-image:url(%s);',
				},
				'Background image position': {
					type: 'position',
					section: 'Background image',
					tpl: 'background-position:%s;',
				},
				'Background parallax': {
					type: 'toggle',
					value: 'background-attachment:fixed;',
					section: 'Background image',
				},
				'Background color': {
					type: 'color',
					section: 'Background colors',
				},
				'Gradient color': {
					type: 'color',
					section: 'Background colors',
					tpl: ', %s',
				},
				'Gradient type': {
					type: 'select',
					options: [
						{value: 'linear-gradient( ', label: 'Linear vertical',},
						{value: 'linear-gradient( 90deg, ', label: 'Linear horizontal',},
						{value: 'linear-gradient( 45deg, ', label: 'Linear 45 deg',},
						{value: 'linear-gradient( -45deg, ', label: 'Linear 45 deg anticlockwise',},
						{value: 'radial-gradient( ', label: 'Radial gradient',},
					],
					default: 'linear-gradient( ',
					section: 'Background colors',
				},
				'Background colors opacity': {
					type: 'range',
					min: 0,
					max: 1,
					step: .05,
					help: 'Reduce opacity to have transparent colors over image',
					default: '.9',
					section: 'Background colors',
					tpl: 'opacity:%s;',
				},
				'Columns': {
					type: 'range',
					min: 1,
					max: 8,
					section: 'Layout',
					default: 1,
				},
				'Column gap': {
					type: 'select',
					options: [
						{value: 'grid-gap-none', label: 'None',},
						{value: 'grid-gap-tight', label: 'Tight',},
						{value: '', label: 'Normal',},
						{value: 'grid-gap-wide', label: 'Wide',},
						{value: 'grid-gap-wider', label: 'Wider',},
					],
					section: 'Layout',
				},
				'Inner Padding top': {
					type: 'range',
					section: 'Layout',
					default: 5,
				},
				'Inner Padding left': {
					type: 'range',
					max: 70,
					section: 'Layout',
					default: 5,
				},
				'Inner Padding bottom': {
					type: 'range',
					section: 'Layout',
					default: 5,
				},
				'Inner Padding right': {
					type: 'range',
					max: 70,
					section: 'Layout',
					default: 5,
				},
				'Inner Padding left/right tablet': {
					type: 'range',
					max: 70,
					section: 'Layout',
					default: 5,
				},
				'Inner Padding left/right mobile': {
					type: 'range',
					max: 70,
					section: 'Layout',
					default: 5,
				},
				'Inner Padding unit': {
					type: 'select',
					options: [
						{value: '%', label: 'Responsive',},
						{value: 'px', label: 'Pixels x 5',},
					],
					default: '%',
					section: 'Layout',
				},
			},
			edit(props, block) {
				const colBlk = ['core/column'];
				function getColumnsTemplate( columns ) {
					return Array( +columns ).fill( colBlk );
				}

				let bgHTML, padUnit, padT, padL, padB, padR, columns;

				let
					cls = 'relative ',
					colCls = 'relative caxton-columns';
				const padMob = block.attrs['Inner Padding left/right tablet'];
				const padTab = block.attrs['Inner Padding left/right mobile'];

				padUnit = block.attrs['Inner Padding unit'];
				padT = block.attrs['Inner Padding top'];
				padL = block.attrs['Inner Padding left'];
				padB = block.attrs['Inner Padding bottom'];
				padR = block.attrs['Inner Padding right'];
				columns = block.attrs['Columns'];

				if ( 'px' === padUnit ) {
					padT *= 5;
					padL *= 5;
					padB *= 5;
					padR *= 5;
				}

				padT = padT ? padT + padUnit : 0;
				padL = padL ? padL + padUnit : 0;
				padB = padB ? padB + padUnit : 0;
				padR = padR ? padR + padUnit : 0;

				if ( block.attrs['Layout'] ) {
					cls += ` ${block.attrs['Layout']}`;
				}

				if ( block.attrs['Column gap'] ) {
					colCls += ` ${block.attrs['Column gap']}`;
				}

				bgHTML = '<div class="cover bg-center absolute absolute--fill" style="{{Background image}}{{Background image position}}{{Background parallax}}"></div>' +
								 '<div class="absolute absolute--fill" style="background-color: {{Background color}};background-image:{{Gradient type}}{{Background color}}{{Gradient color}});{{Background colors opacity}}"></div>';

				return el(
					// Element
					'div', { className: cls, key: 'super-hero-block' },
					// Background div
					el( 'div', {key: 'bg', className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( bgHTML )} ),
					// Blocks inserter
					el( 'div', {
							className: `${colCls} caxton-${columns}-columns`,
							style: {
								'paddingTop': padT,
								'paddingLeft': padL,
								'paddingBottom': padB,
								'paddingRight': padR,
							},
							'data-tablet-css' : `padding-left:${padTab}em;padding-right:${padTab}em;`,
							'data-mobile-css' : `padding-left:${padMob}em;padding-right:${padMob}em;`,
							key: 'block',
						},
						el( caxtonWPEditor.InnerBlocks, {
							template: getColumnsTemplate( block.attrs['Columns'] ),
							templateLock: 'all',
							allowedBlock: colBlk,
							key: 'innerblockscontent'
						} )
					)
				);
			},
			save(props, block) {
				let cls = 'relative';
				let bgHTML;
				let padUnit;
				let padT;
				let padL;
				let padB;
				let padR;
				let columns;
				let colCls = 'relative caxton-columns';
				const padMob = block.attrs['Inner Padding left/right tablet'];
				const padTab = block.attrs['Inner Padding left/right mobile'];

				padUnit = block.attrs['Inner Padding unit'];
				padT = block.attrs['Inner Padding top'];
				padL = block.attrs['Inner Padding left'];
				padB = block.attrs['Inner Padding bottom'];
				padR = block.attrs['Inner Padding right'];
				columns = block.attrs['Columns'];

				if ( 'px' == padUnit ) {
					padT *= 5;
					padL *= 5;
					padB *= 5;
					padR *= 5;
				}

				padT = padT ? padT + padUnit : 0;
				padL = padL ? padL + padUnit : 0;
				padB = padB ? padB + padUnit : 0;
				padR = padR ? padR + padUnit : 0;

				if ( block.attrs['Layout'] ) {
					cls += ` ${block.attrs['Layout']}`;
				}

				if ( block.attrs['Column gap'] ) {
					colCls += ` ${block.attrs['Column gap']}`;
				}

				bgHTML = '<div key="bg-image" class="cover bg-center absolute absolute--fill" style="{{Background image}}{{Background image position}}{{Background parallax}}"></div>' +
								 '<div key="bg-colors" class="absolute absolute--fill" style="background-color: {{Background color}};background-image:{{Gradient type}}{{Background color}}{{Gradient color}});{{Background colors opacity}}"></div>';

				const childrenBlocks = el( caxtonWPEditor.InnerBlocks.Content, {} );

				return el(
					// Element
					'div', { className: cls, key: 'super-hero-block' },
					[
						// Background div
						el( 'div', { key: 'bg', className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( bgHTML )} ),
						// Blocks inserter
						el( 'div', {
								className: `${colCls} caxton-${columns}-columns`,
								style: {
									'paddingTop': padT,
									'paddingLeft': padL,
									'paddingBottom': padB,
									'paddingRight': padR,
								},
								'data-mobile-css' : `padding-left:${padMob}em;padding-right:${padMob}em;`,
								'data-tablet-css' : `padding-left:${padTab}em;padding-right:${padTab}em;`,
								key: 'block',
							},
							childrenBlocks
						)
					]
				);
			}
		} );

		CaxtonBlock( {
			id: 'divider',
			title: 'Shape Divider',
			icon: 'cloud',
			category: 'caxton',
			tpl: function( props ) {
				let svgMaps = {
					'': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="xMidYMax slice">' +
							'<path d="M265.8 3.5c-10.9 0-15.9 6.2-15.9 6.2s-3.6-3.5-9.2-.9c-9.1 4.1-4.4 13.4-4.4 13.4s-1.2.2-1.9.9c-.6.7-.5 1.9-.5 1.9s-1-.5-2.3-.2c-1.3.3-1.6 1.4-1.6 1.4s.4-3.4-1.5-5c-3.9-3.4-8.3-.2-8.3-.2s-.6-.7-.9-.9c-.4-.2-1.2-.2-1.2-.2s-4.4-3.6-11.5-2.6-10.4 7.9-10.4 7.9-.5-3.3-3.9-4.9c-4.8-2.4-7.4 0-7.4 0s2.4-4.1-1.9-6.4-6.2 1.2-6.2 1.2-.9-.5-2.1-.5-2.3 1.1-2.3 1.1.1-.7-1.1-1.1c-1.2-.4-2 0-2 0s3.6-6.8-3.5-8.9c-6-1.8-7.9 2.6-8.4 4-.1-.3-.4-.7-.9-1.1-1-.7-1.3-.5-1.3-.5s1-4-1.7-5.2c-2.7-1.2-4.2 1.1-4.2 1.1s-3.1-1-5.7 1.4-2.1 5.5-2.1 5.5-.9 0-2.1.7-1.4 1.7-1.4 1.7-1.7-1.2-4.3-1.2c-2.6 0-4.5 1.2-4.5 1.2s-.7-1.5-2.8-2.4c-2.1-.9-4 0-4 0s2.6-5.9-4.7-9c-7.3-3.1-12.6 3.3-12.6 3.3s-.9 0-1.9.2c-.9.2-1.5.9-1.5.9S99.4 3 94.9 3.9c-4.5.9-5.7 5.7-5.7 5.7s-2.8-5-12.3-3.9-11.1 6-11.1 6-1.2-1.4-4-.7c-.8.2-1.3.5-1.8.9-.9-2.1-2.7-4.9-6.2-4.4-3.2.4-4 2.2-4 2.2s-.5-.7-1.2-.7h-1.4s-.5-.9-1.7-1.4-2.4 0-2.4 0-2.4-1.2-4.7 0-3.1 4.1-3.1 4.1-1.7-1.4-3.6-.7c-1.9.7-1.9 2.8-1.9 2.8s-.5-.5-1.7-.2c-1.2.2-1.4.7-1.4.7s-.7-2.3-2.8-2.8c-2.1-.5-4.3.2-4.3.2s-1.7-5-11.1-6c-3.8-.4-6.6.2-8.5 1v21.2h283.5V11.1c-.9.2-1.6.4-1.6.4s-5.2-8-16.1-8z"/>' +
							'</svg>',
					book: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="xMidYMax slice">' +
							'<path d="M194,99c186.7,0.7,305-78.3,306-97.2c1,18.9,119.3,97.9,306,97.2c114.3-0.3,194,0.3,194,0.3s0-91.7,0-100c0,0,0,0,0-0 L0,0v99.3C0,99.3,79.7,98.7,194,99z"></path>' +
							'</svg>',
					waves: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="xMidYMax slice">\n' +
										'<path class="elementor-shape-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"/>' +
										'</svg>',
					pyramids: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="xMidYMax slice">' +
											 '<path class="elementor-shape-fill" d="M761.9,44.1L643.1,27.2L333.8,98L0,3.8V0l1000,0v3.9"/>' +
											 '</svg>',
					tilt: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="xMidYMax slice">' +
							 '<path class="elementor-shape-fill" d="M0,6V0h1000v100L0,6z"/>' +
							 '</svg>',
//					'' : '',
				};

				let
					svg = svgMaps[''],
					classes = 'caxton-shape-divider cover bg-center{{Full width}}{{Position}}';

				if ( svgMaps[ props.attributes['Shape'] ] ) {
					svg = svgMaps[props.attributes['Shape']];
				}

				return '<div class="' + classes + '" style="background:{{Color 2}};color:{{Color 1}};">' +
							 '<div class="{{Flip}}">' + svg + '</div></div>';
			},
			fields: {
				'Shape': {
					type: 'select',
					options: [
						{
							value: '',
							label: 'Clouds',
						},
						{
							value: 'book',
							label: 'Book',
						},
						{
							value: 'waves',
							label: 'Waves',
						},
						{
							value: 'pyramids',
							label: 'Pyramids',
						},
						{
							value: 'tilt',
							label: 'Tilt',
						},
					],
				},
				'Full width': {
					type: 'toggle',
					value: ' vw-100',
				},
				'Flip': {
					type: 'toggle',
					value: ' flip-v',
				},
				'Position': {
					type: 'select',
					options: [
						{ value: '', label: 'Normal', },
						{ value: ' caxton-shape-divider-onxt', label: 'Over previous block', },
						{ value: ' caxton-shape-divider-oprv', label: 'Over next block', },
					],
					value: ' aspect-ratio',
				},
				'Color 1': {
					type: 'color',
					default: '#fff'
				},
				'Color 2': {
					type: 'color',
					default: '#fff'
				},
			},
		} );

		class CaxtonPostsGridEditComponent extends React.Component {
			constructor( props ) {
				super( ...arguments );
				this.state = {
					dataProps: Caxton.copyObj( {}, props )
				};
			}
			fetchUrls() {
				let
					state = this.state,
					cmp = this,
					attributes = state.dataProps;

				const attrs = $.extend( {
					cat: [],
					order: 'date/desc',
					rows: 4,
					columns: 2,
				}, attributes );

				const order = attrs.order.split( '/' );

				const url =
					`/caxton/v1/posts?posts_per_page=${attrs.rows * attrs.columns}&post__not_in=${caxton.post}&cat=${attrs.cat}${attrs.postIDs ? `&post__in=${attrs.postIDs}` : ''}${attrs.displayPostWithoutImages ? '&meta_key=' : ''}&orderby=${order[0]}&order=${order[1]}`;

				if ( ! state.dataProps['posts'] || url !== state.dataProps['posts'].path ) {
					state.dataProps['posts'] = {};
					wp.apiFetch( {path: url} ).then( data => {
						if ( cmp && state.dataProps['posts'].data !== data ) {
							state.dataProps['posts'].data = data;
							state.dataProps['posts'].path = url;
							cmp.setState( state );
						}
					} );
				}
			}

			render() {
				function postMetaMarkup() {
					if ( attrs.displayMeta ) {
						return {__html: `<span class="author">${authorIcon}${post.author}</span><span class="comments">${commentIcon} ${post.comments}</span>`};
					} else {
						return {__html: ''};
					}
				};

				Caxton.copyObj( this.state.dataProps, this.props );
				this.fetchUrls();

				const props = this.state.dataProps;

				const attrs = $.extend( {
					cat: '',
					order: 'date/desc',
					rows: 4,
					columns: 2,
					titleSize: 20,
				}, props.attributes );

				let post;
				let gridInfo;
				const commentIcon = '<span class="fa fa-comments"></span>';
				const authorIcon = '<span class="fa fa-user-circle-o"></span>';
				const grids = [];
				const selected = props.isSelected;
				let className = `${props.className} ${props.name.replace( '/', '-' )} caxton-grid`;

				className += ` caxton-${attrs.imagesType}-images`;

				if ( attrs.titleBelowImage ) {
					className += ' caxton-title-below-image';
				}

				if ( ! props.posts.data ) {
					grids.push( el( 'div', {className: 'caxton-notification', key: 'notice'}, 'Loading posts...' ) );
				} else if ( props.posts.data.length === 0 ) {
					grids.push( el( 'div', {className: 'caxton-notification', key: 'notice'}, 'No posts match criteria.' ) );
				} else {
					let postClass = 'grid-item';
					if ( attrs.border ) {
						postClass += ' ba';
					}

					for ( let i = 0; i < props.posts.data.length; i ++ ) {
						post = props.posts.data[i];
						gridInfo = [
							el( 'a', {className: 'grid-link', href: '#',key: 'anchor'},
								el( 'div', {className: 'grid-image', style: {backgroundImage: `url(${post.thumb_ml})`},},
									el( 'h3', {className: 'grid-title', style: {fontSize: attrs.titleSize},}, post.title ),
								)
							)
						];

						gridInfo.push( el( 'h3', {className: 'grid-title', style: {fontSize: attrs.titleSize},key: 'title'}, $("<div/>").html( post.title ).text() ) );

						if ( attrs.displayDate ) {
							gridInfo.push( el( 'time', {key: 'date'}, post.date ) );
						}

						if ( attrs.displayExcerpt ) {
							gridInfo.push( el( 'p', {key: 'excerpt'}, $("<div/>").html( post.excerpt ).text() ) );
						}

						gridInfo.push( el( 'div', {className: 'grid-meta', dangerouslySetInnerHTML: postMetaMarkup(),key: 'meta'}, ), );

						grids.push(
							el(
								'div',
								{
									className: postClass,
									style: { width: `${100 / attrs.columns - 2}%` },
									key: `post-${post.id}`
								},
								gridInfo
							)
						);
					}
				}
				return [
					! ! selected && el(
						InspectorControls,
						{key: 'inspector'},
						el(
							SelectControl,
							{
								label: 'Category',
								value: attrs.cat,
								instanceId: 'caxton-postCats',
								options: caxton.postCategories,
								onChange(val) {
									props.setAttributes( {postIDs: '', cat: val} );
								}
							}
						),
						( attrs.cat ? '' : el(
							TextControl,
							{
								label: 'Hand picked posts',
								instanceId: 'caxton-postIDs',
								options: caxton.postCategories,
								help: 'Type in the IDs of posts separated by comma',
								onChange(val) {
									props.setAttributes( { postIDs: val } );
								}
							}
						) ),
						el(
							SelectControl,
							{
								label: 'Order',
								value: attrs.order,
								options: [
									{label: __( 'Newest to Oldest' ), value: 'date/desc',},
									{label: __( 'Oldest to Newest' ), value: 'date/asc',},
									{label: __( 'A → Z' ), value: 'title/asc',},
									{label: __( 'Z → A' ), value: 'title/desc',},
								],
								onChange(val) {
									props.setAttributes( {order: val} );
								}
							}
						),
						el(
							SelectControl,
							{
								label: 'Images shape',
								value: attrs.imagesType,
								options: [
									{label: __( 'Square' ), value: '',},
									{label: __( 'Circle' ), value: 'circle',},
									{label: __( 'Rectangle' ), value: 'rectangle',},
								],
								onChange(val) {
									props.setAttributes( {imagesType: val} );
								}
							}
						),
						el(
							ToggleControl,
							{
								label: 'Include posts without image',
								checked: attrs.displayPostWithoutImages,
								onChange(val) {
									if ( val.target ) {
										props.setAttributes( {displayPostWithoutImages: val.target.checked} );
									} else {
										props.setAttributes( {displayPostWithoutImages: val} );
									}
								}
							}
						),
						el(
							ToggleControl,
							{
								label: 'Display post date',
								checked: attrs.displayDate,
								onChange(val) {
									if ( val.target ) {
										props.setAttributes( {displayDate: val.target.checked} );
									} else {
										props.setAttributes( {displayDate: val} );
									}
								}
							}
						),
						el(
							ToggleControl,
							{
								label: 'Display post meta',
								checked: attrs.displayMeta,
								onChange(val) {
									if ( val.target ) {
										props.setAttributes( {displayMeta: val.target.checked} );
									} else {
										props.setAttributes( {displayMeta: val} );
									}
								}
							}
						),
						el(
							ToggleControl,
							{
								label: 'Show Border',
								checked: attrs.border,
								onChange(val) {
									if ( val.target ) {
										props.setAttributes( {border: val.target.checked} );
									} else {
										props.setAttributes( {border: val} );
									}
								}
							}
						),
						el(
							ToggleControl,
							{
								label: 'Display post excerpt',
								checked: attrs.displayExcerpt,
								onChange(val) {
									if ( val.target ) {
										props.setAttributes( {displayExcerpt: val.target.checked} );
									} else {
										props.setAttributes( {displayExcerpt: val} );
									}
								}
							}
						),
						el(
							ToggleControl,
							{
								label: 'Show title below image',
								checked: attrs.titleBelowImage,
								onChange(val) {
									if ( val.target ) {
										props.setAttributes( {titleBelowImage: val.target.checked} );
									} else {
										props.setAttributes( {titleBelowImage: val} );
									}
								}
							}
						),
						el(
							RangeControl,
							{
								label: 'Title size',
								value: attrs.titleSize,
								onChange(val) {
									props.setAttributes( {titleSize: val} );
								},
								min: 10,
								max: 50,
							}
						),
						el(
							RangeControl,
							{
								label: 'Post columns',
								value: attrs.columns,
								onChange(val) {
									props.setAttributes( {columns: val} );
								},
								min: 1,
								max: 5,
							}
						),
						el(
							RangeControl,
							{
								label: 'Post rows',
								value: attrs.rows,
								onChange(val) {
									props.setAttributes( {rows: val} );
								},
								min: 1,
								max: 20,
							}
						)
					),
					el( 'div', {className, key: 'grid'}, grids )
				];
			}
		}

		wp.blocks.registerBlockType(
			'caxton/posts-grid',
			{
				title: 'Posts grid',
				icon: 'screenoptions',
				category: 'caxton',

				attributes: {
					postIDs: {
						type: 'string',
					},
					cat: {
						type: 'string',
					},
					order: {
						type: 'string',
					},
					imagesType: {
						type: 'string',
					},
					displayPostWithoutImages: {
						type: 'boolean',
					},
					border: {
						type: 'boolean',
					},
					displayDate: {
						type: 'boolean',
					},
					displayExcerpt: {
						type: 'boolean',
					},
					displayMeta: {
						type: 'boolean',
					},
					titleBelowImage: {
						type: 'boolean',
					},
					titleSize: {
						type: 'number',
					},
					rows: {
						type: 'number',
					},
					columns: {
						type: 'number',
					},
				},
				edit: CaxtonPostsGridEditComponent,

				save() {
					// Rendering in PHP
					return null;
				},
			}
		);
	})
)( jQuery, wp.blocks, wp.element.createElement, wp.i18n, wp.components );
