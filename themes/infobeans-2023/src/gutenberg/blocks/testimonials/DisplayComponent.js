import DisplaySelect from './components/DisplaySelect';

const { __ } = wp.i18n;
const I18N_DOMAIN = 'infobeans-2023';
const {
	MediaPlaceholder,
	MediaReplaceFlow,
	RichText,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	BlockControls,
	AlignmentToolbar,
} = wp.blockEditor;

const { useState } = wp.element;
const { ToolbarButton, PanelBody, SelectControl, TextareaControl } = wp.components;
const { applyFilters } = wp.hooks;
const DisplayComponent = ({ attributes, setAttributes, noticeOperations, noticeUI }) => {
	const {
		url,
		alt,
		text,
		designation,
		companyName,
		sectionBgColor,
		alignment,
		id,
		type,
		selectedPosts,
	} = attributes;

	const [preview, setPreview] = useState((selectedPosts || []).length > 0);
	const [keyPrefix] = useState(Math.random().toString(36).substring(7));

	const onChangeText = newText => {
		setAttributes({ text: newText });
	};

	const onChangeDesignation = newDesignation => {
		setAttributes({ designation: newDesignation });
	};

	const onCompanyName = newCompanyName => {
		setAttributes({ companyName: newCompanyName });
	};

	const onSelectImage = image => {
		if (!image || !image.url) {
			setAttributes({ url: undefined, id: undefined, alt: '' });
			return;
		}
		setAttributes({
			url: image.url,
			id: image.id,
			alt: image.alt,
		});
	};

	const onSelectURl = newUrl => {
		setAttributes({
			url: newUrl,
			id: undefined,
			alt: '',
		});
	};

	const onUploadError = message => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};

	const onChangeBgColor = newBgcolor => {
		setAttributes({ sectionBgColor: newBgcolor });
	};

	const onChangeAlignment = newAlignment => {
		setAttributes({ alignment: newAlignment });
	};

	const removeImage = () => {
		setAttributes({
			url: undefined,
			id: undefined,
			alt: '',
		});
	};

	const createUpdateAttribute = key => value => {
		setAttributes({ [key]: value });
		if (key === 'type') {
			setPreview(prevState => ({
				preview: !prevState.preview,
			}));
		}
	};

	const typeOptions = applyFilters('infobeans-2023.block.list.typeOptions', [
		{
			label: __('Feed', I18N_DOMAIN),
			value: 'category',
		},
		{
			label: __('Selection', I18N_DOMAIN),
			value: 'select',
		},
	]);
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Testimonials Options', I18N_DOMAIN)}>
					<SelectControl
						label={__('Testimonials Options', I18N_DOMAIN)}
						options={typeOptions}
						value={type}
						onChange={createUpdateAttribute('type')}
					/>
				</PanelBody>

				<PanelColorSettings
					title={__('Background Color Settings', I18N_DOMAIN)}
					icon="color-picker"
					initialOpen
					colorSettings={[
						{
							value: sectionBgColor,
							onChange: onChangeBgColor,
							label: __('Background Color', I18N_DOMAIN),
						},
					]}
				>
					<ContrastChecker backgroundColor={sectionBgColor} />
				</PanelColorSettings>

				{type === 'category' && (
					<PanelBody
						title={__('Block Setting', I18N_DOMAIN)}
						icon="welcome-widgets-menus"
						initialOpen={true}
					>
						<TextareaControl
							label={__('Edit Testimonial', I18N_DOMAIN)}
							value={text}
							onChange={onChangeText}
							help={__('Add a or edit testimonial', I18N_DOMAIN)}
						/>
						<TextareaControl
							label={__('Edit designation', I18N_DOMAIN)}
							value={designation}
							onChange={onChangeDesignation}
							help={__('Add a or edit designation', I18N_DOMAIN)}
						/>

						<TextareaControl
							label={__('Edit company name', I18N_DOMAIN)}
							value={companyName}
							onChange={onCompanyName}
							help={__('Add a or edit company name', I18N_DOMAIN)}
						/>
					</PanelBody>
				)}
			</InspectorControls>
			{type === 'category' && (
				<BlockControls>
					<AlignmentToolbar value={alignment} onChange={onChangeAlignment} />
					<MediaReplaceFlow
						mediaId={id}
						mediaUrl={url}
						allowedTypes={['image']}
						accept="image/*"
						onSelect={onSelectImage}
						name={!url ? __('Add Image') : __('Replace Image')}
					/>
					<ToolbarButton onClick={removeImage}>{__('Remove Image', I18N_DOMAIN)}</ToolbarButton>
				</BlockControls>
			)}
			{type === 'select' && (
				<DisplaySelect
					setAttributes={setAttributes}
					selectedPosts={attributes.selectedPosts || []}
					preview={preview}
					type={attributes.type || 'category'}
					prefix={keyPrefix}
				/>
			)}

			{type === 'category' && (
				<div
					className="testimonials"
					id="testimonial"
					style={{ backgroundColor: sectionBgColor || '#aa142d' }}
				>
					<div className="container">
						{url && (
							<figure className="company-logo">
								<img src={url} alt={alt} />
							</figure>
						)}

						<MediaPlaceholder
							icon="format-image"
							labels={{ title: 'Company Logo' }}
							onSelect={onSelectImage}
							onSelectURL={onSelectURl}
							accept="image/*"
							allowedTypes={['image']}
							onError={onUploadError}
							disableMediaButtons={url}
							notices={noticeUI}
						/>

						<RichText
							className="text"
							placeholder={__('Enter testimonial here.', I18N_DOMAIN)}
							tagName="div"
							value={text}
							onChange={onChangeText}
						/>

						<RichText
							className="designation"
							placeholder={__('Enter designation here.', I18N_DOMAIN)}
							tagName="div"
							value={designation}
							onChange={onChangeDesignation}
						/>

						<RichText
							className="company-name"
							placeholder={__('Enter company name here.', I18N_DOMAIN)}
							tagName="div"
							value={companyName}
							onChange={onCompanyName}
						/>
					</div>
				</div>
			)}
		</>
	);
};
export default DisplayComponent;
