import { times } from 'lodash';

const { __experimentalLinkControl } = wp.blockEditor;
const LinkControl = __experimentalLinkControl;
const { RichText, InspectorControls, InnerBlocks } = wp.blockEditor;
const { PanelBody, TextControl, Button, SelectControl, ToggleControl } = wp.components;
const { useDispatch, useSelect } = wp.data;
const { useEffect } = wp.element;
const { createBlock } = wp.blocks;

const DisplayComponent = ({ attributes, setAttributes, clientId }) => {
	const { title, coloredTitle, linkText, linkUrl, columnOption, displayCTA } = attributes;
	const { replaceInnerBlocks } = useDispatch('core/block-editor');
	const { innerBlocks } = useSelect(select => ({
		innerBlocks: select('core/block-editor').getBlocks(clientId),
	}));

	const addTemplate = calledOnLoad => {
		let innerBlocksNew = innerBlocks;

		if (!calledOnLoad || innerBlocks.length === 0) {
			innerBlocksNew = [...innerBlocks, ...times(1, () => createBlock('infobeans-2023/featured'))];
		}
		replaceInnerBlocks(clientId, innerBlocksNew, false);
	};

	useEffect(() => {
		addTemplate(true);
	}, [attributes.startIndex]);

	const handleDropdownChange = value => {
		setAttributes({ columnOption: value });
	};
	const changeTitle = value => {
		setAttributes({ title: value });
	};
	const changeColorTitle = value => {
		setAttributes({ coloredTitle: value });
	};
	const changeLinkText = value => {
		setAttributes({ linkText: value });
	};
	const changeLinkUrl = value => {
		setAttributes({ linkUrl: value?.url });
	};
	const onDisplayCTA = value => {
		setAttributes({ displayCTA: value });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={'Column Option'} initialOpen={false}>
					<SelectControl
						label={'Column Option'}
						value={columnOption}
						options={[
							{ label: 'Column 1', value: 'default' },
							{ label: 'Column 2', value: 'column2' },
						]}
						onChange={handleDropdownChange}
					/>
				</PanelBody>
				<PanelBody title={'CTA Link Option'} initialOpen={false}>
					<ToggleControl label={'Show CTA Link'} checked={displayCTA} onChange={onDisplayCTA} />
				</PanelBody>
				{displayCTA && (
					<PanelBody title={'Call to Action'} initialOpen={false}>
						<p>
							<strong>Enter link Text and URL</strong>
						</p>
						<TextControl type="string" value={linkText} onChange={changeLinkText} />
						<LinkControl value={{ url: linkUrl }} onChange={changeLinkUrl} />
					</PanelBody>
				)}
			</InspectorControls>
			{columnOption === 'default' ? (
				<div class="clients-trust-us">
					<div class="container">
						<div class="row">
							<div class="col-6">
								<div class="section-heading">
									<RichText
										placeholder="Enter Title"
										value={title}
										onChange={changeTitle}
									></RichText>
									<br />
									<span class="red">
										<RichText
											placeholder="Enter Color Heading"
											value={coloredTitle}
											onChange={changeColorTitle}
										/>
									</span>
									{displayCTA && (
										<a href={linkUrl} class="link-with-arrow red">
											{linkText}
											{/* <img
                        src="/wp-content/themes/infobeans-2023/src/icon-arrow-right-red.svg"
                        alt="icon"
                      /> */}
										</a>
									)}
								</div>
							</div>
							<div className="col-6">
								<InnerBlocks
									allowedBlocks={['infobeans-2023/featured']}
									orientation="horizontal"
									template={[['infobeans-2023/featured', {}]]}
								/>
								<div className="action-div">
									<Button onClick={() => addTemplate(false)} isPrimary>
										{'Add More'}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div class="featured-offerings">
					<div class="container">
						<div class="row">
							<div class="col-6">
								<div class="featured-offerings-heading">
									<div class="section-heading">
										<RichText
											placeholder="Enter Title"
											value={title}
											onChange={changeTitle}
										></RichText>
										<br />
										<span class="red">
											<RichText
												placeholder="Enter Color Heading"
												value={coloredTitle}
												onChange={changeColorTitle}
											/>
										</span>
									</div>
									{displayCTA && (
										<a href={linkUrl} class="link-with-arrow red">
											{linkText}
											<img
												src="/wp-content/themes/infobeans-2023/src/icon-arrow-right-red.svg"
												alt="icon"
											/>
										</a>
									)}
								</div>
							</div>
							<div className="col-6">
								<div className="row">
									<InnerBlocks
										allowedBlocks={['infobeans-2023/featured']}
										orientation="horizontal"
										template={[['infobeans-2023/featured', {}]]}
									/>
								</div>
								<div className="action-div">
									<Button onClick={() => addTemplate(false)} isPrimary>
										{'Add More'}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DisplayComponent;
// export default withSelect((select) => {
//   return {
//     columnOption: select('core/editor').getEditedPostAttribute('meta')['columnOption'],
//   };
// })(DisplayComponent);
