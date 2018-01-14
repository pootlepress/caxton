/**
 * Plugin front end scripts
 *
 * @package Caxton
 * @version 1.0.0
 */
jQuery( function ( $ ) {

	var
		el = wp.element.createElement,
		registerBlockType = wp.blocks.registerBlockType,
		withAPIData = wp.components.withAPIData;

	registerBlockType( 'my-plugin/latest-post', {
		title: 'Latest Post',
		icon: 'megaphone',
		category: 'widgets',

		edit: withAPIData( function() {
			return {
				posts: '/wp/v2/posts?per_page=1'
			};
		} )( function( props ) {
			if ( ! props.posts.data ) {
				return "loading !";
			}
			if ( props.posts.data.length === 0 ) {
				return "No posts";
			}
			var className = props.className;
			var post = props.posts.data[ 0 ];

			return el(
				'a',
				{ className: className, href: post.link },
				post.title.rendered
			);
		} ),

		save: function() {
			// Rendering in PHP
			return null;
		},
	} );

} );