import PostItemAlt from './display/PostItemAlt';

const { __ } = wp.i18n;

const SelectPreview = ({ loading, posts = [], ...props }) => {
	if (loading) {
		return <p>{__('Loading...', 'idg-base-theme')}</p>;
	}

	if (!posts.length > 0) {
		return <p>{__('No posts selected.', 'idg-base-theme')}</p>;
	}

	return (
		<div>
			<div className="lists">
				<div className="results">
					<ul>
						{posts.map(
							result =>
								result && (
									<li>
										<PostItemAlt key={`${props.prefix}-${result.id}`} {...result} />
									</li>
								),
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SelectPreview;
