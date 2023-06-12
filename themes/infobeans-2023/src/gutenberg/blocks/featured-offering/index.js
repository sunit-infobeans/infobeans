import DisplayComponent from './DisplayComponent';
import SaveComponent from './SaveComponent';
import './featured';

const { registerBlockType } = wp.blocks;

const blockAttributes = {
	title: {
		type: 'string',
		default: '',
	},
	coloredTitle: {
		type: 'string',
		default: '',
	},
	linkText: {
		type: 'string',
		default: '',
	},
	linkUrl: {
		type: 'string',
		tagName: 'a',
	},
	columnOption: {
		type: 'string',
		default: 'default',
	},
	displayCTA: {
		type: 'string',
		default: true,
	},
};

registerBlockType('infobeans-2023/featured-offering', {
	title: 'featured-offering',
	icon: 'block-default',
	category: 'layout',
	attributes: blockAttributes,

	edit: DisplayComponent,
	save: SaveComponent,
});
