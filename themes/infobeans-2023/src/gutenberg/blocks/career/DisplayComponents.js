const { __experimentalLinkControl } = wp.blockEditor;
const LinkControl = __experimentalLinkControl;
const { RichText, MediaUpload, InspectorControls, ColorPalette } = wp.blockEditor;
const { PanelBody, IconButton, TextControl } = wp.components;

const DisplayComponent = ({ attributes, setAttributes }) => {
	const {
		title,
		titleColor,
		backgroundColor,
		content,
		linkText,
		linkUrl,
		backgroundImage,
		backgroundImage1,
		backgroundImage2,
	} = attributes;
	const changetitle = value => {
		setAttributes({ title: value });
	};
	const onColorChange = newColor => {
		setAttributes({ titleColor: newColor });
	};
	const onBgChange = newBgColor => {
		setAttributes({ backgroundColor: newBgColor });
	};
	const changeContent = value => {
		setAttributes({ content: value });
	};
	const changeLinkText = newLinkText => {
		setAttributes({ linkText: newLinkText });
	};
	const changeLinkUrl = newLinkUrl => {
		setAttributes({ linkUrl: newLinkUrl?.url, opensInNewTab: newLinkUrl.opensInNewTab });
	};
	const onSelectBgImage = image => {
		if (!image || !image.url) {
			setAttributes({ backgroundImage: undefined });
			return;
		}
		setAttributes({ backgroundImage: image.url });
	};
	const onSelectBgImage1 = image => {
		if (!image || !image.url) {
			setAttributes({ backgroundImage1: undefined });
			return;
		}
		setAttributes({ backgroundImage1: image.url });
	};
	const onSelectBgImage2 = image => {
		if (!image || !image.url) {
			setAttributes({ backgroundImage2: undefined });
			return;
		}
		setAttributes({ backgroundImage2: image.url });
	};
	return [
		<InspectorControls>
			<PanelBody title={'Title'} initialOpen={false}>
				<p>
					<strong>Enter title here</strong>
				</p>
				<TextControl className="text" value={title} onChange={changetitle}></TextControl>
			</PanelBody>
			<PanelBody title={'Title color'} initialOpen={false}>
				<p>
					<strong>Select the Title color</strong>
				</p>
				<ColorPalette value={titleColor} onChange={onColorChange} />
			</PanelBody>
			<PanelBody title={'Background color'} initialOpen={false}>
				<p>
					<strong>Select the Background color</strong>
				</p>
				<ColorPalette value={backgroundColor} onChange={onBgChange} />
			</PanelBody>
			<PanelBody title={'Call to Link'} initialOpen={false}>
				<p>
					<strong>Enter link Text and URL</strong>
				</p>
				<TextControl type="string" value={linkText} onChange={changeLinkText} />
				<LinkControl
					value={{ url: linkUrl, opensInNewTab: attributes.opensInNewTab }}
					onChange={changeLinkUrl}
				/>
			</PanelBody>

			<PanelBody title="Selecct Images as BG" initialOpen={false}>
				<MediaUpload
					onSelect={onSelectBgImage}
					type="string"
					value={backgroundImage}
					render={({ open }) => (
						<IconButton
							onClick={open}
							icon="upload"
							className="editor-media-placeholder__button is-button is-large"
						>
							Select First BG image
						</IconButton>
					)}
				/>

				<MediaUpload
					onSelect={onSelectBgImage1}
					type="string"
					value={backgroundImage1}
					render={({ open }) => (
						<IconButton
							onClick={open}
							icon="upload"
							className="editor-media-placeholder__button is-button is-large"
						>
							Select Second BG image
						</IconButton>
					)}
				/>

				<MediaUpload
					onSelect={onSelectBgImage2}
					type="string"
					value={backgroundImage2}
					render={({ open }) => (
						<IconButton
							onClick={open}
							icon="upload"
							className="editor-media-placeholder__button is-button is-large"
						>
							Select Third BG image
						</IconButton>
					)}
				/>
			</PanelBody>
		</InspectorControls>,
		<div class="career" style={{ backgroundColor }}>
			<div class="container">
				<div class="content-wrapper">
					<div class="content">
						<RichText
							tagName="div"
							className="section-heading"
							placeholder="Enter title here"
							value={title}
							onChange={changetitle}
							style={{ color: titleColor }}
						></RichText>
						<div class="content-inner">
							<RichText
								tagName="p"
								placeholder="Enter text description here"
								value={content}
								onChange={changeContent}
							></RichText>
						</div>
						<a href={linkUrl} className="link-with-arrow white">
							{linkText}
						</a>
					</div>
				</div>
				{backgroundImage && (
					<div class="img-career-box one">
						<div
							class="image"
							style={{
								backgroundImage: `url(${backgroundImage})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
							}}
						></div>
						{backgroundImage && <img src={backgroundImage} alt="My Image" />}
					</div>
				)}
				{backgroundImage1 && (
					<div class="img-career-box two">
						<div
							class="image"
							style={{
								backgroundImage: `url(${backgroundImage1})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
							}}
						></div>
						{backgroundImage1 && <img src={backgroundImage1} alt={'imageAlt'} />}
					</div>
				)}
				{backgroundImage2 && (
					<div class="img-career-box three">
						<div
							class="image"
							style={{
								backgroundImage: `url(${backgroundImage2})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
							}}
						></div>
					</div>
				)}
			</div>
		</div>,
	];
};

export default DisplayComponent;
