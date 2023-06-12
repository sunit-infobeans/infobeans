const { __experimentalLinkControl } = wp.blockEditor;
const LinkControl = __experimentalLinkControl;
const {
	RichText,
	InspectorControls,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
} = wp.blockEditor;
const { PanelBody, TextControl, ToolbarButton } = wp.components;
const { select } = wp.data;
const { __ } = wp.i18n;
const DisplayComponentItem = ({ attributes, setAttributes, clientId }) => {
	const { heading, shortDescription, InnerLinkText, InnerLinkUrl, iconUrl, iconId } = attributes;
	// const { innerBlocks } = useSelect(selects => ({
	//   innerBlocks: selects('core/block-editor').getBlocks(clientId),
	// }));

	const parentClientID = select('core/block-editor').getBlockParents(clientId);
	const parentBlock =
		parentClientID.length > 0
			? wp.data
					.select('core/block-editor')
					.getBlocks()
					.find(obj => obj?.clientId === parentClientID[0])
			: {};

	const { columnOption } = parentBlock.attributes;
	setAttributes({ columnOption });

	const changeHeading = value => {
		setAttributes({ heading: value });
	};

	const changeDescription = value => {
		setAttributes({ shortDescription: value });
	};

	const onSelectIcon = image => {
		if (!image || !image.url) {
			setAttributes({ iconUrl: undefined, iconId: undefined });
			return;
		}
		setAttributes({ iconUrl: image.url, iconId: image.id });
	};

	const changeLinkText = value => {
		setAttributes({ InnerLinkText: value });
	};

	const changeLinkUrl = value => {
		setAttributes({ InnerLinkUrl: value?.url });
	};

	const removeImage = () => {
		setAttributes({
			iconUrl: undefined,
			iconId: undefined,
		});
	};

	const onSelectURl = newUrl => {
		setAttributes({
			iconUrl: newUrl,
			iconId: undefined,
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={'Call to Action'} initialOpen={false}>
					<p>
						<strong>Enter link Text and URL</strong>
					</p>
					<TextControl type="string" value={InnerLinkText} onChange={changeLinkText} />
					<LinkControl value={{ url: InnerLinkUrl }} onChange={changeLinkUrl} />
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<MediaReplaceFlow
					mediaId={iconId}
					mediaUrl={iconUrl}
					allowedTypes={['image']}
					accept="image/*"
					onSelect={onSelectIcon}
					name={!iconUrl ? __('Add Image') : __('Replace Image')}
				/>
				<ToolbarButton onClick={removeImage}>{__('Remove Image', 'infobeans-2023')}</ToolbarButton>
			</BlockControls>
			{columnOption === 'default' ? (
				<div class="block">
					<div class="image">
						<MediaPlaceholder
							icon="format-image"
							labels={{ title: 'Icon image' }}
							onSelect={onSelectIcon}
							onSelectURL={onSelectURl}
							accept="image/*"
							allowedTypes={['image']}
							disableMediaButtons={iconUrl}
						/>
						<img src={iconUrl} alt="" />
					</div>
					<div class="content">
						<RichText
							tagName="div"
							className="heading"
							placeholder="Enter Heading"
							value={heading}
							onChange={changeHeading}
						/>
						<RichText
							tagName="div"
							className="content-inner"
							placeholder="Enter Short description"
							value={shortDescription}
							onChange={changeDescription}
						/>
						<a href={InnerLinkUrl} className="link-with-arrow red">
							{InnerLinkText}
							<img
								src="/wp-content/themes/infobeans-2023/src/icon-arrow-right-red.svg"
								alt="icon"
							/>
						</a>
					</div>
				</div>
			) : (
				<div class="col-6">
					<div class="block">
						<div class="image">
							<MediaPlaceholder
								icon="format-image"
								labels={{ title: 'Icon image' }}
								onSelect={onSelectIcon}
								accept="image/*"
								allowedTypes={['image']}
								disableMediaButtons={iconUrl}
							/>
							<img src={iconUrl} alt="" />
						</div>
						<div class="content">
							<RichText
								tagName="div"
								className="heading"
								placeholder="Enter Heading"
								value={heading}
								onChange={changeHeading}
							/>
							<RichText
								tagName="div"
								className="content-inner"
								placeholder="Enter Short description"
								value={shortDescription}
								onChange={changeDescription}
							/>
							{InnerLinkText && (
								<a href={InnerLinkUrl} className="link-with-arrow red">
									{InnerLinkText}
									<img
										src="/wp-content/themes/infobeans-2023/src/icon-arrow-right-red.svg"
										alt="icon"
									/>
								</a>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DisplayComponentItem;
