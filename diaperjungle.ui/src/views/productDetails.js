import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Modal from '../components/modal';
import ProductForm from './productUpdateForm';
import productData from '../helpers/data/productData';
import orderData from '../helpers/data/orderData';
import cartData from '../helpers/data/cartData';
// import userData from '../helpers/data/userData';

class ProductDetails extends Component {
    state = {
      products: {},
      order: {},
      user: {}
    }

    componentDidMount() {
      const productId = this.props.match.params.id;
      this.getASingleProduct(productId);
    }

    getASingleProduct = (productId) => {
      productData.getSingleProduct(productId).then((response) => {
        this.setState({
          products: response,
        });
      });
    }

    removeProducts = () => {
      productData.deleteProducts(this.state.products.id).then(() => {
        this.props.history.goBack();
      });
    }

    addToCart = (e) => {
      e.preventDefault();
      if (this.state.order === '') {
        orderData.addOrder(this.state).then(() => {
          console.warn('Order created');
        });
      } else {
        cartData.addToOrderProduct(this.state);
      }
    }

    render() {
      const { products } = this.state;
      return (
            <div className='single-product-view'>
                <h1>This is the single product view</h1>
                <h2>{products.title}</h2>
                <h3>{products.description}</h3>
                <Button color="danger" onClick={this.removeProducts}>Delete</Button>{' '}
                {(
                  <Modal title={'Update Product'} buttonLabel={'Update Product'}>
                    {Object.keys(products).length && (
                      <ProductForm products={products} onUpdate={this.getASingleProduct} />
                    )}
                  </Modal>
                )}
                <Button color="success" onClick={this.addToCart}>Add To Cart</Button>{' '}
            </div>
      );
    }
}

export default ProductDetails;
