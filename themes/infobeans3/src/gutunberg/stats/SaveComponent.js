const { InnerBlocks } = wp.editor;

const SaveComponent = () => {
	return (
		<div className="stats">
			<div className="grid grid--cols-7@md grid--cols-8@lg stats__container">
				<div className="col-12 col-7@md col-6@lg col-start-3@lg">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
};

export default SaveComponent;
