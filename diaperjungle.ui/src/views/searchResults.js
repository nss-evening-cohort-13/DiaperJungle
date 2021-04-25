import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import ProductCard from '../components/productCard';
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

    // const showResults = () => results.map((result) => <ProductCard key={result.id} product={result} />);
    const productCard = (product) => (
      <div className='product-card'>
      <div className='card m-2'>
        <h5 className='card-title'>{product.title}</h5>
        <div className='card-body'>
        <p className='card-text'>{product.description}</p>
        </div>
        <Link className='btn btn-primary' to={`/products/${product.id}`}>Product Details</Link>{' '}
      </div>
      </div>);

    const cards = results.map(productCard);

    return (
      <div>
        <h1>Search Results</h1>
        <div className='product-cards-container'>{cards}</div>
      </div>
    );
  }
}

export default SearchResults;
