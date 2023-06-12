const { RichText } = wp.blockEditor;
// const { select } = wp.data;
const SaveComponentItem = ({ attributes }) => {
	const { heading, shortDescription, linkText1, linkUrl1, iconUrl, columnOption } = attributes;
	return (
		<>
			{columnOption === 'default' ? (
				<div className="block">
					<div className="image">
						<img src={iconUrl} alt="" />
					</div>
					<div className="content">
						<RichText.Content tagName="div" className="heading" value={heading} />
						<RichText.Content tagName="div" className="content-inner" value={shortDescription} />
					</div>
				</div>
			) : (
				<div className="col-6">
					<div className="block">
						<div className="image">
							<img src={iconUrl} alt="" />
						</div>
						<div className="content">
							<RichText.Content tagName="div" className="heading" value={heading} />
							<RichText.Content tagName="div" className="content-inner" value={shortDescription} />
							<a href={linkUrl1} className="link-with-arrow red">
								{linkText1}
								{/* <img
                  src="/wp-content/themes/infobeans-2023/src/icon-arrow-right-red.svg"
                  alt="icon"
                /> */}
							</a>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SaveComponentItem;
