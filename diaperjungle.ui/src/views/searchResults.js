import React, { Component } from 'react';
import ProductCard from '../components/productCard';
import productData from '../helpers/data/productData';

class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
  };

  componentDidMount() {
    this.populateResults();
  }

  populateResults = () => {
    const searchTerm = this.props.match.params.term;

    productData.getSearchedProducts(searchTerm.toLowerCase()).then((response) => {
      this.setState({
        results: response,
        searchTerm,
      });
    });
  };

  componentDidUpdate(prevState) {
    if (prevState.searchTerm !== this.props.match.params.term) {
      this.populateResults();
    }
  }

  render() {
    const { results } = this.state;

    const showResults = () => results.map((result) => <ProductCard key={result.id} product={result} />);
    return (
      <div>
        <h1>Search Results</h1>
        <div className='product-cards-container'>{showResults()}</div>
      </div>
    );
  }
}

export default SearchResults;
