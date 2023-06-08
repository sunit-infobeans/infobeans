/**
 * Makes a get request to the PostTypes endpoint.
 *
 * @returns {Promise<any>}
 */
export const getPostTypes = () =>
  wp.apiRequest({
    path: '/wp/v2/types',
  });

/**
 * Makes a get request to the desired post type and builds the query string based on an object.
 *
 * @param {string|boolean} restBase - rest base for the query.
 * @param {object} args
 * @returns {AxiosPromise<any>}
 */
export const getPosts = ({ restBase = false, type, ...args }) => {
  const queryString = Object.keys(args)
    .map(arg => `${arg}=${args[arg]}`)
    .join('&');
  const fields = [
    'status',
    'id',
    'type',
    'date',
    'title',
    'content',
    'eyebrow.eyebrow',
    'eyebrow.eyebrow_style',
    'author',
    'meta.multi_title',
    'meta.deal_start_date',
    'meta.deal_end_date',
    'featured_media',
    '_links.wp:featuredmedia',
    '_links.wp:term',
    '_links.author',
    '_links',
    '_embedded',
    'spotlight_description',
    'meta',
    'total_count',
  ].join(',');

  let symbol = '?';

  if (restBase.indexOf('?') > 0) {
    symbol = '&';
  }
  let path = `/wp/v2/${restBase}${symbol}${queryString}&status=publish&_fields=${fields}&_embed=wp:featuredmedia,wp:term,author`;

  if (type === 'events') {
    path = `/wp/v2/events?_embed=wp:featuredmedia,wp:term${symbol}${queryString}`;
  }

  if (restBase.match(/get_posts_from_origin/g)) {
    path = `${restBase}${symbol}${queryString}&status=publish&_fields=${fields}&_embed=wp:featuredmedia,wp:term,author`;
  }

  return wp.apiRequest({
    path,
  });
};
