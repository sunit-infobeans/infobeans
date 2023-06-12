import DisplayComponentItem from './DisplayComponentItem';
import SaveComponentItem from './SaveComponentItem';

const { registerBlockType } = wp.blocks;
const blockAttributes = {
	heading: {
		type: 'string',
		default: '',
	},
	shortDescription: {
		type: 'string',
		default: '',
	},
	InnerLinkText: {
		type: 'string',
		default: '',
	},
	InnerLinkUrl: {
		type: 'string',
		default: '',
	},
	iconUrl: {
		type: 'string',
		default: '',
	},
	columnOption: {
		type: 'string',
		default: 'default',
	},
	iconId: {
		type: 'number',
	},
};
registerBlockType('infobeans-2023/featured', {
	title: 'featured',
	icon: 'admin-user',
	category: 'layout',
	parent: ['infobeans-2023/featured-offering'],
	// supports: {
	//   reusable: false,
	//   html: false,
	// },
	attributes: blockAttributes,

	edit: DisplayComponentItem,
	save: SaveComponentItem,
	// edit:() => <p>edit</p>,
	// save: () => null,
});
