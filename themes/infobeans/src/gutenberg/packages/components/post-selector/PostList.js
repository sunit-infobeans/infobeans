import { Post } from './Post';
import ExternalLinkModal from './ExternalLinkModal';

const { Modal, Button } = wp.components;
const { __ } = wp.i18n;
const { useState } = wp.element;

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
    showEmptySlot,
    addExternalPosts,
    updatePosts,
    deletePlaceholderPost = () => {},
    movePost = () => {},
    disableAddButton,
    removeFeaturedImage,
    selectedPosts,
  } = props;
  const [isModalOpen, toggleModal] = useState(false);
  const [idToBeDeleted, setIdToBeDeleted] = useState(0);
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false);

  if (loading) {
    return <p>{__('Loading Content...', 'idg-base-theme')}</p>;
  }

  if (filtered && posts.length < 1 && !showEmptySlot) {
    return (
      <>
        <div className="post-list">
          <p>{__('Your query yielded no results, please try again.', 'idg-base-theme')}</p>
        </div>
      </>
    );
  }

  if ((!posts || posts.length < 1) && !showEmptySlot) {
    return (
      <>
        <p>{__('No Content.', 'idg-base-theme')}</p>
      </>
    );
  }

  const onSave = data => {
    const obj = {
      id: Date.parse(new Date()),
      date: new Date().toISOString(),
      type: 'placeholder',
      title: { rendered: data.title },
      url: data.url,
      featured_image: data.selectedImage.url,
      featured_media: data.selectedImage.id,
      _embedded: {},
    };
    updatePosts(obj);
    addExternalPosts(obj.id);
    movePost(obj.id);
  };

  const removePost = (post, postIcon) => {
    if (postIcon?.props?.icon === 'minus' && post.type === 'placeholder') {
      setIdToBeDeleted(post.id);
      toggleDeleteModal(true);
    } else {
      action(post.id);
    }
  };

  const deletePost = () => {
    deletePlaceholderPost(idToBeDeleted);
    toggleDeleteModal(false);
  };

  return (
    <div className="post-list">
      {showEmptySlot && (
        <>
          <Post
            key={posts.length}
            clickHandler={() => toggleModal(true)}
            icon={icon}
            movePost={movePost(posts.length) || false}
            disableAddButton={disableAddButton}
            customTitle={__('Empty Slot', 'idg-base-theme')}
            isEmptySlot={true}
          />
          {filtered && posts.length < 1 && (
            <div className="post-list empty-slot-post-list">
              <p>{__('Your query yielded no results, please try again.', 'idg-base-theme')}</p>
            </div>
          )}
        </>
      )}
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
          {paging ? __('Loading...', 'idg-base-theme') : __('Load More', 'idg-base-theme')}
        </button>
      ) : null}
      {isModalOpen && (
        <ExternalLinkModal
          className="productModal"
          onClose={() => toggleModal(false)}
          onSave={data => {
            toggleModal(false);
            onSave(data);
          }}
          removeFeaturedImage={removeFeaturedImage}
        />
      )}
      {isDeleteModalOpen && (
        <Modal
          title={__('Remove Empty Slot', 'idg-base-theme')}
          className="productModal confirmationModal"
          overlayClassName="productModal-overlay"
          onRequestClose={() => toggleDeleteModal(false)}
          shouldCloseOnClickOutside={false}
        >
          <div className="productModal-body">
            <div className="productModal-layout">
              <div className="productModal-main">
                <p>
                  {__(
                    'Click on Confirm button to remove this entry added using Empty slot. This will delete this slot permanently.',
                    'idg-base-theme',
                  )}
                </p>
              </div>
              <div className="action-div">
                <Button
                  className="cancel-button"
                  onClick={() => toggleDeleteModal(false)}
                  isDestructive
                >
                  {__('Cancel', 'idg-base-theme')}
                </Button>
                <Button onClick={deletePost} isPrimary>
                  {__('Confirm', 'idg-base-theme')}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PostList;
