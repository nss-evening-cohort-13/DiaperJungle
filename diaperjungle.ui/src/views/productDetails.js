import React, { Component } from 'react';
import { Button } from 'reactstrap';
import productData from '../helpers/data/productData';

class ProductDetails extends Component {
    state = {
      products: {},
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

    render() {
      const { products } = this.state;
      return (
            <div className='single-product-view'>
                <h1>This is the single product view</h1>
                <h2>{products.title}</h2>
                <h3>{products.description}</h3>
                <Button color="danger" onClick={this.removeProducts}>Delete</Button>{' '}
                <Button color="success" onClick={''}>Add To Cart</Button>{' '}
            </div>
      );
    }
}

export default ProductDetails;
