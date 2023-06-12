import { PostList } from './PostList';

const { __ } = wp.i18n;
const { BlockIcon } = wp.blockEditor;

const PostSelector = props => {
	const {
		state,
		getSelectedPosts,
		onInputFilterChange,
		onPostTypeChange,
		addPost,
		removePost,
		doPagination,
		movePost,
		addExternalPosts,
		updatePosts,
		externalPosts,
		deletePlaceholderPost,
		disableAddButton,
		enableLineup,
		removeFeaturedImage,
	} = props;
	const {
		filtering,
		filterLoading,
		filterPosts,
		posts,
		type,
		types,
		filter,
		pages,
		pagesTotal,
		initialLoading,
		loading,
		paging,
	} = state;

	const isFiltered = filtering;

	let postList = isFiltered && !filterLoading ? filterPosts : [];

	if (posts && posts.length > 0) {
		postList =
			isFiltered && !filterLoading ? filterPosts : posts.filter(post => post.type === type);
	}

	const pageKey = filter ? 'filter' : type;
	const canPaginate = (pages[pageKey] || 1) < pagesTotal[pageKey];
	const selectedPosts = getSelectedPosts();

	if (externalPosts && externalPosts.length > 0 && enableLineup) {
		externalPosts.forEach(obj => {
			if (selectedPosts.length === 0 || selectedPosts.findIndex(ele => ele.id === obj.id) === -1) {
				updatePosts(obj);
				selectedPosts.push(obj);
			}
		});
	}

	// Removes selected posts from post list.
	postList = postList.filter(el => {
		return !selectedPosts.find(element => {
			return element.id === el.id;
		});
	});
	const addIcon = <BlockIcon icon="plus" />;
	const removeIcon = <BlockIcon icon="minus" />;
	const options = Object.keys(types).map(key => {
		return { label: types[key].name, value: types[key].slug };
	});
	return (
		<div className="wp-block-infobeans-postlist">
			<div className="post-selector">
				<div className="post-selectorHeader">
					<div className="searchbox">
						<label htmlFor="searchinput">
							<BlockIcon icon="search" />
							<input
								id="searchinput"
								type="search"
								placeholder={__('Please enter your search query...', 'infobeans-2023')}
								value={filter}
								onChange={onInputFilterChange}
							/>
						</label>
					</div>
					<div className="filter">
						{/* eslint-disable-line react/jsx-one-expression-per-line */}
						<label htmlFor="options">{__('Content Type:', 'infobeans-2023')}</label>
						<select name="options" id="options" onChange={onPostTypeChange}>
							{types.length < 1 ? (
								<option value="">{__('Loading...', 'infobeans-2023')}</option>
							) : (
								Object.keys(options).map(key => (
									<option
										key={key}
										value={options[key].value}
										selected={options[key].value === state?.type ? 'selected' : null}
									>
										{options[key].label}
									</option>
								))
							)}
						</select>
					</div>
				</div>
				<div className="post-selectorContainer">
					<div className="post-selectorAdd">
						<PostList
							showEmptySlot={enableLineup}
							posts={postList}
							loading={initialLoading || loading || filterLoading}
							filtered={isFiltered}
							action={addPost}
							paging={paging}
							canPaginate={canPaginate}
							doPagination={doPagination}
							icon={addIcon}
							addExternalPosts={addExternalPosts}
							updatePosts={updatePosts}
							disableAddButton={disableAddButton}
							removeFeaturedImage={removeFeaturedImage}
						/>
					</div>
					<div className="post-selectorRemove">
						<PostList
							posts={selectedPosts}
							loading={initialLoading}
							action={removePost}
							icon={removeIcon}
							movePost={movePost}
							deletePlaceholderPost={deletePlaceholderPost}
							selectedPosts={selectedPosts.length}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostSelector;
