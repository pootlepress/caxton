/**
 * Plugin front end scripts
 *
 * @package Caxton
 * @version 1.0.0
 */
(
	function ( $, blocks, el, withAPIData, i18n, components ) {
		var
			registerBlockType = blocks.registerBlockType,
			InspectorControls = blocks.InspectorControls,
			__ = i18n.__;

		CaxtonBlock( {
			id: 'hero',
			title: 'Hero section',
			icon: 'archive',
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
			id: 'hero-2-col',
			title: 'Hero - 2 columns',
			icon: '<svg enable-background="new 0 0 475.082 475.082" version="1.1" viewBox="0 0 475.08 475.08" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m461.67 31.691c-8.949-8.945-19.698-13.417-32.265-13.417h-383.72c-12.562 0-23.317 4.471-32.264 13.417-8.945 8.947-13.418 19.698-13.418 32.261v347.17c0 12.566 4.473 23.318 13.418 32.264 8.947 8.946 19.701 13.419 32.264 13.419h383.72c12.566 0 23.315-4.473 32.265-13.419 8.945-8.945 13.415-19.697 13.415-32.264v-347.17c0-12.563-4.47-23.314-13.415-32.261zm-242.4 388.58h-173.59c-2.474 0-4.615-0.907-6.423-2.707-1.809-1.811-2.712-3.949-2.712-6.427v-319.76h182.72v328.9zm219.26-9.141c0 2.478-0.903 4.62-2.71 6.427-1.813 1.807-3.949 2.71-6.427 2.71h-173.59v-328.9h182.73v319.76h-6e-3z"/></svg>',
			tpl:
			'<div class="cover bg-center {{Full width}}" style="background-image:url({{Background image}});{{Background parallax}}">' +
			'<div class="dt w-100 center-mid-children">' +
			'<div class="min-h-7 p4 tc white ph3 ph4-l center-mid-children {{Content width}}{{Content position}}{{Dim image behind content}}{{Full height}}">' +
			'<h2 style="color:{{Title color}};font-size:{{Title size}}px">{{Title}}</h2>' +
			'<div style="margin: 1em 0;color:{{Sub-title color}};font-size:{{Sub-title size}}px">{{Sub-title}}</div>' +
			'<a href="{{Button Link}}" class="no-underline tc {{Buttons style}} pa2" ' +
			'style="color:{{Button text color}};background:{{Button background color}};font-size:{{Button size}}px">' +
			'{{Call to action button}}</a></div></div></div>',
			fields: {
				'Background image': 'image',
				'Dim image behind content': {
					type: 'radio',
					options: [
						{value: ' bg-white-90', label: 'Lighter',},
						{value: ' bg-white-70', label: 'Light',},
						{value: ' ', label: "Don't dim",},
						{value: ' bg-black-50', label: 'Dark',},
						{value: ' bg-black-70', label: 'Darker',},
					],
					default: ' bg-white-70',
				},
				'Content position': {
					type: 'radio',
					options: [
						{value: ' mra', label: 'Left',},
						{value: ' mla', label: 'Right',},
					],
					default: ' mra',
				},
				'Content width': {
					type: 'radio',
					options: [
						{value: 'w-100 w-auto-l w-auto-m', label: 'Fit content',},
						{value: 'w-100 w-30-l w-50-m', label: 'Small',},
						{value: 'w-100 w-50-l w-70-m', label: 'Large',},
					],
					default: 'w-100 w-auto-l w-auto-m',
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
					default: '#232324'
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
					default: '#232324'
				},
				'Sub-title size': {
					type: 'range',
					default: '16'
				},
				'Call to action button': {
					type: 'editable',
					default: 'Button'
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
			},
		} );

		CaxtonBlock( {
			id: 'social-share-icons',
			title: 'Social share icons',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M15.117 0H.883C.395 0 0 .395 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.46V7.39h2.086V5.607c0-2.066 1.262-3.19 3.106-3.19.883 0 1.642.064 1.863.094v2.16h-1.28c-1 0-1.195.476-1.195 1.176v1.54h2.39l-.31 2.416h-2.08V16h4.077c.488 0 .883-.395.883-.883V.883C16 .395 15.605 0 15.117 0" fill-rule="nonzero"/></svg>',
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
			icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g><path fill="#e74c3c" d="M18 3v2H2V3h16zm-6 4v2H2V7h10zm6 0v2h-4V7h4zM8 11v2H2v-2h6zm10 0v2h-8v-2h8zm-4 4v2H2v-2h12z"/></g></svg>',
			tpl: '<{{Element Tag}} class="{{Alignment}}{{Text Glow/Shadow}}" ' +
					 'style="{{Letter Spacing}}{{Margin top}}{{Margin bottom}}{{Weight}}{{Font}}{{Text color}}{{Background color}}{{Font size}}" ' +
					 'data-mobile-css="{{Font size mobile}}" ' +
					 'data-tablet-css="{{Font size tablet}}" ' +
					 'data-desktop-css="{{Font size}}">' +
					 '<span class="dib">{{Overline}}{{Text}}{{Underline}}</span>' +
					 '</{{Element Tag}}>',
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
				'Margin top': {
					type: 'range',
					section: 'Layout',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-top:%sem;',
				},
				'Margin bottom': {
					type: 'range',
					section: 'Layout',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-bottom:%sem;',
				},
				'Font': {
					type: 'font',
					tpl: 'font-family:%s;',
					section: 'Typography',
				},
				'Letter Spacing': {
					type: 'range',
					max: 25,
					tpl: 'letter-spacing:%spx;',
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
				'Alignment': {
					type: 'radio',
					options: [
						{value: ' tl', label: 'Left',},
						{value: ' tc', label: 'Center',},
						{value: ' tr', label: 'Right',},
					],
					default: ' tl',
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
				'Text color': {
					type: 'color',
					default: '#555',
					tpl: 'color:%s;',
					section: 'Color and decoration',
				},
				'Background color': {
					type: 'color',
					tpl: 'background-color:%s;',
					section: 'Color and decoration',
				},
				'Underline': {
					type: 'select',
					options: [
						{
							value: '',
							label: 'None',
						},
						{
							value: '<div style="border-bottom: 0.05em dotted"></div>',
							label: 'Dotted',
						},
						{
							value: '<div style="border-bottom: 0.05em dashed"></div>',
							label: 'Dashed',
						},
						{
							value: '<div style="border-bottom: 0.05em solid"></div>',
							label: 'Thin',
						},
						{
							value: '<div style="border-bottom: 0.05em solid; margin-bottom:0.1em"></div><div style="border-bottom: 0.05em solid"></div>',
							label: 'Thin + Thin',
						},
						{
							value: '<div style="border: 0.05em solid; margin-bottom:0.1em"></div><div style="border-bottom: 0.05em solid"></div>',
							label: 'Thick + Thin',
						},
						{
							value: '<div style="border-bottom: 0.05em solid; margin-bottom:0.1em"></div><div style="border: 0.05em solid"></div>',
							label: 'Thin + Thick',
						},
						{
							value: '<div style="border: 0.05em solid"></div>',
							label: 'Thick',
						},
					],
					section: 'Color and decoration',
				},
				'Overline': {
					type: 'select',
					options: [
						{
							value: '',
							label: 'None',
						},
						{
							value: '<div style="border-bottom: 0.05em dotted"></div>',
							label: 'Dotted',
						},
						{
							value: '<div style="border-bottom: 0.05em dashed"></div>',
							label: 'Dashed',
						},
						{
							value: '<div style="border-bottom: 0.05em solid"></div>',
							label: 'Thin',
						},
						{
							value: '<div style="border-bottom: 0.05em solid; margin-bottom:0.1em"></div><div style="border-bottom: 0.05em solid"></div>',
							label: 'Thin + Thin',
						},
						{
							value: '<div style="border-bottom: 0.05em solid; margin-bottom:0.1em"></div><div style="border: 0.05em solid"></div>',
							label: 'Thin + Thick',
						},
						{
							value: '<div style="border: 0.05em solid; margin-bottom:0.1em"></div><div style="border-bottom: 0.05em solid"></div>',
							label: 'Thick + Thin',
						},
						{
							value: '<div style="border: 0.05em solid"></div>',
							label: 'Thick',
						},
					],
					section: 'Color and decoration',
				},
				'Text Glow/Shadow': {
					type: 'select',
					options: [
						{value: '', label: 'None',},
						{value: ' text-glow', label: 'Glow',},
						{value: ' text-shadow', label: 'Shadow',},
					],
					section: 'Color and decoration',
				},
			},
		} );

		CaxtonBlock( {
			id: 'super-button',
			title: 'Super Button',
			icon: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#e74c3c" d="M17 5H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm1 7c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v5z"></path></svg>',
			tpl: '<div class="{{Alignment}}" style="{{Margin top}}{{Margin bottom}}">' +
					 '<a class="caxton-btn no-underline dib {{Text Glow/Shadow}}" href="{{URL}}" ' +
					 'data-hover-css="{{Hover Text color}}{{Hover Background color}}{{Hover Border color}}" ' +
					 'style="{{Letter Spacing}}{{Weight}}{{Font}}{{Text color}}{{Background color}}{{Font size}}' +
					 'border:{{Border weight}} solid {{Border color}};' +
					 'padding:{{Padding top/bottom}} {{Padding left/right}};' +
					 '{{Button Glow/Shadow}};" ' +
					 'data-mobile-css="{{Font size mobile}}" ' +
					 'data-tablet-css="{{Font size tablet}}" ' +
					 'data-desktop-css="{{Font size}}">' +
					 '{{Text}}' +
					 '</a></div>',
			fields: {
				'Text': {
					type: 'editable',
					default: 'Click here to edit text'
				},
				'URL': {
					section: 'Layout',
					type: 'text',
					default: '#'
				},
				'Padding top/bottom': {
					type: 'range',
					section: 'Layout',
					min: 0,
					default: .5,
					max: 5,
					step: 0.05,
					tpl: '%sem',
				},
				'Padding left/right': {
					type: 'range',
					section: 'Layout',
					min: 0,
					default: .7,
					max: 5,
					step: 0.05,
					tpl: '%sem',
				},
				'Margin top': {
					type: 'range',
					section: 'Layout',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-top:%sem;',
				},
				'Margin bottom': {
					type: 'range',
					section: 'Layout',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-bottom:%sem;',
				},

				'Font': {
					type: 'font',
					tpl: 'font-family:%s;',
					section: 'Typography',
				},
				'Letter Spacing': {
					type: 'range',
					max: 25,
					tpl: 'letter-spacing:%spx;',
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
				'Alignment': {
					type: 'radio',
					options: [
						{value: ' tl', label: 'Left',},
						{value: ' tc', label: 'Center',},
						{value: ' tr', label: 'Right',},
					],
					default: ' tl',
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

				'Text color': {
					type: 'color',
					default: '#555',
					tpl: 'color:%s;',
					section: 'Color and decoration',
				},
				'Background color': {
					type: 'color',
					tpl: 'background-color:%s;',
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
				'Border color': {
					type: 'color',
					section: 'Color and decoration',
				},
				'Text Glow/Shadow': {
					type: 'select',
					options: [
						{value: '', label: 'None',},
						{value: ' text-glow', label: 'Glow',},
						{value: ' text-shadow', label: 'Shadow',},
					],
					section: 'Color and decoration',
				},

				'Button Glow/Shadow': {
					type: 'select',
					options: [
						{value: '', label: 'No shadow/glow',},
						{value: '255,255,255', label: 'Glow',},
						{value: '0,0,0', label: 'Shadow',},
					],
					section: 'Button Glow/Shadow',
					tpl: 'box-shadow:{{Horizontal Offset}} {{Vertical Offset}} {{Blur}} {{Spread}} rgba(%s,{{Strength}});',
				},
				'Horizontal Offset': {
					type: 'range',
					tpl: '%spx ',
					default: 0,
					min: - 25,
					max: 25,
					section: 'Button Glow/Shadow',
				},
				'Vertical Offset': {
					type: 'range',
					tpl: '%spx ',
					default: 0,
					min: - 25,
					max: 25,
					section: 'Button Glow/Shadow',
				},
				'Spread': {
					type: 'range',
					tpl: '%spx',
					default: 0,
					max: 25,
					section: 'Button Glow/Shadow',
				},
				'Blur': {
					type: 'range',
					tpl: '%spx',
					default: 3,
					max: 25,
					section: 'Button Glow/Shadow',
				},
				'Strength': {
					type: 'range',
					min: .1,
					step: .1,
					default: .1,
					max: 1,
					section: 'Button Glow/Shadow',
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
			},
		} );

		CaxtonBlock( {
			id: 'super-hero',
			title: 'Super Hero',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g><path fill="#e74c3c" d="M19 4v2H1V4h18zM2 7h16v10H2V7zm11 3V9H7v1h6z"/></g></svg>',
			fields: {
				'Background image': {
					type: 'image',
					section: 'Background',
					tpl: 'background-image:url(%s);',
				},
				'Background parallax': {
					type: 'toggle',
					value: 'background-attachment:fixed;',
					section: 'Background',
				},
				'Background color': {
					type: 'color',
					section: 'Background',
				},
				'Second Background color': {
					type: 'color',
					help: 'Second background color adds Gradient',
					section: 'Background',
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
					section: 'Background',
				},
				'Background colors opacity': {
					type: 'range',
					min: 0,
					max: 1,
					step: .05,
					help: 'Reduce opacity to have transparent colors over image',
					default: '.9',
					section: 'Background',
					tpl: 'opacity:%s;',
				},
				'Full width': {
					type: 'toggle',
					value: ' vw-100',
					section: 'Layout',
				},
				'Columns': {
					type: 'range',
					max: 5,
					section: 'Layout',
					default: 1,
				},
				'Padding top': {
					type: 'range',
					section: 'Layout',
					default: 5,
				},
				'Padding left': {
					type: 'range',
					max: 70,
					section: 'Layout',
					default: 0,
				},
				'Padding bottom': {
					type: 'range',
					section: 'Layout',
					default: 5,
				},
				'Padding right': {
					type: 'range',
					max: 70,
					section: 'Layout',
					default: 0,
				},
				'Padding unit': {
					type: 'select',
					options: [
						{value: '%', label: 'Responsive',},
						{value: 'px', label: 'Pixels',},
					],
					default: '%',
					section: 'Layout',
				},
			},
			edit: function ( props, block ) {
				function getColumnLayouts( cols ) {
					var n, colsInfo = [];
					for ( var i = 0; i < cols; i ++ ) {
						n = i + 1;
						colsInfo.push( {
							name: 'caxton-col caxton-col-' + n,
							label: __( 'Column %d' ).replace( '%d', n ),
							icon: 'columns'
						} );
					}
					return colsInfo;
				}

				var cls = 'relative ', bgHTML, padUnit, padT, padL, padB, padR, columns;

				padUnit = block.attrs['Padding unit'];
				padT = block.attrs['Padding top'];
				padL = block.attrs['Padding left'];
				padB = block.attrs['Padding bottom'];
				padR = block.attrs['Padding right'];
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

				cls += ' ' + block.attrs['Full width'];

				bgHTML = '<div class="cover bg-center absolute absolute--fill" style="{{Background image}}{{Background parallax}}"></div>' +
								 '<div class="absolute absolute--fill" style="background-color: {{Background color}};background-image:{{Gradient type}}{{Background color}}{{Second Background color}});{{Background colors opacity}}"></div>';

				return el(
					// Element
					'div', {
						className: cls, style: {
							'paddingTop': padT,
							'paddingLeft': padL,
							'paddingBottom': padB,
							'paddingRight': padR,
						}
					},
					// Background div
					el( 'div', {className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( bgHTML )} ),
					// Blocks inserter
					el(
						'div', {className: 'relative caxton-columns caxton-' + columns + '-columns',},
						el( wp.blocks.InnerBlocks, {layouts: getColumnLayouts( block.attrs['Columns'] )} )
					)
				);
			},
			save: function ( props, block ) {
				var cls = 'relative ', bgHTML, padUnit, padT, padL, padB, padR, columns;

				padUnit = block.attrs['Padding unit'];
				padT = block.attrs['Padding top'];
				padL = block.attrs['Padding left'];
				padB = block.attrs['Padding bottom'];
				padR = block.attrs['Padding right'];
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

				cls += ' ' + block.attrs['Full width'];

				bgHTML = '<div class="cover bg-center absolute absolute--fill" style="{{Background image}}{{Background parallax}}"></div>' +
								 '<div class="absolute absolute--fill" style="background-color: {{Background color}};background-image:{{Gradient type}}{{Background color}}{{Second Background color}});{{Background colors opacity}}"></div>';

				return el(
					// Element
					'div', {
						className: cls, style: {
							'paddingTop': padT,
							'paddingLeft': padL,
							'paddingBottom': padB,
							'paddingRight': padR,
						}
					},
					// Background div
					el( 'div', {className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( bgHTML )} ),
					// Blocks inserter
					el(
						'div', {className: 'relative caxton-columns caxton-' + columns + '-columns',},
						el( wp.blocks.InnerBlocks.Content )
					)
				);
			}
		} );

		CaxtonBlock( {
			id: 'super-icon',
			title: 'Super icon',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#e74c3c" d="M211.7 241.1v51.7c0 2.1-1.6 3.7-3.7 3.7h-22.2c-2.1 0-3.7-1.6-3.7-3.7v-51.7c0-2.1 1.6-3.7 3.7-3.7H208c2.1 0 3.7 1.6 3.7 3.7zm114.5-3.7H304c-2.1 0-3.7 1.6-3.7 3.7v51.7c0 2.1 1.6 3.7 3.7 3.7h22.2c2.1 0 3.7-1.6 3.7-3.7v-51.7c-.1-2.1-1.7-3.7-3.7-3.7zm-29.1 263.2c-.9.1-1.7.3-2.6.4-1 .2-2.1.3-3.1.5-.9.1-1.8.3-2.8.4-1 .1-2 .3-3 .4-1 .1-2 .2-2.9.3-1 .1-1.9.2-2.9.3-1 .1-2.1.2-3.1.3-.9.1-1.8.2-2.7.2-1.1.1-2.3.1-3.4.2-.8 0-1.7.1-2.5.1-1.3.1-2.6.1-3.9.1-.7 0-1.4.1-2.1.1-2 0-4 .1-6 .1s-4 0-6-.1c-.7 0-1.4 0-2.1-.1-1.3 0-2.6-.1-3.9-.1-.8 0-1.7-.1-2.5-.1-1.1-.1-2.3-.1-3.4-.2-.9-.1-1.8-.1-2.7-.2-1-.1-2.1-.2-3.1-.3-1-.1-1.9-.2-2.9-.3-1-.1-2-.2-2.9-.3-1-.1-2-.2-3-.4-.9-.1-1.8-.3-2.8-.4-1-.1-2.1-.3-3.1-.5-.9-.1-1.7-.3-2.6-.4-65.6-10.9-122.5-47.7-160-99.4-.2-.2-.3-.5-.5-.7-.8-1.1-1.6-2.2-2.3-3.3-.3-.4-.6-.8-.8-1.2-.7-1.1-1.4-2.1-2.1-3.2-.3-.5-.6-.9-.9-1.4-.7-1.1-1.4-2.1-2-3.2-.3-.5-.6-.9-.9-1.4-.7-1.1-1.3-2.2-2-3.3-.2-.4-.5-.8-.7-1.2-2.4-4-4.6-8.1-6.8-12.2-.1-.2-.2-.3-.3-.5-.6-1.1-1.1-2.2-1.7-3.3-.3-.6-.6-1.1-.8-1.7-.5-1-1-2.1-1.5-3.1-.3-.7-.6-1.3-.9-2-.5-1-.9-2-1.4-3l-.9-2.1c-.4-1-.9-2-1.3-3-.3-.7-.6-1.5-.9-2.2l-1.2-3c-.3-.8-.6-1.5-.9-2.3-.4-1-.8-2-1.1-3-.3-.9-.6-1.8-1-2.8-.6-1.6-1.1-3.3-1.7-4.9-.3-.9-.6-1.8-.9-2.8-.3-.9-.5-1.8-.8-2.7-.3-.9-.6-1.9-.8-2.8-.3-.9-.5-1.8-.8-2.7-.3-1-.5-1.9-.8-2.9-.2-.9-.5-1.8-.7-2.7-.3-1-.5-2-.7-3-.2-.9-.4-1.7-.6-2.6-.2-1.1-.5-2.2-.7-3.2-.2-.8-.3-1.6-.5-2.4-.3-1.3-.5-2.7-.8-4-.1-.6-.2-1.1-.3-1.7l-.9-5.7c-.1-.6-.2-1.3-.3-1.9-.2-1.3-.4-2.6-.5-3.9-.1-.8-.2-1.5-.3-2.3-.1-1.2-.3-2.4-.4-3.6-.1-.8-.2-1.6-.2-2.4-.1-1.2-.2-2.4-.3-3.5-.1-.8-.1-1.6-.2-2.4-.1-1.2-.2-2.4-.2-3.7 0-.8-.1-1.5-.1-2.3-.1-1.3-.1-2.7-.2-4 0-.7 0-1.3-.1-2 0-2-.1-4-.1-6 0-53.5 16.9-103 45.8-143.6 2.3-3.2 4.7-6.4 7.1-9.5 4.9-6.2 10.1-12.3 15.6-18 2.7-2.9 5.5-5.7 8.4-8.4 2.9-2.7 5.8-5.4 8.8-8 4.5-3.9 9.1-7.6 13.9-11.2 1.6-1.2 3.2-2.4 4.8-3.5C140 34.2 171.7 20.1 206 13c16.1-3.3 32.9-5 50-5s33.8 1.7 50 5c34.3 7 66 21.1 93.6 40.7 1.6 1.2 3.2 2.3 4.8 3.5 4.8 3.6 9.4 7.3 13.9 11.2 12 10.4 23 21.9 32.8 34.4 2.5 3.1 4.8 6.3 7.1 9.5C487.1 153 504 202.5 504 256c0 2 0 4-.1 6 0 .7 0 1.3-.1 2 0 1.3-.1 2.7-.2 4 0 .8-.1 1.5-.1 2.3-.1 1.2-.1 2.4-.2.7-.1.8-.1 1.6-.2 2.4-.1 1.2-.2 2.4-.3 3.5-.1.8-.2 1.6-.2 2.4-.1 1.2-.3 2.4-.4 3.6-.1.8-.2 1.5-.3 2.3-.2 1.3-.4 2.6-.5 3.9-.1.6-.2 1.3-.3 1.9l-.9 5.7c-.1.6-.2 1.1-.3 1.7-.2 1.3-.5 2.7-.8 4-.2.8-.3 1.6-.5 2.4-.2 1.1-.5 2.2-.7 3.2-.2.9-.4 1.7-.6 2.6-.2 1-.5 2-.7 3-.2.9-.5 1.8-.7 2.7-.3 1-.5 1.9-.8 2.9-.2.9-.5 1.8-.8 2.7-.3.9-.6 1.9-.8 2.8-.3.9-.5 1.8-.8 2.7-.3.9-.6 1.8-.9 2.8-.5 1.6-1.1 3.3-1.7 4.9-.3.9-.6 1.8-1 2.8-.4 1-.7 2-1.1 3-.3.8-.6 1.5-.9 2.3l-1.2 3c-.3.7-.6 1.5-.9 2.2-.4 1-.8 2-1.3 3l-.9 2.1c-.4 1-.9 2-1.4 3-.3.7-.6 1.3-.9 2-.5 1-1 2.1-1.5 3.1-.3.6-.6 1.1-.8 1.7-.6 1.1-1.1 2.2-1.7 3.3-.1.2-.2.3-.3.5-2.2 4.1-4.4 8.2-6.8 12.2-.2.4-.5.8-.7 1.2-.7 1.1-1.3 2.2-2 3.3-.3.5-.6.9-.9 1.4-.7 1.1-1.4 2.1-2 3.2-.3.5-.6.9-.9 1.4-.7 1.1-1.4 2.1-2.1 3.2-.3.4-.6.8-.8 1.2-.8 1.1-1.5 2.2-2.3 3.3-.2.2-.3.5-.5.7-37.6 54.7-94.5 91.4-160.1 102.4zm117.3-86.2c13-13 24.2-27.4 33.6-42.9v-71.3c0-2.1-1.6-3.7-3.7-3.7h-22.2c-2.1 0-3.7 1.6-3.7 3.7V326h-29.5V182c0-2.1-1.6-3.7-3.7-3.7h-22.1c-2.1 0-3.7 1.6-3.7 3.7v25.9h-29.5V182c0-2.1-1.6-3.7-3.7-3.7H304c-2.1 0-3.7 1.6-3.7 3.7v25.9h-29.5V182c0-4.8-6.5-3.7-9.5-3.7v-30.7c6.7-1.6 13.8-2.8 20.8-2.8 8.8 0 16.8 3.5 25.4 3.5 3.7 0 22.4-.9 22.4-6.5V93.4c0-2.1-1.6-3.7-3.7-3.7-4.2 0-12.2 3.5-19.4 3.5-7.9 0-16.9-3.5-26.3-3.5-6.5 0-12.9.9-19.2 2.3v-3.9c4.4-2.1 7.4-6.7 7.4-11.5 0-16.8-25.4-16.8-25.4 0 0 4.8 3 9.5 7.4 11.5v90.2c-3 0-9.5-1.1-9.5 3.7v25.9h-29.5V182c0-2.1-1.6-3.7-3.7-3.7h-22.2c-2.1 0-3.7 1.6-3.7 3.7v25.9h-29.5V182c0-2.1-1.6-3.7-3.7-3.7h-22.1c-2.1 0-3.7 1.6-3.7 3.7v144H93.5v-25.8c0-2.1-1.6-3.7-3.7-3.7H67.7c-2.1 0-3.7 1.6-3.7 3.7v71.3c9.4 15.5 20.6 29.9 33.6 42.9 20.6 20.6 44.5 36.7 71.2 48 13.9 5.9 28.2 10.3 42.9 13.2v-75.8c0-58.6 88.6-58.6 88.6 0v75.8c14.7-2.9 29-7.4 42.9-13.2 26.7-11.3 50.6-27.4 71.2-48"/></svg>',
			tpl: '<div class="{{Alignment}}" style="{{Margin top}}{{Margin bottom}}">' +
					 '<a {{URL}} class="no-underline caxton-icon {{Glow/Shadow}}{{Icon}}" ' +
					 'data-hover-css="{{Hover Text color}}{{Hover Background color}}{{Hover Border color}}" ' +
					 'style="{{Icon color}}{{Background color}}{{Icon size}}{{Icon variant}}' +
					 'border:{{Border weight}} solid {{Border color}};' +
					 '{{Padding}}{{Border radius}};' +
					 '{{Icon Glow/Shadow}};" ' +
					 'data-mobile-css="{{Icon size mobile}}" ' +
					 'data-tablet-css="{{Icon size tablet}}" ' +
					 'data-desktop-css="{{Icon size}}">' +
					 '</a></div>',
			fields: {
				'Icon': {
					section: 'Layout',
					type: 'icon',
					default: 'fab fa-font-awesome-flag'
				},
				'URL': {
					section: 'Layout',
					type: 'text',
					tpl: 'href="%s"',
				},
				'Padding': {
					type: 'range',
					section: 'Layout',
					min: 0,
					default: .25,
					max: 5,
					step: 0.05,
					tpl: 'padding:%sem;',
				},
				'Margin top': {
					type: 'range',
					section: 'Layout',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-top:%sem;',
				},
				'Margin bottom': {
					type: 'range',
					section: 'Layout',
					min: 0,
					max: 10,
					step: 0.5,
					tpl: 'margin-bottom:%sem;',
				},
				'Border radius': {
					type: 'range',
					section: 'Layout',
					min: 0,
					max: 50,
					tpl: 'border-radius:%s%;',
				},

				'Icon size': {
					type: 'range',
					min: 5,
					max: 250,
					default: 16,
					tpl: 'font-size:%spx;',
					section: 'Typography',
				},
				'Icon size tablet': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
					section: 'Typography',
				},
				'Icon size mobile': {
					type: 'range',
					min: 5,
					max: 250,
					tpl: 'font-size:%spx;',
					section: 'Typography',
				},
				'Alignment': {
					type: 'radio',
					options: [
						{value: ' tl', label: 'Left',},
						{value: ' tc', label: 'Center',},
						{value: ' tr', label: 'Right',},
					],
					default: ' tl',
					section: 'Typography',
				},
				'Icon variant': {
					type: 'select',
					default: 900,
					options: [
						{value: '100', label: 'Light',},
						{value: '400', label: 'Regular',},
						{value: '900', label: 'Solid',},
					],
					help: 'Depends on availability of icon in style.',
					tpl: 'font-weight:%s;',
					section: 'Typography',
				},

				'Icon color': {
					type: 'color',
					default: '#555',
					tpl: 'color:%s;',
					section: 'Color and decoration',
				},
				'Background color': {
					type: 'color',
					tpl: 'background-color:%s;',
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
				'Border color': {
					type: 'color',
					section: 'Color and decoration',
				},
				'Glow/Shadow': {
					type: 'select',
					options: [
						{value: '', label: 'None',},
						{value: ' glow', label: 'Glow',},
						{value: ' shadow', label: 'Shadow',},
					],
					section: 'Color and decoration',
				},

				'Icon Glow/Shadow': {
					type: 'select',
					options: [
						{value: '', label: 'No shadow/glow',},
						{value: '255,255,255', label: 'Glow',},
						{value: '0,0,0', label: 'Shadow',},
					],
					section: 'Icon Glow/Shadow',
					tpl: 'text-shadow:{{Shadow Horizontal Offset}} {{Shadow Vertical Offset}} {{Shadow Blur}} rgba(%s,{{Shadow Strength}});',
				},
				'Shadow Horizontal Offset': {
					type: 'range',
					tpl: '%spx ',
					default: 0,
					min: - 25,
					max: 25,
					section: 'Icon Glow/Shadow',
				},
				'Shadow Vertical Offset': {
					type: 'range',
					tpl: '%spx ',
					default: 0,
					min: - 25,
					max: 25,
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
			},
		} );

		registerBlockType(
			'caxton/posts-grid',
			{
				title: 'Posts grid',
				icon: 'screenoptions',
				category: 'widgets',

				attributes: {
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
				edit: withAPIData( function ( props ) {
					var attrs = $.extend( {
						cat: [],
						order: 'date/desc',
						rows: 4,
						columns: 2,
					}, props.attributes );

					var
						order = attrs.order.split( '/' ),
						url =
							'/caxton/v1/posts' +
							'?posts_per_page=' + (
								attrs.rows * attrs.columns
							) +
							'&post__not_in=' + caxton.post +
							'&cat=' + attrs.cat +
							(
								attrs.displayPostWithoutImages ? '&meta_key=' : ''
							) +
							'&orderby=' + order[0] +
							'&order=' + order[1];
					return {posts: url};
				} )( function ( props ) {
					var attrs = $.extend( {
						cat: '',
						order: 'date/desc',
						rows: 4,
						columns: 2,
						titleSize: 20,
					}, props.attributes );

					var post, gridInfo,
						commentIcon = '<span class="fa fa-comments"></span>',
						authorIcon = '<span class="fa fa-user-circle-o"></span>',
						grids = [],
						focus = props.focus,
						className = props.className + ' ' + props.name.replace( '/', '-' ) + ' caxton-grid';

					className += ' caxton-' + attrs.imagesType + '-images';

					console.log( attrs.rows * attrs.columns );
					if ( attrs.titleBelowImage ) {
						className += ' caxton-title-below-image';
					}

					if ( ! props.posts.data ) {
						grids.push( el( 'div', {className: 'caxton-notification',}, 'Loading posts...' ) );
					} else if ( props.posts.data.length === 0 ) {
						grids.push( el( 'div', {className: 'caxton-notification',}, 'No posts match criteria.' ) );
					} else {
						for ( var i = 0; i < props.posts.data.length; i ++ ) {
							post = props.posts.data[i];

							function postMetaMarkup() {
								if ( attrs.displayMeta ) {
									return {__html: '<span class="author">' + authorIcon + post.author + '</span><span class="comments">' + commentIcon + ' ' + post.comments + '</span>'};
								} else {
									return {__html: ''};
								}
							};
							gridInfo = [
								el( 'a', {className: 'grid-link', href: '#',},
									el( 'div', {className: 'grid-image', style: {backgroundImage: 'url(' + post.thumb_ml + ')'},},
										el( 'h3', {className: 'grid-title', style: {fontSize: attrs.titleSize},}, post.title ),
									),
								)
							];

							gridInfo.push( el( 'h3', {className: 'grid-title', style: {fontSize: attrs.titleSize},}, post.title ) );

							if ( attrs.displayDate ) {
								gridInfo.push( el( 'time', {}, post.date ) );
							}

							if ( attrs.displayExcerpt ) {
								gridInfo.push( el( 'p', {}, post.excerpt ) );
							}

							gridInfo.push( el( 'div', {className: 'grid-meta', dangerouslySetInnerHTML: postMetaMarkup()}, ), );

							grids.push(
								el(
									'div',
									{
										className: 'grid-item',
										style: {
											width: (
															 100 / attrs.columns - 2
														 ) + '%'
										}
									},
									gridInfo
								)
							);
						}
					}
					return [
						! ! focus && el(
							InspectorControls,
							{key: 'inspector'},
							el(
								components.SelectControl,
								{
									label: 'Category',
									value: attrs.cat,
									instanceId: 'caxton-postCats',
									options: caxton.postCategories,
									onChange: function ( val ) {
										props.setAttributes( {cat: val} );
									}
								}
							),
							el(
								components.SelectControl,
								{
									label: 'Order',
									value: attrs.order,
									options: [
										{label: __( 'Newest to Oldest' ), value: 'date/desc',},
										{label: __( 'Oldest to Newest' ), value: 'date/asc',},
										{label: __( 'A → Z' ), value: 'title/asc',},
										{label: __( 'Z → A' ), value: 'title/desc',},
									],
									onChange: function ( val ) {
										props.setAttributes( {order: val} );
									}
								}
							),
							el(
								components.SelectControl,
								{
									label: 'Images shape',
									value: attrs.imagesType,
									options: [
										{label: __( 'Square' ), value: '',},
										{label: __( 'Circle' ), value: 'circle',},
										{label: __( 'Rectangle' ), value: 'rectangle',},
									],
									onChange: function ( val ) {
										props.setAttributes( {imagesType: val} );
									}
								}
							),
							el(
								components.ToggleControl,
								{
									label: 'Include posts without image',
									checked: attrs.displayPostWithoutImages,
									onChange: function ( val ) {
										if ( val.target ) {
											props.setAttributes( {displayPostWithoutImages: val.target.checked} );
										} else {
											props.setAttributes( {displayPostWithoutImages: val} );
										}
									}
								}
							),
							el(
								components.ToggleControl,
								{
									label: 'Display post date',
									checked: attrs.displayDate,
									onChange: function ( val ) {
										if ( val.target ) {
											props.setAttributes( {displayDate: val.target.checked} );
										} else {
											props.setAttributes( {displayDate: val} );
										}
									}
								}
							),
							el(
								components.ToggleControl,
								{
									label: 'Display post meta',
									checked: attrs.displayMeta,
									onChange: function ( val ) {
										if ( val.target ) {
											props.setAttributes( {displayMeta: val.target.checked} );
										} else {
											props.setAttributes( {displayMeta: val} );
										}
									}
								}
							),
							el(
								components.ToggleControl,
								{
									label: 'Display post excerpt',
									checked: attrs.displayExcerpt,
									onChange: function ( val ) {
										if ( val.target ) {
											props.setAttributes( {displayExcerpt: val.target.checked} );
										} else {
											props.setAttributes( {displayExcerpt: val} );
										}
									}
								}
							),
							el(
								components.ToggleControl,
								{
									label: 'Show title below image',
									checked: attrs.titleBelowImage,
									onChange: function ( val ) {
										if ( val.target ) {
											props.setAttributes( {titleBelowImage: val.target.checked} );
										} else {
											props.setAttributes( {titleBelowImage: val} );
										}
									}
								}
							),
							el(
								components.RangeControl,
								{
									label: 'Title size',
									value: attrs.titleSize,
									onChange: function ( val ) {
										props.setAttributes( {titleSize: val} );
									},
									min: 10,
									max: 50,
								}
							),
							el(
								components.RangeControl,
								{
									label: 'Post columns',
									value: attrs.columns,
									onChange: function ( val ) {
										props.setAttributes( {columns: val} );
									},
									min: 1,
									max: 5,
								}
							),
							el(
								components.RangeControl,
								{
									label: 'Post rows',
									value: attrs.rows,
									onChange: function ( val ) {
										props.setAttributes( {rows: val} );
									},
									min: 1,
									max: 20,
								}
							)
						),
						el( 'div', {className: className}, grids )
					];
				} ),

				save: function () {
					// Rendering in PHP
					return null;
				},
			}
		);

	}
)( jQuery, wp.blocks, wp.element.createElement, wp.components.withAPIData, window.wp.i18n, wp.components );
