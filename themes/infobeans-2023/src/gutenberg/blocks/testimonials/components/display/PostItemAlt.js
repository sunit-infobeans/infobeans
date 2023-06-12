const PostItemAlt = props => {
	const { title, id, link } = props;

	const renderBlock = () => {
		return (
			<article className={`post post-${id}`}>
				<span>
					<div className="item-inside">
						<div className="item-title">
							<div className="item-inner-text">
								<div>
									<a href={link}>{wp.htmlEntities.decodeEntities(title)}</a>
								</div>
							</div>
						</div>
					</div>
				</span>
			</article>
		);
	};

	return renderBlock();
};

export default PostItemAlt;
