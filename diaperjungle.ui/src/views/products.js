import React from 'react';
import { Link } from 'react-router-dom';
import productData from '../helpers/data/productData';
// import ProductCard from '../components/productCard';
import Filter from '../components/filter';

class Products extends React.Component {
    state = {
      products: [],
      isChecked: []
    };

    componentDidMount() {
      this.getAllOfTheProducts();
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    getAllOfTheProducts = () => {
      productData.getAllProducts().then((response) => {
        this.setState({
          products: response,
        });
      });
    }

    filterProducts = (e) => {
      const checkedType = e.target.value;
      const { isChecked, products } = this.state;

      if (e.target.checked && isChecked.length === 0) {
        const newChecked = products.filter((p) => p.type_id === checkedType);
        this.setState({
          isChecked: newChecked
        });
      } else if (e.target.checked && isChecked.length > 0) {
        const currentlyChecked = isChecked;
        const newChecked = products.filter((p) => p.type_id === checkedType);
        currentlyChecked.forEach((p) => {
          newChecked.push(p);
        });
        this.setState({
          isChecked: newChecked
        });
      } else if (!e.target.checked) {
        const minusTarget = isChecked.filter((p) => p.type_id !== checkedType);
        this.setState({
          isChecked: minusTarget
        });
      }
    }

    render() {
      const { products } = this.state;

      const productCard = (product) => (
        <div className='product-card' style= {{ width: '500px' }}>
        <div className='card m-2'>
          <img src={product.image_url} alt=''></img>
          <h5 className='card-title'>{product.title}</h5>
          <div className='card-body'>
          <p className='card-text'>{product.description}</p>
          </div>
          <Link className='btn btn-primary' to={`/products/${product.id}`}>Product Details</Link>{' '}
        </div>
        </div>);

      const cards = products.map(productCard);
      // const cards = () => products.map((allProducts) => (
      //   <ProductCard key={allProducts.id} allProducts={allProducts} />
      // ));

      return (
            <>
            <h2>Products</h2>
            <div className="filter-container">
              <Filter products={products} filterProducts={this.filterProducts} />
            </div>
            <div>{cards}</div>
            </>
      );
    }
}

export default Products;
