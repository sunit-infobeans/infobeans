import SaveComponent from './SaveComponent';
import DisplayComponent from './DisplayComponent';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('infobeans3/stats', {
	title: __('Stats', 'infobeans3'),
	icon: 'analytics',
	category: 'layout',
	supports: {
		multiple: false,
	},
	attributes: {
		statsData: {
			type: 'array',
			default: [],
		},
	},
	edit: DisplayComponent,
	save: SaveComponent,
});
