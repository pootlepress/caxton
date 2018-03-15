/**
 * Plugin front end scripts
 *
 * @package Caxton
 * @version 1.0.0
 */
(
	function ( $, blocks, el, withAPIData, i18n ) {
		var
			registerBlockType = blocks.registerBlockType,
			InspectorControls = blocks.InspectorControls,
			__ = i18n.__;

        CaxtonBlock( {
            id: 'hero',
            title: 'Hero section',
            icon: 'archive',
            tpl:
            '<div class="cover bg-center" style="background-image:url([Background image]);[Background parallax]">' +
            '<div class="pv4 min-h-7 dt w-100 center-mid-children [Dim image][Full width][Full height]">' +
            '<div class="tc white ph3 ph4-l[Text position]">' +
            '<h2 style="color:[Title color];font-size:[Title size]px">[Title]</h2>' +
            '<p style="color:[Sub-title color];font-size:[Sub-title size]px">[Sub-title]</p>' +
            '<a href="[Button Link]" class="button" ' +
            'style="color:[Button text color];background:[Button background color];font-size:[Button size]px">' +
            '[Call to action button]</a></div></div></div>',
            fields: {
                'Background image': {
                    type: 'image',
                    default: ''
                },
                'Dim image': {
                    type: 'radio',
                    options: [
                        { value: ' bg-white-50', label: 'Lighter', },
                        { value: ' bg-white-30', label: 'Light', },
                        { value: '', label: "Don't dim", },
                        { value: ' bg-black-20', label: 'Dark', },
                        { value: ' bg-black-40', label: 'Darker', },
                    ],
                    default: ' bg-black-20',
                },
                'Text position': {
                    type: 'radio',
                    options: [
                        { value: ' mba', label: 'Top', },
                        { value: ' mva', label: 'Center', },
                        { value: ' mta', label: 'Bottom', },
                    ],
                    default: ' mva',
                },
                'Background parallax': {
                    type: 'checkbox',
                    value: 'background-attachment:fixed;',
                },
                'Full width': {
                    type: 'checkbox',
                    value: ' vw-100',
                },
                'Full height': {
                    type: 'checkbox',
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
                    type: 'range',
                    default: '16'
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
            id: 'hero-2-col',
            title: 'Hero - 2 columns',
            icon: 'archive',
            tpl:
            '<div class="cover bg-center" style="background-image:url([Background image]);[Background parallax]">' +
            '<div class="dt w-100 center-mid-children [Full width]">' +
            '<div class="min-h-7 p4 tc white ph3 ph4-l center-mid-children [Horizontal position][Content position][Dim image][Full height]">' +
            '<h2 style="color:[Title color];font-size:[Title size]px">[Title]</h2>' +
            '<div style="color:[Sub-title color];font-size:[Sub-title size]px">[Sub-title]</div>' +
            '<a href="[Button Link]" class="button" ' +
            'style="color:[Button text color];background:[Button background color];font-size:[Button size]px">' +
            '[Call to action button]</a></div></div></div>',
            fields: {
                'Background image': {
                    type: 'image',
                    default: ''
                },
                'Dim image': {
                    type: 'radio',
                    options: [
                        { value: ' bg-white-50', label: 'Lighter', },
                        { value: ' bg-white-30', label: 'Light', },
                        { value: '', label: "Don't dim", },
                        { value: ' bg-black-20', label: 'Dark', },
                        { value: ' bg-black-40', label: 'Darker', },
                    ],
                    default: ' bg-white-30',
                },
                'Horizontal position': {
                    type: 'radio',
                    options: [
                        { value: ' mra', label: 'Left', },
                        { value: ' mla', label: 'Right', },
                    ],
                    default: ' mra',
                },
                'Content position': {
                    type: 'radio',
                    options: [
                        { value: ' mra', label: 'Left', },
                        { value: ' mha', label: 'Center', },
                        { value: ' mla', label: 'Right', },
                    ],
                    default: ' mra',
                },
                'Background parallax': {
                    type: 'checkbox',
                    value: 'background-attachment:fixed;',
                },
                'Full width': {
                    type: 'checkbox',
                    value: ' vw-100',
                },
                'Full height': {
                    type: 'checkbox',
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
                'Button Link': {
                    type: 'range',
                    default: '16'
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
							'?posts_per_page=' + (attrs.rows * attrs.columns) +
							'&post__not_in=' + caxton.post +
							'&cat=' + attrs.cat +
							( attrs.displayPostWithoutImages ? '&meta_key=' : '' ) +
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

					className += ' caxton-'+ attrs.imagesType + '-images';

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
									return { __html: '<span class="author">' + authorIcon + post.author + '</span><span class="comments">' + commentIcon + ' ' + post.comments + '</span>' };
								} else {
									return { __html: '' };
								}
							};
							gridInfo = [
								el( 'a', {className: 'grid-link', href: '#',},
									el( 'div', {className: 'grid-image', style: {backgroundImage: 'url(' + post.thumb_ml + ')'},},
										el( 'h3', {className: 'grid-title', style: {fontSize: attrs.titleSize}, }, post.title ),
									),
								)
							];

							gridInfo.push( el( 'h3', {className: 'grid-title', style: {fontSize: attrs.titleSize}, }, post.title ) );

							if ( attrs.displayDate ) {
								gridInfo.push( el( 'time', {}, post.date ) );
							}

							if ( attrs.displayExcerpt ) {
								gridInfo.push( el( 'p', {}, post.excerpt ) );
							}

							gridInfo.push( el( 'div', {className: 'grid-meta', dangerouslySetInnerHTML: postMetaMarkup() }, ), );

							grids.push(
								el(
									'div',
									{
										className: 'grid-item',
										style: { width: ( 100 / attrs.columns - 2 ) + '%'}
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
								InspectorControls.SelectControl,
								{
									label: 'Category',
									value: attrs.cat,
									options: caxton.postCategories,
									onChange: function ( val ) {
										props.setAttributes( {cat: val} );
									}
								}
							),
							el(
								InspectorControls.SelectControl,
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
								InspectorControls.SelectControl,
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
								InspectorControls.ToggleControl,
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
								InspectorControls.ToggleControl,
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
								InspectorControls.ToggleControl,
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
								InspectorControls.ToggleControl,
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
								InspectorControls.ToggleControl,
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
								InspectorControls.RangeControl,
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
								InspectorControls.RangeControl,
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
								InspectorControls.RangeControl,
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
)( jQuery, wp.blocks, wp.element.createElement, wp.components.withAPIData, window.wp.i18n );
