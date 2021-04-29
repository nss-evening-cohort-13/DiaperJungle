import React from 'react';
import { Link } from 'react-router-dom';
import productData from '../helpers/data/productData';
// import ProductCard from '../components/productCard';

class Products extends React.Component {
    state = {
      products: []
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

    render() {
      const { products } = this.state;
      console.warn('products in render', products);

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
            <div>{cards}</div>
            </>
      );
    }
}

export default Products;
