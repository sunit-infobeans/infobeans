import PostItemAlt from './display/PostItemAlt';

const { __ } = wp.i18n;

const SelectPreview = ({ loading, posts = [], ...props }) => {
	if (loading) {
		return <p>{__('Loading...', 'infobeans-2023')}</p>;
	}

	if (!posts.length > 0) {
		return <p>{__('No posts selected.', 'infobeans-2023')}</p>;
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
