import DisplayStatsItemsComponent from './DisplayStatsItemComponent';
import SaveStatsItemComponent from './SaveStatsItemComponent';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('idg-b2b-base-theme/stats-item', {
  title: __('Stats Item', 'idg-b2b-base-theme'),
  icon: 'analytics',
  category: 'layout',
  attributes: {
    percentValue: {
      type: 'string',
      default: '',
    },
    description: {
      type: 'string',
      default: '',
    },
  },
  supports: {
    multiple: false,
  },
  parent: ['idg-b2b-base-theme/stats'],
  edit: DisplayStatsItemsComponent,
  save: SaveStatsItemComponent,
});
