import React from 'react';
import { Link } from 'react-router-dom';
import productData from '../helpers/data/productData';
import ProductCard from '../components/productCard';
import Filter from '../components/filter';
import AnimalTypeFilter from '../components/animalTypeFilter';

class Products extends React.Component {
  state = {
    products: [],
    isSelected: [],
    animalId: -1,
  };

  componentDidMount() {
    this.getAllOfTheProducts();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getAllOfTheProducts = () => {
    productData.getAllProducts().then((response) => {
      this.setState({
        products: response,
      });
    });
  };

  // Pass to child to get data
  animalTypeData = (childData) => {
    this.setState({ animalId: childData }, () => { console.log('animal id', this.state.animalId); });
  }

  filterProductsByAnimalType = () => {};

  filterProducts = (e) => {
    const checkedType = parseInt(e.target.value, 10);
    const { isSelected, products } = this.state;

    if (e.target.checked && isSelected.length === 0) {
      const newChecked = products.filter(
        (product) => product.type_id === checkedType
      );
      this.setState({
        isSelected: newChecked,
      });
    } else if (e.target.checked && isSelected.length > 0) {
      const currentlyChecked = isSelected;
      const newChecked = products.filter(
        (product) => product.type_id === checkedType
      );
      currentlyChecked.forEach((product) => {
        newChecked.push(product);
      });
      this.setState({
        isSelected: newChecked,
      });
    } else if (!e.target.checked) {
      const noMatch = isSelected.filter(
        (product) => product.type_id !== checkedType
      );
      this.setState({
        isSelected: noMatch,
      });
    }
  };

  render() {
    const { isSelected, products } = this.state;
    const renderAllProductCards = () => products.map((product) => (<ProductCard key={product.id} product={product} />));
    const renderSelectedCards = () => isSelected.map((product) => (<ProductCard key={product.id} product={product} />));
    return (
      <>
        <h2>Products</h2>
        <div className='filter-container'>
          <Filter products={products} filterProducts={this.filterProducts} />
        </div>
        <div>
        <AnimalTypeFilter animalTypeData={this.animalTypeData}/>
        </div>
        <Link className='btn btn-info' to={'product-form'}>
          Add Products
        </Link>
        <div>
          {isSelected.length === 0
            ? renderAllProductCards()
            : renderSelectedCards()}
        </div>
      </>
    );
  }
}
export default Products;
