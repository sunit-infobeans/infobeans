/* eslint-disable */
import { cloneDeep, get, isEmpty } from 'lodash-es';
import isString from 'lodash-es/isString';
import PostSelect from '../../../packages/components/post-selector/PostSelector';
import * as api from '../../../packages/components/post-selector/api';
import SelectPreview from './SelectPreview';

const { Component } = wp.element;
const { dateI18n, __experimentalGetSettings } = wp.date;

/**
 * Returns a unique array of objects based on a desired key.
 * @param {array} arr - array of objects.
 * @param {string|int} key - key to filter objects by
 */
export const uniqueBy = (arr, key) => {
  const keys = [];
  return arr.filter(item => {
    if (keys.indexOf(item[key]) !== -1) {
      return false;
    }

    return keys.push(item[key]);
  });
};

/**
 * Returns a unique array of objects based on the id property.
 * @param {array} arr - array of objects to filter.
 * @returns {*}
 */
export const uniqueById = arr => uniqueBy(arr, 'id');

/**
 * Debounce a function by limiting how often it can run.
 * @param {function} func - callback function
 * @param {Integer} wait - Time in milliseconds how long it should wait.
 * @returns {Function}
 */
export const debounce = (func, wait) => {
  let timeout = null;

  return () => {
    const context = this;
    const args = arguments;

    const later = () => {
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * PostSelector Component
 */
class DisplaySelect extends Component {
  /**
   * Constructor for PostSelector Component.
   * Sets up state, and creates bindings for functions.
   * @param array args - All arguments.
   */
  constructor(...args) {
    super(...args);

    this.state = {
      posts: [],
      loading: false,
      type: 'post',
      types: [],
      filter: '',
      filterLoading: false,
      filterPosts: [],
      pages: {},
      pagesTotal: {},
      paging: false,
      initialLoading: false,
    };
  }
  /**
   * When the component mounts it calls this function.
   * Fetches posts types, selected posts then makes first call for posts
   */
  componentDidMount() {
    this.setState({
      loading: true,
      initialLoading: true,
    });

    api.getPostTypes().then(data => {
      const types = data;
      delete types.attachment;
      delete types['guest-author'];
      delete types.wp_template;
      delete types.wp_block;
      delete types.sidebar;
      delete types.page;
      delete types.attachment;
      delete types.nav_menu_item;
      delete types.wp_template;
      delete types.wp_navigation;
      delete types.wp_template_part;


      // Jetpack Post Types
      delete types.feedback;
      delete types.jp_pay_product;
      delete types.jp_pay_order;

      this.setState(
        {
          types,
        },
        () => {
          this.retrieveSelectedPosts().then(() => {
            this.setState({
              initialLoading: false,
            });
            this.getPosts().then(() => {
              this.setState({ loading: false });
            });
          });
        },
      );
    });
  }

  /**
   * Runs after the component gets updated.
   *
   */
  componentDidUpdate(args) {
    const { filters } = this.props;
    const prevFilters = this.normaliseTaxonomy(args.filters);
    const nextFilters = this.normaliseTaxonomy(filters);

    if ( prevFilters.length !== nextFilters.length ) {
      this.setState({
        initialLoading: true,
      });
      this.getPosts().then(data => {
        this.setState({ posts: data.data });
        this.retrieveSelectedPosts();
        this.setState({
          initialLoading: false,
        });
      });
    }
  }

  /**
   * Normalises Taxonomy filters.
   *
   */
  normaliseTaxonomy = (taxonomy = '[]') => {
    let normal = taxonomy;

    if (isString(normal)) {
      normal = JSON.parse(normal);
    }

    if (!Array.isArray(normal)) {
      normal = [normal];
    }

    normal = normal.map(val => {
      if (isString(val)) {
        return JSON.parse(val);
      }

      return val;
    });

    return normal.filter(Boolean);
  };

  /**
   * Get Preview Posts.
   * @results array.
   */
  getPreviewPosts() {
    const selectedPosts = this.getSelectedPosts();
    const { futurePosts } = this.props;
    if (!selectedPosts) {
      return [];
    }
    let response = [];
    let results = selectedPosts.map(resp => {
      const dateFormat = __experimentalGetSettings().formats.date;
      const publishedDate = dateI18n(dateFormat, resp.date);
      if (resp.type !== 'placeholder') {
        const dateFormat = __experimentalGetSettings().formats.date;
        const publishedDate = dateI18n(dateFormat, resp.date);
        if (!futurePosts && resp.status === 'future') {
          response = [];
        } else {
          response = {
            id: resp.id,
            title: resp.title.rendered,
            link: resp.link,
            date: publishedDate,
            type: resp.type,
          };
        }
      } else {
        response = {
          id: resp.id,
          title: resp.title.rendered,
          link: resp.link,
          date: publishedDate,
          type: resp.type,
        };
      }
      return response;
    });
    const filtered = results.filter(function (el) {
      return !isEmpty(el);
    });

    return filtered;
  }

  /**
   * Gets the selected posts by id from the `posts` state object and
   * sorts them by their position in the selected array.
   *
   * @returns Array of objects.
   */
  getSelectedPosts = () => {
    const { selectedPosts } = this.props;
    let selected = this.state.posts ?? [];

    if (selected && selected.length > 0) {
      selected = selected
        .filter(({ id }) => selectedPosts.indexOf(id) !== -1)
        .sort((a, b) => {
          const aIndex = this.props.selectedPosts.indexOf(a.id);
          const bIndex = this.props.selectedPosts.indexOf(b.id);

          if (aIndex > bIndex) {
            return 1;
          }

          if (aIndex < bIndex) {
            return -1;
          }

          return 0;
        });
    }

    return selected;
  };

  /**
   * GetPosts wrapper, builds the request argument based state and parameters passed/
   * @param {object} args - desired arguments (can be empty).
   * @returns {Promise<T>}
   */
  getPosts = (args = {}) => {
    const pageKey = this.state.filter ? false : this.state.type;

    const { filters } = this.props;
    let search = this.state.filter;
    if (args.include) {
      search = '';
    }

    const defaultArgs = {
      per_page: 10,
      type: this.state.type,
      search: search,
      page: this.state.pages[pageKey] || 1,
    };

    const requestArguments = {
      ...defaultArgs,
      ...args,
    };
    if ( this.state.type === 'post') {
    
      requestArguments.restBase = 'posts/';
    } else {
      requestArguments.restBase = this.state.types[requestArguments.type]?.rest_base;
    }

    if (!args.include && filters) {
      if (!args.loadMore) {
        requestArguments.page = 1;
      }
      const filterList = this.normaliseTaxonomy(filters);
      const groupBy = function group(xs, key) {
        return xs.reduce((rv, x) => {
          // eslint-disable-next-line no-param-reassign
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      const filterListGrouped = groupBy(filterList, 'tax');

      let i = 0;
      let symbol = '';
      let path = '';
      let restBase = '';

      Object.keys(filterListGrouped).map(tax => {
        if (i === 0) {
          symbol = '?';
        } else {
          symbol = '&';
        }

        if (tax === 'category') {
          restBase = 'categories';
        } else {
          restBase = tax;
        }

        const finalFilterList = filterListGrouped[tax].map(v => v.value).join(',');
        path = path.concat(`${symbol}${restBase}=${finalFilterList}`);

        i += 1;
        return path;
      });

      requestArguments.restBase = `${requestArguments.restBase}${path}`;
    }

    return api
      .getPosts(requestArguments)
      .then((data = [], i, xhr) => {
        const posts = data.map(p => {
          if (!p.featured_media || p.featured_media < 1) {
            return {
              ...p,
              // featured_image: false,  /* commenting this line because don't have featured image will uncomment later*/
            };
          }

          return {
            ...p,
            // featured_image: p._embedded['wp:featuredmedia'][0]?.source_url || false, /* commenting this line because don't have featured image will uncomment later*/
          };
        });

        return {
          xhr,
          data: posts,
        };
      })
      .then(({ data = [], xhr }) => {
        if (requestArguments.search) {
          this.setState({
            filterPosts:
              requestArguments.page > 1 ? uniqueById([...this.state.filterPosts, ...data]) : data,
          });

          if (!args.include) {
            this.setState({
              pages: {
                ...this.state.pages,
                filter: requestArguments.page,
              },
              pagesTotal: {
                ...this.state.pagesTotal,
                filter: xhr.getResponseHeader('x-wp-totalpages'),
              },
            });
          }

          return { data, xhr };
        }

        this.setState({
          posts: uniqueById([...this.state.posts, ...data]),
        });

        if (!args.include) {
          this.setState({
            pages: {
              ...this.state.pages,
              [pageKey]: requestArguments.page,
            },
            pagesTotal: {
              ...this.state.pagesTotal,
              [pageKey]: xhr.getResponseHeader('x-wp-totalpages'),
            },
          });
        }

        // return response to continue the chain
        return { data, xhr };
      });
  };

  /**
   * Makes the necessary api calls to fetch the selected posts and returns a promise.
   * @returns {*}
   */
  retrieveSelectedPosts = () => {
    const selected = this.props.selectedPosts;
    const { types } = this.state;

    if (!selected.length > 0) {
      // return a fake promise that auto resolves.
      return new Promise(resolve => resolve());
    }

    return Promise.all(
      Object.keys(types).map(type =>
        this.getPosts({
          include: this.props.selectedPosts.join(','),
          per_page: 100,
          type,
        }),
      ),
    );
  };

  /**
   * Adds desired post id to the selectedPosts List
   * @param {Integer} post_id
   */
  addPost = postId => {
    if (this.state.filter) {
      const post = this.state.filterPosts.filter(p => p.id === postId);
      const posts = uniqueById([...this.state.posts, ...post]);

      this.setState({
        posts,
      });
    }

    this.updateSelectedPosts([...this.props.selectedPosts, postId]);
  };

  /**
   * Removes desired post id to the selectedPosts List
   * @param {Integer} postId
   */
  removePost = postId => {
    this.updateSelectedPosts([...this.props.selectedPosts].filter(id => id !== postId));
  };

  /**
   * Update the selected posts attributes.
   * @param posts
   * @returns {*}
   */
  updateSelectedPosts = posts =>
    this.props.setAttributes({
      selectedPosts: [...posts],
    });

  /**
   * Add external post id to the selected posts attributes.
   * @param post
   * @returns {*}
   */
  addExternalPosts = post => this.updateSelectedPosts([...this.props.selectedPosts, post]);

  updatePosts = post => {
    this.addPlaceholderPost(post);
    if (this.state.posts.findIndex(obj => obj.id === post.id) === -1) {
      this.setState({
        posts: [...this.state.posts, post],
      });
    }
  };

  /**
   * Add external post id to the placeholderPosts attributes.
   * @param post
   * @returns {*}
   */
  addPlaceholderPost = post =>
    this.props.setAttributes({
      placeholderPosts: [...this.props.placeholderPosts, post],
    });

  /**
   * Delete external post from the placeholderPosts attributes.
   * @param post
   * @returns {*}
   */
  deletePlaceholderPost = postId => {
    this.props.setAttributes({
      placeholderPosts: [...this.props.placeholderPosts].filter(obj => obj.id !== postId),
    });
    this.removePost(postId);
  };

  /**
   * Event handler for when the post type select box changes in value.
   * @param string type - comes from the event object target.
   */
  handlePostTypeChange = ({ target: { value: type = '' } = {} } = {}) => {
    this.setState({ type, loading: true }, () => {
      // fetch posts, then set loading = false
      this.getPosts().then(() => this.setState({ loading: false }));
    });
  };

  /**
   * Handles the search box input value
   * @param string type - comes from the event object target.
   */
  handleInputFilterChange = ({ target: { value: filter = '' } = {} } = {}) =>
    this.setState(
      {
        filter,
      },
      () => {
        if (!filter) {
          // remove filtered posts
          return this.setState({ filteredPosts: [], filtering: false });
        }

        return this.doPostFilter();
      },
    );

  /**
   * Actual api call for searching for query, this function is debounced in constructor.
   */
  doPostFilter = () => {
    const { filter = '' } = this.state;

    if (!filter) {
      return;
    }

    this.setState({
      filtering: true,
      filterLoading: true,
    });

    this.getPosts().then(() => {
      this.setState({
        filterLoading: false,
      });
    });
  };

  /**
   * Handles the pagination of post types.
   */
  doPagination = () => {
    this.setState({
      paging: true,
    });

    const pageKey = this.state.filter ? 'filter' : this.state.type;
    const page = parseInt(this.state.pages[pageKey], 10) + 1 || 2;

    this.getPosts({ page: page, loadMore: true }).then(() =>
      this.setState({
        paging: false,
      }),
    );
  };

  /**
   * Strip html tag from the content
   * @param {string} html - Current html content
   * @returns {string}
   */
  strip = html => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  /**
   * Move Posts to select container.
   * @results array.
   */
  movePost = index => difference => () => {
    const { selectedPosts = [] } = this.props;
    const newIndex = index + difference;

    if (selectedPosts.length === newIndex || newIndex < 0) {
      return;
    }

    const newSelectedPosts = cloneDeep(selectedPosts);

    const temp = newSelectedPosts[newIndex];
    newSelectedPosts[newIndex] = newSelectedPosts[index];
    newSelectedPosts[index] = temp;

    this.updateSelectedPosts(newSelectedPosts);
  };

  /**
   * Renders the PostSelector component.
   */
  render() {
    return (
      <div className="hero-inner">
        {this.props.type === 'category' && (
          <SelectPreview posts={this.getPreviewPosts()} prefix={this.props.prefix} />
        )}

        {this.props.type === 'select' && (
          <PostSelect
            state={this.state}
            onInputFilterChange={this.handleInputFilterChange}
            onPostTypeChange={this.handlePostTypeChange}
            getSelectedPosts={this.getSelectedPosts}
            removePost={this.removePost}
            addPost={this.addPost}
            doPagination={this.doPagination}
            addExternalPosts={this.addExternalPosts}
            updatePosts={this.updatePosts}
            externalPosts={this.props.placeholderPosts}
            deletePlaceholderPost={this.deletePlaceholderPost}
            movePost={this.movePost}
            hideLineupsHeader={true}
            removeFeaturedImage={true}
          />
        )}
      </div>
    );
  }
}

export default DisplaySelect;
