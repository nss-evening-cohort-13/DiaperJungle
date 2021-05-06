import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Modal from '../components/modal';
import ProductForm from './productUpdateForm';
import productData from '../helpers/data/productData';
import orderData from '../helpers/data/orderData';

class ProductDetails extends Component {
    state = {
      products: {},
      order: {}
    }

    componentDidMount() {
      const productId = this.props.match.params.id;
      this.getASingleProduct(productId);
      this.checkIfUserHasAnIncompleteOrder(this.props.user.uid);
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

    checkIfUserHasAnIncompleteOrder = (fbUid) => {
      orderData.getNotCompletedOrders(fbUid).then((response) => {
        this.setState({
          order: response,
        });
      });
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
                <Button color="success" >Add To Cart</Button>{' '}
            </div>
      );
    }
}

export default ProductDetails;
