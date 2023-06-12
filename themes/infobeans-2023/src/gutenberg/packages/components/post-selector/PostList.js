import { Post } from './Post';

const { __ } = wp.i18n;

/**
 * PostList Component
 * @param object props - Component props.
 * @returns {*}
 * @constructor
 */
export const PostList = props => {
	const {
		filtered = false,
		loading = false,
		posts = [],
		action = () => {},
		icon = null,
		canPaginate,
		doPagination,
		paging,
		movePost = () => {},
		disableAddButton,
		selectedPosts,
	} = props;

	if (loading) {
		return <p>{__('Loading Content...', 'infoneans')}</p>;
	}

	if (filtered && posts.length < 1) {
		return (
			<>
				<div className="post-list">
					<p>{__('Your query yielded no results, please try again.', 'infoneans')}</p>
				</div>
			</>
		);
	}

	if (!posts || posts.length < 1) {
		return (
			<>
				<p>{__('No Content.', 'infoneans')}</p>
			</>
		);
	}

	const removePost = post => {
		action(post.id);
	};

	return (
		<div className="post-list">
			{posts.map((post, index) => (
				<Post
					key={post.id}
					{...post}
					clickHandler={() => removePost(post, icon)}
					icon={icon}
					movePost={movePost(index) || false}
					endDate={post?.meta?.deal_end_date}
					startDate={post?.meta?.deal_start_date}
					disableAddButton={disableAddButton}
					selectedPosts={selectedPosts}
				/>
			))}
			{/* eslint-disable-next-line react/jsx-handler-names */}
			{canPaginate ? (
				<button type="button" onClick={doPagination} disabled={paging}>
					{paging ? __('Loading...', 'infoneans') : __('Load More', 'infoneans')}
				</button>
			) : null}
		</div>
	);
};

export default PostList;
