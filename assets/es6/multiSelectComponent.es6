import SortableList from './react-sortable-list.es6'

function optionEl( opt ) {
	const {el} = window.Caxton;
	return el(
		'div',
		{
			className : 'caxton-orderedselect-option',
			'data-val': opt.value,
			key       : `option-${opt.value}`,
		},
		(
			opt.image ? el( 'img', {src: opt.image} ) : null
		),
		opt.label
	);
}

export default function MultiSelectComponent( props ) {
	const {el} = window.Caxton;
	$ = window.jQuery;
	const [search, setSearch] = wp.element.useState( '' );
	const
		delimiter           = props.delimiter ? props.delimiter : ',',
		isMultiple          = typeof props.multiple === 'undefined' ? true : props.multiple,
		selectedOptionsData = {},
		selectedOptions     = {},
		availableOptions     = [];

	let
		opt, optEl,
		controlValue = props.value ? props.value.split( delimiter ) : [];

	for ( var i = 0; i < props.options.length; i ++ ) {
		opt = props.options[i];
		optEl = optionEl( opt );

		if ( typeof opt.value === 'number' ) {
			opt.value = opt.value.toString();
		}

		if ( - 1 !== controlValue.indexOf( opt.value ) ) {
			selectedOptionsData[opt.value] = opt;
			selectedOptions[opt.value] = optEl;
		} else {
			if ( availableOptions.length > 99 ) {
				continue;
			}
			if ( ! search || opt.label.toLowerCase().indexOf( search.toLowerCase() ) > - 1 ) {
				availableOptions.push( optEl );
			}
		}
	}
	if ( availableOptions.length < 2 ) {
		availableOptions.push( el( 'span', {
			className: 'caxton-placeholder o70',
			key      : 'placeholder',
		}, `No items found${search && ' for ' + search}...` ) )
	}

	availableOptions.splice( 0, 0, el( 'input', {
		className  : 'caxton-orderedselect-search',
		placeholder: 'Search...',
		value      : search,
		onChange   : ( {target} ) => setSearch( target.value ),
		key        : 'search',
	} ) );

	return el(
		'div',
		{
			className: 'caxton-orderedselect-wrap caxton-orderedselect-' +
								 ( isMultiple ? 'multiple' : 'single' ),
			key      : 'orderedselect-wrap',
		},
		el(
			'div', {
				className: 'caxton-orderedselect-selected',
				key      : 'selected-options',
				onClick( {target} ) {
					let val;
					const $target = $( target );
					// Remove items only if multiple is set
					if ( isMultiple && $target.hasClass( 'caxton-orderedselect-option' ) ) {
						val = $target.attr( 'data-val' );
						controlValue.splice( controlValue.indexOf( val ), 1 );
						props.onChange( controlValue.join( delimiter ) );
					} else {
						$target.closest( '.caxton-orderedselect-wrap' ).toggleClass( 'caxton-orderedselect-open' );
					}
				},
			},
			el( SortableList, {
				data: controlValue,
				renderItem: i => selectedOptions[i],
				onChange: order => {
					props.onChange( order.join( delimiter ) );
				}
			} ),
			! controlValue.length &&
			el( 'span', {
				className: 'caxton-placeholder o70',
				key      : 'placeholder',
			}, 'Please choose...' ),
			el( 'i', {
				className: 'dashicons dashicons-arrow-down',
				key      : 'down-arrow-icon',
			} )
		),
		el( 'div', {
			className: 'caxton-orderedselect-available',
			key      : 'available-options',
			onClick( {target} ) {
				let val;
				const $target = $( target );
				if ( $target.hasClass( 'caxton-orderedselect-option' ) ) {
					val = $target.attr( 'data-val' );
					if ( isMultiple ) {
						controlValue.push( val );
					} else {
						controlValue = [val];
						$target.closest( '.caxton-orderedselect-wrap' ).toggleClass( 'caxton-orderedselect-open' );
					}
					props.onChange( controlValue.join( delimiter ) );
				}
			},
		}, availableOptions )
	);
};