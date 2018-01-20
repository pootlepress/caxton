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
			InspectorControls = wp.blocks.InspectorControls,
			__ = i18n.__;

		registerBlockType(
			'caxton/posts-grid',
			{
				title: 'Posts grid',
				icon: 'screenoptions',
				category: 'widgets',

				attributes: {
					cat: {
						type: 'array',
					},
					order: {
						type: 'string',
					},
					displayDate: {
						type: 'string',
					},
					displayExcerpt: {
						type: 'string',
					},
					rows: {
						type: 'string',
					},
					columns: {
						type: 'string',
					},
				},
				edit: withAPIData( function ( props ) {
					props.attributes = $.extend( {
						cat: '',
						order: 'date/desc',
						rows: 4,
						columns: 2,
					}, props.attributes );

					var
						order = props.attributes.order.split( '/' ),
						url =
							'/caxton/v1/posts' +
							'?posts_per_page=' + ( props.attributes.rows * props.attributes.columns ) +
							'&cat=' + ( props.attributes.cat ) +
							'&orderby=' + order[0] +
							'&order=' + order[1];
					console.log( url );
					return { posts: url };
				} )( function ( props ) {

					var attrs = $.extend( {
						cat: '',
						order: 'date/desc',
						rows: 4,
						columns: 2,
						displayDate: false,
						displayExcerpt: false,
					}, props.attributes );

						var post, gridInfo,
							grids = [],
							focus = props.focus,
							className = props.className + ' ' + props.name.replace( '/', '-' ) + ' caxton-grid';

					if ( ! props.posts.data ) {
						grids.push( el( 'div', {className: 'caxton-notification',}, 'Loading posts...' ) );
					} else if ( props.posts.data.length === 0 ) {
						grids.push( el( 'div', {className: 'caxton-notification',}, 'No posts match criteria.' ) );
					} else {
						for ( var i = 0; i < props.posts.data.length; i ++ ) {
							post = props.posts.data[i];
							gridInfo = [
								el( 'a', {className: 'grid-link', href: post.link,},
									el( 'div', {className: 'grid-image', style: {backgroundImage: 'url(' + post.thumb_ml + ')'},},
										el( 'h3', {className: 'grid-title',}, post.title )
									),
								)
							];

							if ( attrs.displayDate ) {
								gridInfo.push( el( 'date', {}, post.date ) );
							}

							if ( attrs.displayExcerpt ) {
								gridInfo.push( el( 'p', {}, post.excerpt ) );
							}

							grids.push(
								el(
									'div',
									{
										className: 'grid-item',
										style: {width: 100 / attrs.columns + '%'}
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
									instanceId: 'caxton-postCats',
									multiple: 'multiple',
									options: caxton.postCategories,
									onChange: function ( val ) {
										val = $( '.wp-admin select[multiple]' ).val();

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
										{ label: __( 'Newest to Oldest' ),	value: 'date/desc', },
										{ label: __( 'Oldest to Newest' ),	value: 'date/asc', },
										{ label: __( 'A → Z' ),							value: 'title/asc', },
										{ label: __( 'Z → A' ),							value: 'title/desc', },
									],
									onChange: function ( val ) {
										props.setAttributes( {order: val } );
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
											props.setAttributes( { displayDate: val.target.checked } );
										} else {
											props.setAttributes( { displayDate: val } );
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
											props.setAttributes( { displayExcerpt: val.target.checked } );
										} else {
											props.setAttributes( { displayExcerpt: val } );
										}
									}
								}
							),
							el(
								InspectorControls.RangeControl,
								{
									label: 'Post columns',
									value: attrs.columns,
									onChange: function ( val ) {
										props.setAttributes( {columns: val } );
									},
									min: 1,
									max: 4,
								}
							),
							el(
								InspectorControls.RangeControl,
								{
									label: 'Post rows',
									value: attrs.rows,
									onChange: function ( val ) {
										props.setAttributes( {rows: val } );
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
