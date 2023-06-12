const { Button } = wp?.components;
const { __ } = wp.i18n;
const { moment } = window;

/**
 * Post Component.
 *
 * @param {string} postTitle - Current post title.
 * @param {function} clickHandler - this is the handling function for the add/remove function
 * @param {Integer} postId - Current post ID
 * @param {string|boolean} featuredImage - Posts featured image
 * @param icon
 * @returns {*} Post HTML.
 */
export const Post = ({
	status,
	date,
	title: { rendered: postTitle } = {},
	clickHandler,
	id: postId,
	featured_image: featuredImage = false,
	icon,
	movePost = false,
	disableAddButton,
	customTitle,
	selectedPosts,
}) => {
	return (
		<article className="post">
			{movePost && selectedPosts > 1 && (
				<div className="button-directions">
					<Button icon="arrow-up-alt2" onClick={movePost(-1)} />
					<Button icon="arrow-down-alt2" onClick={movePost(1)} />
				</div>
			)}
			<figure
				className="post-figure"
				style={{ backgroundImage: featuredImage ? `url(${featuredImage})` : 'none' }}
			/>
			<div className="post-body">
				<span className="post-title">{customTitle || postTitle}</span>
				{status === 'future' && (
					<div class="not-live">
						<div class="tag">{__('Not-Live', 'infobeans-2023')}</div>
						<div class="date">
							{__('Scheduled Live Date', 'infobeans-2023')}:{' '}
							{moment(date).format('MMMM D, YYYY h:mm a z')}
						</div>
					</div>
				)}
			</div>
			{icon && (
				<>
					<button
						disabled={disableAddButton}
						className="button-action"
						type="button"
						onClick={() => clickHandler(postId)}
					>
						{icon}
					</button>
				</>
			)}
		</article>
	);
};

export default Post;
