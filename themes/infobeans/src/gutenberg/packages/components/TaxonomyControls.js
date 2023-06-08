import TaxonomySelect from './tax-selectors/TaxonomySelect';

const { Component } = wp.element;
const { __ } = wp.i18n;

class TaxonomyControls extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      taxonomies: [],
      postType: '',
    };
  }

  componentDidMount() {
    this.fetchTaxonomies();
  }

  componentDidUpdate(prevProps) {
    const { postType } = this.props;

    const prevPostType = prevProps.postType;
    const nextPostType = postType;

    if (prevPostType !== nextPostType) {
      this.fetchTaxonomies();
    }
  }

  /**
   * Higher order component that takes the attribute key,
   * this then returns a function which takes a value,
   * when called it updates the attribute with the key.
   * @param key
   * @returns {function(*): *}
   */
  // eslint-disable-next-line react/destructuring-assignment
  createUpdateAttribute = key => value => {
    this.props.setAttributes({ [key]: value });
    let taxParsedValue = [];
    try {
      taxParsedValue = JSON.parse(value);
    } catch (e) {
      /* Ignore */
    }

    if (
      this.props?.maxCountKey &&
      taxParsedValue &&
      taxParsedValue.filter(filterObj => filterObj.tax === this.props?.maxCountKey).length >
        this.props?.maxCount
    ) {
      document.getElementById('maxCountKey-notice').style.color = 'red';
    } else {
      this.props.setAttributes({ [key]: value });

      if (document.getElementById('maxCountKey-notice')) {
        document.getElementById('maxCountKey-notice').style.color = 'black';
      }
    }
  };

  handleApiResult = results => {
    const updatedResult = results;
    const { excludeTaxonomy, postType } = this.props;

    Object.keys(results).forEach(key => {
      if (excludeTaxonomy.includes(key)) {
        delete updatedResult[key];
      }
    });

    const tempArr = updatedResult;
    const updatedResultKeys = Object.keys(updatedResult);
    updatedResultKeys.forEach(key => {
      tempArr[key].route = `/idg/v1/${updatedResult[key].slug}`;
    });
    this.setState({
      taxonomies: tempArr,
      postType,
    });
  };

  fetchTaxonomies() {
    const { postType } = this.props;

    wp.apiRequest({
      path: `/wp/v2/taxonomies/?type=${postType === 'posts' ? 'post' : postType}`,
    }).then(this.handleApiResult);
  }

  render() {
    const { taxonomies } = this.state;
    const { filters, inludeTaxonomies, hideTaxonomy } = this.props;
    const { createUpdateAttribute } = this;

    const customTaxonomies = Object.keys(taxonomies).map(tax => (
      <div
        className={
          hideTaxonomy && !inludeTaxonomies.includes(taxonomies[tax].slug)
            ? 'excluded-taxonomies'
            : ''
        }
      >
        <label>
          {taxonomies[tax].name === 'Business Units & Publications'
            ? 'Publications'
            : taxonomies[tax].name}
          <br />
          <TaxonomySelect
            tax={taxonomies[tax]}
            postType={this.state.postType}
            value={filters}
            onChange={createUpdateAttribute('filters')}
          />
          {taxonomies[tax].name.toLowerCase() === this.props?.maxCountKey && (
            <p id="maxCountKey-notice" class="maxCountKey-notice">
              <strong>{__('Note: Max 4 sponsorships are allowed.', 'idg-b2b-base-theme')}</strong>
            </p>
          )}
          <br />
        </label>
      </div>
    ));

    return <div>{customTaxonomies}</div>;
  }
}

export default TaxonomyControls;
