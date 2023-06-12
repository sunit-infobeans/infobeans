import DisplayComponent from './DisplayComponents';

const { registerBlockType } = wp.blocks;

const blockAttributes = {
	title: {
		type: 'string',
		tagName: 'div',
	},
	titleColor: {
		type: 'string',
		default: 'white',
	},
	backgroundColor: {
		type: 'string',
		default: '#aa142d',
	},
	content: {
		type: 'string',
		tagName: 'p',
	},
	imageID: {
		type: 'number',
	},
	backgroundImage: {
		type: 'string',
		default: null,
	},
	backgroundImage1: {
		type: 'string',
		default: null,
	},
	backgroundImage2: {
		type: 'string',
		default: null,
	},
	linkText: {
		type: 'string',
		default: 'JOIN OUR TEAM',
	},
	linkUrl: {
		type: 'string',
		tagName: 'a',
	},
	opensInNewTab: {
		type: 'boolean',
		default: true,
	},
};

registerBlockType('infobeans-2023/career', {
	title: 'Career Block',
	icon: 'businessperson',
	category: 'widgets',
	attributes: blockAttributes,

	edit: DisplayComponent,
	save: () => null,
});
