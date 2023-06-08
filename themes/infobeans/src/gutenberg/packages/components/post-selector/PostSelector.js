import { useState } from 'react';
import { PostList } from './PostList';

const { __ } = wp.i18n;
const { BlockIcon } = wp.blockEditor;
const { CheckboxControl } = wp.components;
const { siteData } = window;

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
    onLineupChange,
    enableLineup,
    saveLineupContent,
    selectedLineup,
    onLineupEditionCheckboxClick,
    lineups = [],
    isAllEditionChecked,
    hideLineupsHeader,
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
    savingLineup,
    changeSaveContentButtonText,
    isSaveContentLineup,
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
  const [isGlobalEditionChecked, checkGlobalEditionChecked] = useState(isAllEditionChecked);

  if (externalPosts && externalPosts.length > 0 && enableLineup) {
    externalPosts.forEach(obj => {
      if (selectedPosts.length === 0 || selectedPosts.findIndex(ele => ele.id === obj.id) === -1) {
        updatePosts(obj);
        selectedPosts.push(obj);
      }
    });
  }
  const onAllEditionCheckboxChecked = () => {
    onLineupEditionCheckboxClick(!isGlobalEditionChecked);
    checkGlobalEditionChecked(!isGlobalEditionChecked);
  };

  // Removes selected posts from post list.
  postList = postList.filter(el => {
    return !selectedPosts.find(element => {
      return element.id === el.id;
    });
  });
  const checkPostType = wp.data.select('core/editor').getCurrentPostType();
  const addIcon = <BlockIcon icon="plus" />;
  const removeIcon = <BlockIcon icon="minus" />;
  const buttonText = changeSaveContentButtonText
    ? __('Update Content Lineup', 'idg-base-theme')
    : __('Save Content Lineup', 'idg-base-theme');
  const alertSaveContentLineup = (
    <div class="content-lineup-alert-success-text">
      Saved<BlockIcon icon="saved"></BlockIcon>
    </div>
  );
  const options = Object.keys(types).map(key => {
    if (types[key].slug === 'brandposts') {
      types[key].name = 'Brandposts Series';
    }
    return { label: types[key].name, value: types[key].slug };
  });
  return (
    <div className="wp-block-bigbite-postlist">
      <div className="post-selector">
        <div className="post-selectorHeader">
          <div className="searchbox">
            <label htmlFor="searchinput">
              <BlockIcon icon="search" />
              <input
                id="searchinput"
                type="search"
                placeholder={__('Please enter your search query...', 'idg-base-theme')}
                value={filter}
                onChange={onInputFilterChange}
              />
            </label>
          </div>
          {checkPostType !== 'brandposts' && checkPostType !== 'deal_collection' && (
            <div className="filter">
              {/* eslint-disable-line react/jsx-one-expression-per-line */}
              <label htmlFor="options">{__('Content Type:', 'idg-b2b-base-theme')}</label>
              <select name="options" id="options" onChange={onPostTypeChange}>
                {types.length < 1 ? (
                  <option value="">{__('Loading...', 'idg-b2b-base-theme')}</option>
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
          )}
        </div>
        {enableLineup && !hideLineupsHeader && (
          <div className="post-selectorHeader">
            <div className="dropdown-checkbox-container">
              <div className="lineup-dropdown-container">
                {/* eslint-disable-line react/jsx-one-expression-per-line */}
                <div className="select-box-field">
                  <label htmlFor="options">{__('Lineup:', 'idg-base-theme')}</label>
                  <select name="options" id="lineupOptions" onChange={onLineupChange}>
                    <option key="" value="">
                      {__('New Lineup', 'idg-base-theme')}
                    </option>
                    {types.length < 1 ? (
                      <option value="">{__('Loading...', 'idg-base-theme')}</option>
                    ) : (
                      lineups &&
                      lineups.map(obj => (
                        <option
                          key={obj.lineup_id}
                          value={JSON.stringify(obj)}
                          selected={
                            parseInt(obj.lineup_id, 10) === parseInt(selectedLineup, 10)
                              ? 'selected'
                              : null
                          }
                        >
                          {obj.block_name}
                          {obj.is_live ? ' [LIVE]' : ''}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                {!selectedLineup && (
                  <div className="lineup-note">
                    {siteData.isEditionSupported
                      ? __(
                          '*Please set the lineup start date, time and edition to create a new lineup.',
                          'idg-base-theme',
                        )
                      : __(
                          '*Please set the lineup start date and time to create a new lineup.',
                          'idg-base-theme',
                        )}
                  </div>
                )}
              </div>
              {siteData.isEditionSupported && (
                <div className="checkbox-container">
                  <CheckboxControl
                    id="checkbox"
                    label={__('Show lineup for all Edition', 'idg-base-theme')}
                    checked={isGlobalEditionChecked}
                    onChange={onAllEditionCheckboxChecked}
                  />
                </div>
              )}
            </div>
            <div className="content-lineup-save-button-container">
              {isSaveContentLineup && alertSaveContentLineup}
              <button
                type="button"
                onClick={saveLineupContent}
                className="save-lineup button components-button is-primary is-large"
                disabled={selectedPosts.length === 0}
              >
                {savingLineup ? __('Saving', 'idg-base-theme') : buttonText}
              </button>
            </div>
          </div>
        )}
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
              disableAddButton={disableAddButton || (selectedLineup === '' && enableLineup)}
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
