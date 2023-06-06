/**
 * External dependencies.
 */
import { times } from 'lodash';

const { useDispatch, useSelect } = wp.data;
const { useEffect, Fragment } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const { createBlock } = wp.blocks;
const { Button } = wp.components;
const { __ } = wp.i18n;

const ALLOWED_BLOCKS = ['infobeans3/stats-item'];

const TEMPLATE = [['infobeans3/stats-item', {}]];

const I18N_DOMAIN = 'infobeans3';

const DisplayComponent = ({ attributes, setAttributes, clientId }) => {
	const { replaceInnerBlocks } = useDispatch('core/block-editor');
	const { innerBlocks } = useSelect(select => ({
		innerBlocks: select('core/block-editor').getBlocks(clientId),
	}));

	const addTemplate = calledOnLoad => {
		let innerBlocksNew = innerBlocks;
		if (!calledOnLoad || innerBlocks.length === 0) {
			innerBlocksNew = [innerBlocks, times(1, () => createBlock('infobeans3/stats-item'))];
		}
		replaceInnerBlocks(clientId, innerBlocksNew, false);
	};

	useEffect(() => {
		addTemplate(true);
	}, []);
	useEffect(() => {
		if (!Array.isArray(innerBlocks)) {
			return;
		}
		if (attributes.statsData !== innerBlocks) {
			setAttributes({ statsData: innerBlocks });
		}
	}, [innerBlocks]);
	return (
		<Fragment>
			<div className="stats">
				<div className="grid grid--cols-7@md grid--cols-8@lg stats__container">
					<div className="col-12 col-7@md col-6@lg col-start-3@lg">
						<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} templateLock="all" />
					</div>
				</div>
			</div>
			<div className="action-div">
				<Button onClick={() => addTemplate(false)} isPrimary>
					{__('Add More', I18N_DOMAIN)}
				</Button>
			</div>
		</Fragment>
	);
};

export default DisplayComponent;
