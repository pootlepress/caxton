export const gridFields = {
	'Background'         : {
		type   : 'background',
		section: 'Background',
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

	'Mobile layout': {
		type      : 'select',
		section   : 'Responsive layout',
		childField: 'Mobile grid area',
	},

	'Tablet layout': {
		type      : 'select',
		section   : 'Responsive layout',
		childField: 'Tablet grid area',
	},

};

export const sectionFields = {
	'Background'         : {
		type   : 'background',
		section: 'Background',
	},
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
	'Grid area'                      : {
		type       : 'text',
		description: 'Change grid-area CSS property.',
		section    : 'Jedi controls',
		default    : 'span 1 / span 4 / auto / auto',
	},
	'Tablet grid area'               : {
		type       : 'text',
		description: 'Change grid-area CSS property for Tablet devices.',
		section    : 'Jedi controls',
	},
	'Mobile grid area'               : {
		type       : 'text',
		description: 'Change grid-area CSS property for Mobile devices.',
		section    : 'Jedi controls',
	},
};

export const listingFields = {
	'Background'         : {
		type   : 'background',
		section: 'Background',
	},
	'Alignment'                      : {
		type   : 'select',
		section: 'Layout',
		options: [
			{value: 'flex-start', label: 'Left',},
			{value: 'center', label: 'Center',},
			{value: 'flex-end', label: 'Right',},
			{value: 'space-between', label: 'Justify',},
		],
		default: 1,
	},
	'Vertical Alignment'             : {
		type   : 'select',
		section: 'Layout',
		options: [
			{value: 'flex-start', label: 'Top',},
			{value: 'center', label: 'Center',},
			{value: 'flex-end', label: 'Bottom',},
		],
		default: 1,
	},
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
	'Tablet Alignment'               : {
		type   : 'select',
		section: 'Layout',
		options: [
			{value: 'flex-start', label: 'Left'},
			{value: 'center', label: 'Center'},
			{value: 'flex-end', label: 'Right'},
			{value: 'space-between', label: 'Justify'},
		],
		default: 1,
	},
	'Mobile Alignment'               : {
		type   : 'select',
		section: 'Layout',
		options: [
			{value: 'flex-start', label: 'Left'},
			{value: 'center', label: 'Center'},
			{value: 'flex-end', label: 'Right'},
			{value: 'space-between', label: 'Justify'},
		],
		default: 1,
	},
};

export const tplFields = {
	'Background'         : {
		type   : 'background',
		section: 'Background',
	},
	'Alignment'                      : {
		type   : 'select',
		section: 'Layout',
		options: [
			{value: 'flex-start', label: 'Left',},
			{value: 'center', label: 'Center',},
			{value: 'flex-end', label: 'Right',},
			{value: 'space-between', label: 'Justify',},
		],
		default: 1,
	},
	'Vertical Alignment'             : {
		type   : 'select',
		section: 'Layout',
		options: [
			{value: 'flex-start', label: 'Top',},
			{value: 'center', label: 'Center',},
			{value: 'flex-end', label: 'Bottom',},
		],
		default: 1,
	},
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
};
