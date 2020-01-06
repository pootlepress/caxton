const $ = jQuery;
const __ = wp.i18n.__;
const el = wp.element.createElement;
export default function CaxtonEditor( props ) {
	props = {tag: 'div', elProps: {}, value: '', onChange: ( html ) => {}, ...props};

	props.elProps = {
		title: __( 'Click to Edit' ),
		'data-caxtoneditableprop': '',
		contentEditable: "true",
		onBlur: ( e ) => props.onChange( e.currentTarget.innerHTML ),
	};

	//`<${fld.tag} contentEditable="true" title="${c2e}" data-caxtoneditableprop="${fld.id}">${val}</${fld.tag}>`;

	props.elProps.dangerouslySetInnerHTML = {__html: props.value};

	return el( props.tag, props.elProps );
}

export class CaxtonEditorToolbar {
	constructor() {
		this.init();
	}

	init() {
		this.parent = document.querySelector( '.edit-post-editor-regions__content' );
		if ( ! this.parent ) {
			setTimeout( () => this.init(), 1000 );
			return;
		}
		this.addToolbar();
		this.addselectionHandler();
	}

	/**
	 *
	 * @param HTMLElement el
	 */
	wrapRange( el ) {
		el.appendChild( this.range.extractContents() );
		this.range.insertNode( el );
	}

	getButtons() {
		const wrapRange = el => this.wrapRange( el );
		return this.buttons = {
			bold: {
				label: 'Bold',
				callback: () => {
					document.execCommand( 'bold' );
				},
				html: '<i class="dashicons dashicons-editor-bold"></i>'
			},
			italic: {
				label: 'Italic',
				callback: () => {
					document.execCommand( 'italic' );
				},
				html: '<i class="dashicons dashicons-editor-italic"></i>'
			},
			underline: {
				label: 'Underline',
				callback: () => {
					document.execCommand( 'underline' );
				},
				html: '<i class="dashicons dashicons-editor-underline"></i>'
			},
			link: {
				label: 'Link',
				callback: () => {
					const link = prompt( 'URL for the page:' );
					wrapRange( $( '<a href="' + link + '" />' )[0] );
				},
				html: '<i class="dashicons dashicons-admin-links"></i>'
			},
		};
	}

	addselectionHandler() {
		const
			toolbar = this.toolbar,
			$p = $( this.parent );

		const maybeHideToolbar = () => {
			const sel = window.getSelection();
			if ( ! sel.toString() || ! $( sel.baseNode ).closest( '[data-caxtoneditableprop]' ).length ) {
				this.range = null;
				toolbar.hide();
			}
		};

		const showToolbar = () => {
			const rect = this.range.getBoundingClientRect();
			toolbar.css( {
				display: 'flex',
				top : rect.y + $p.scrollTop() - $p.offset().top,
				left: rect.x - $p.offset().left + rect.width / 2,
			} );
		};
		$( 'body' ).on( 'blur', '[data-caxtoneditableprop]', e => {
			debugger;
			setTimeout( maybeHideToolbar, 100 );
		} );
		$p.on( 'click mouseup keyup', '[data-caxtoneditableprop]', e => {
			const range = window.getSelection().getRangeAt( 0 );
			if ( range.toString() ) {
				this.range = range;
				showToolbar();
			} else {
				this.range = null;
				toolbar.hide();
			}
		} );
	}

	addToolbar() {
		const
			that = this,
			_buttons = this.getButtons();
		let buttons = Object.keys( _buttons ).map( k => {
			const btn = _buttons[k];
			return `<button type="button" aria-label="${btn.label}" data-action="${k}" class="">${btn.html}</button>`
		} ).join( '' );

		$( this.parent ).append( `<div id="caxton-toolbar" class="absolute flex" style="display:none">${buttons}</div>` );

		this.toolbar = $( '#caxton-toolbar' );

		this.toolbar.on( 'mousedown', '[data-action]', function ( e ) {
			e.preventDefault();
			e.stopPropagation();
			const range = window.getSelection().getRangeAt( 0 );
			if ( range.toString() ) {
				that.range = range;
				_buttons[$( this ).data( 'action' )].callback();
			} else {
				that.range = null;
				that.toolbar.hide();
			}

			return false;
		} );
	}
}