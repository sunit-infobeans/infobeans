const { InnerBlocks, RichText } = wp.blockEditor;
const SaveComponent = ({ attributes }) => {
	const { title, coloredTitle, linkText, linkUrl, columnOption, displayCTA } = attributes;
	return (
		<>
			{columnOption === 'default' ? (
				<div class="clients-trust-us">
					<div class="container">
						<div class="row">
							<div class="col-6">
								<div class="section-heading">
									<RichText.Content value={title} />
									<br />
									<span class="red">
										<RichText.Content value={coloredTitle} />
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
								<InnerBlocks.Content />
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
										<RichText.Content value={title} />
										<br />
										<span class="red">
											<RichText.Content value={coloredTitle} />
										</span>
									</div>
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
								<div className="row">
									<InnerBlocks.Content />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SaveComponent;
