import DisplayComponent from './DisplayComponent';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const I18N_DOMAIN = 'infobeans-2023';

const blockAttributes = {
	id: {
		type: 'number',
	},
	alt: {
		type: 'string',
	},
	url: {
		type: 'string',
	},
	text: {
		type: 'string',
	},
	designation: {
		type: 'string',
	},
	companyName: {
		type: 'string',
	},
	sectionBgColor: {
		type: 'string',
	},
	alignment: {
		type: 'string',
		default: 'center',
	},
	type: {
		type: 'string',
		default: 'category',
	},
	selectedPosts: {
		type: 'array',
	},
	filters: {
		default: '[]',
		type: 'string',
	},
	placeholderPosts: {
		type: 'array',
		default: [],
	},
};

registerBlockType('infobeans-2023/testimonials', {
	title: __('Testimonials', I18N_DOMAIN),
	icon: 'testimonial',
	category: 'widgets',
	attributes: blockAttributes,
	supports: {
		multiple: true,
	},
	edit: DisplayComponent,
	save: () => null,
});
