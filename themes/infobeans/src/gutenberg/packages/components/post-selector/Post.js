const { Button } = wp.components;
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
  isEmptySlot,
  endDate,
  startDate,
  selectedPosts,
}) => {
  const CurrentDate = moment().unix();
  let eventStatus = '';
  if (startDate > CurrentDate) {
    eventStatus = 'scheduled';
  } else if (CurrentDate > endDate) {
    eventStatus = 'expired';
  } else {
    eventStatus = 'live';
  }

  const DATE_FORMAT = 'MMM D, Y hh:mm a';
  const startDateFormat = moment.unix(startDate).format(DATE_FORMAT);
  const tags = eventStatus;
  const eventCheck = {
    scheduled: `Scheduled`,
    expired: `Expired`,
    live: `Live`,
  };
  const checkPostType = wp.data.select('core/editor').getCurrentPostType();
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
            <div class="tag">{__('Not-Live', 'idg-base-theme')}</div>
            <div class="date">
              {__('Scheduled Live Date', 'idg-base-theme')}:{' '}
              {moment(date).format('MMMM D, YYYY h:mm a z')}
            </div>
          </div>
        )}
        {checkPostType === 'deal_collection' && (
          <div className={`not-live deal-${tags}`}>
            <div className="tag">{eventCheck[tags]}</div>
            {tags === 'scheduled' && <div className="date">on - {startDateFormat}</div>}
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
          {isEmptySlot && (
            <p className="empty-slot-tooltip">{__('Add Empty Slot', 'idg-base-theme')}</p>
          )}
        </>
      )}
    </article>
  );
};

export default Post;
