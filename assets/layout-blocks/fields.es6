export const gridFields = {
	'Background image'         : {
		type   : 'image',
		section: 'Background',
		tpl    : 'background-image:url(%s);',
	},
	'Background image position': {
		type   : 'position',
		section: 'Background',
		tpl    : 'background-position:%s;',
	},
	'Background parallax'      : {
		type   : 'toggle',
		value  : 'background-attachment:fixed;',
		section: 'Background',
	},
	'Background color'         : {
		type   : 'color',
		section: 'Background',
	},
	'Gradient color'           : {
		type   : 'color',
		section: 'Background',
		tpl    : ', %s',
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
		default: 'linear-gradient( ',
		section: 'Background',
		tpl    : 'background-image:%s{{Background color}}{{Gradient color}});',
	},
	'Background colors opacity': {
		type   : 'range',
		min    : 0,
		max    : 1,
		step   : .05,
		help   : 'Reduce opacity to have transparent colors over image',
		default: '1',
		section: 'Background',
		tpl    : 'opacity:%s;',
	},

	'Layout'                         : {
		type   : 'select',
		options: [
			{value: '', label: 'Normal',},
			{value: 'vw-100-bg', label: 'Full width background',},
			{value: 'vw-100', label: 'Full width content',},
		],
		section: 'Layout',
	},
	'Column gap'                     : {
		type   : 'select',
		options: [
			{value: 'grid-gap-none', label: 'None',},
			{value: 'grid-gap-tight', label: 'Tight',},
			{value: '', label: 'Normal',},
			{value: 'grid-gap-wide', label: 'Wide',},
			{value: 'grid-gap-wider', label: 'Wider',},
		],
		section: 'Layout',
	},
//	'Full height': {
//		type: 'toggle',
//		value: 'min-vh-100',
//		section: 'Layout',
//	},
	'Inner Padding top'              : {
		type   : 'range',
		section: 'Layout',
	},
	'Inner Padding left'             : {
		type   : 'range',
		max    : 70,
		section: 'Layout',
	},
	'Inner Padding bottom'           : {
		type   : 'range',
		section: 'Layout',
	},
	'Inner Padding right'            : {
		type   : 'range',
		max    : 70,
		section: 'Layout',
	},
	'Inner Padding left/right tablet': {
		type   : 'range',
		max    : 70,
		section: 'Layout',
	},
	'Inner Padding left/right mobile': {
		type   : 'range',
		max    : 70,
		section: 'Layout',
	},
	'Inner Padding unit'             : {
		type   : 'select',
		options: [
			{value: 'vw', label: 'Responsive',},
			{value: 'px', label: 'Pixels x 5',},
		],
		default: 'px',
		section: 'Layout',
	},
};

export const sectionFields = {
	'Inner Padding top'              : {
		type   : 'range',
		section: 'Layout',
		default: 1,
	},
	'Inner Padding bottom'           : {
		type   : 'range',
		section: 'Layout',
		default: 1,
	},
	'Inner Padding left'             : {
		type   : 'range',
		max    : 50,
		section: 'Layout',
		default: 1,
	},
	'Inner Padding right'            : {
		type   : 'range',
		max    : 50,
		section: 'Layout',
		default: 1,
	},
	'Inner Padding left/right tablet': {
		type   : 'range',
		max    : 50,
		section: 'Layout',
		default: 1,
	},
	'Inner Padding left/right mobile': {
		type   : 'range',
		max    : 50,
		section: 'Layout',
		default: 1,
	},
	'Inner Padding unit'             : {
		type   : 'select',
		options: [
			{value: 'vw', label: 'Responsive',},
			{value: 'px', label: 'Pixels x 5',},
		],
		default: 'px',
		section: 'Layout',
	},
	'Background image'               : {
		type   : 'image',
		section: 'Background',
		tpl    : 'background-image:url(%s);',
	},
	'Background image position'      : {
		type   : 'position',
		section: 'Background',
		tpl    : 'background-position:%s;',
	},
	'Background parallax'            : {
		type   : 'toggle',
		value  : 'background-attachment:fixed;',
		section: 'Background',
	},
	'Background color'               : {
		type   : 'color',
		section: 'Background',
	},
	'Gradient color'                 : {
		type   : 'color',
		section: 'Background',
		tpl    : ', %s',
	},
	'Gradient type'                  : {
		type   : 'select',
		options: [
			{value: 'linear-gradient( ', label: 'Linear vertical',},
			{value: 'linear-gradient( 90deg, ', label: 'Linear horizontal',},
			{value: 'linear-gradient( 45deg, ', label: 'Linear 45 deg',},
			{value: 'linear-gradient( -45deg, ', label: 'Linear 45 deg anticlockwise',},
			{value: 'radial-gradient( ', label: 'Radial gradient',},
		],
		default: 'linear-gradient( ',
		section: 'Background',
		tpl    : 'background-image:%s{{Background color}}{{Gradient color}});',
	},
	'Background colors opacity'      : {
		type   : 'range',
		min    : 0,
		max    : 1,
		step   : .05,
		help   : 'Reduce opacity to have transparent colors over image',
		default: '1',
		section: 'Background',
		tpl    : 'opacity:%s;',
	},
	'Grid area'                      : {
		type       : 'text',
		description: 'Specify grid-area CSS property.',
		section    : 'Jedi controls',
		default    : 'span 1 / span 4 / auto / auto',
	},
};
