import {htmlFields} from "./fields.es6";


export default function CaxtonHTMLBlockSetup( el ) {
	let editor = caxtonWPEditor;

	function render( props, block, childrenBlocks ) {
		const el = wp.element.createElement;
		var
			cls      = 'relative', padUnit, padT, padL, padB, padR,
			blkProps = {
				className        : 'relative caxton-html-block',
				'data-mobile-css': '',
				'data-tablet-css': '',
				key              : 'block',
			},
			padMob   = block.attrs['Inner Padding left/right tablet'],
			padTab   = block.attrs['Inner Padding left/right mobile'];

		if ( block.name === 'caxon/horizontal' ) {
			blkProps.className = 'relative caxton-listing-block';
		}

		padUnit = block.attrs['Inner Padding unit'];
		padT = block.attrs['Inner Padding top'];
		padL = block.attrs['Inner Padding left'];
		padB = block.attrs['Inner Padding bottom'];
		padR = block.attrs['Inner Padding right'];

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

		blkProps.style = {
			'paddingTop'    : padT,
			'paddingLeft'   : padL,
			'paddingBottom' : padB,
			'paddingRight'  : padR,
			'justifyContent': block.attrs['Alignment'],
			'alignItems'    : block.attrs['Alignment'],
		};

		blkProps['data-desktop-css'] = 'padding-left:' + padL + ';padding-right:' + padR + ';';
		blkProps['data-mobile-css'] = 'padding-left:' + padMob + 'em;padding-right:' + padMob + 'em;';
		blkProps['data-tablet-css'] = 'padding-left:' + padTab + 'em;padding-right:' + padTab + 'em;';

		if ( block.attrs['Column gap'] ) {
			blkProps.className += ' ' + block.attrs['Column gap'];
		}

		const minHi = block.attrs['Minimum content height'];
		if ( block.attrs['Content height unit'] === 'px' ) {
			blkProps.style['minHeight'] = (
																			minHi * 10
																		) + 'px';
		} else {
			blkProps.style['minHeight'] = minHi + block.attrs['Content height unit'];
		}

		if ( block.attrs['Content direction'] ) {
			blkProps.style['flexDirection'] = block.attrs['Content direction'];
		}

		if ( block.attrs['Items margin'] ) {
			blkProps.style['--caxton-gap'] = block.attrs['Items margin'] + 'px';
		}

		if ( block.attrs['Content justify'] ) {
			blkProps.style['justifyContent'] = block.attrs['Content justify'];
		}

		if ( block.attrs['Mobile Alignment'] ) {
			blkProps['data-mobile-css'] += 'justify-content:' + block.attrs['Mobile Alignment'] + ';';
			blkProps['data-desktop-css'] += 'justify-content:' + blkProps.style['justifyContent'] + ';';
		}

		if ( block.attrs['Tablet Alignment'] ) {
			blkProps['data-tablet-css'] += 'justify-content:' + block.attrs['Tablet Alignment'] + ';';
			blkProps['data-desktop-css'] += 'justify-content:' + blkProps.style['justifyContent'] + ';';
		}

		return el(
			'div', {
				className: cls,
				key      : 'caxton-flex-block-wrap',
			},
			[
				// Background div
				el( 'div', {key: 'bg', className: 'absolute absolute--fill', dangerouslySetInnerHTML: block.outputHTML( '{{Background}}' )} ),
				// Blocks inserter
				el( 'div', blkProps,
					childrenBlocks
				)
			]
		);
	}

	CaxtonBlock( {
		id        : 'caxton/html',
		title     : 'Super content',
		icon      : 'text',
		category  : 'caxton',
		fields    : htmlFields,
		attributes: {
			content: {
				type: 'string',
			}
		},
		edit      : function ( props, block ) {
			let
				tabStateMan   = wp.element.useState( 'rich' ),
				activeTab     = tabStateMan[0],
				setActiveTab  = tabStateMan[1],
				tabContent,
				updateContent = newContent => props.setAttributes( {content: newContent} ),
				tabProps      = {
					href   : '#_',
					onClick: function ( e ) {
						e.preventDefault();
						setActiveTab( e.target.getAttribute( 'data-tab' ) );
					}
				},
				tabs          = [
					el( 'a', Object.assign( tabProps, {
						className              : 'nav-tab' + (
							activeTab === 'rich' ? ' nav-tab-active' : ''
						), key: 'i', 'data-tab': 'rich'
					} ), 'Editor' ),
					el( 'a', Object.assign( tabProps, {
						className              : 'nav-tab' + (
							activeTab === 'code' ? ' nav-tab-active' : ''
						), key: 'c', 'data-tab': 'code'
					} ), 'Code' ),
				];
			if ( activeTab === 'rich' ) {
				tabContent = render( props, block, el(
					Caxton.Editor, {
						value   : props.attributes.content || 'Put in your content here!',
						onChange: updateContent
					}
				) );
			} else {
				tabContent = el(
					editor.PlainText,
					{
						value   : props.attributes.content || 'Put in your content here!',
						onChange: updateContent
					}
				);
			}

			console.log( Caxton.el2html( el(
				'div', {key: 'html-block-tabs'},
				el( 'header', {className: "nav-tab-wrapper", key: 'nav'}, tabs ),
				el( 'div', {key: 'tabcontent', className: 'pv4 ph3 bg-white',}, tabContent )
			) ) );

			return el(
				'div', { key: 'html-block-tabs'},
				el( 'header', {className: "nav-tab-wrapper", key: 'nav'}, tabs ),
				el( 'div', {key: 'tabcontent', className: 'pv4 ph3',}, tabContent )
			);
		},
		save      : function ( props, block ) {
			return render( props, block, el(
				'div', {},
				Caxton.html2el( props.attributes.content )
				)
			);
		},
	} );
}