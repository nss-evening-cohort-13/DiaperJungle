import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Modal from '../components/modal';
import ProductForm from './productUpdateForm';
import productData from '../helpers/data/productData';
import cartData from '../helpers/data/cartData';
// import userData from '../helpers/data/userData';

class ProductDetails extends Component {
    state = {
      units: [],
      products: {},
      order: this.props.order,
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
      cartData.addToOrderProduct(this.state).then(() => {
        this.props.history.goBack();
      });
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: parseInt(e.target.value, 10)
      });
    }

    render() {
      const { products } = this.state;
      return (
            <div className='single-product-view'>
                <h2>{products.title}</h2>
                <h3>{products.description}</h3>
                {this.props.user && (
                  <Button color="danger" onClick={this.removeProducts}>Delete</Button>
                )}
                {this.props.user && (
                  <Modal title={'Update Product'} buttonLabel={'Update Product'}>
                    {Object.keys(products).length && (
                      <ProductForm products={products} onUpdate={this.getASingleProduct} />
                    )}
                  </Modal>
                )}
                {this.props.user && (
                  <>
                  <Button color="success" onClick={this.addToCart}>Add To Cart</Button>
                    <select type='number' value={this.state.products.units} name='units' onChange={this.handleChange} required>
                      <option value='' disabled selected hidden>Quantity</option>
                      <option
                        type='number'
                        name='units'
                        value='1'
                        onChange={this.handleChange}>1</option>
                        <option
                        type='number'
                        name='units'
                        value='2'
                        onChange={this.handleChange}>2</option>
                        <option
                        type='number'
                        name='units'
                        value='3'
                        onChange={this.handleChange}>3</option>
                        <option
                        type='number'
                        name='units'
                        value='4'
                        onChange={this.handleChange}>4</option>
                        <option
                        type='number'
                        name='units'
                        value='5'
                        onChange={this.handleChange}>5</option>
              </select>
            </>
                )}
            </div>
      );
    }
}

export default ProductDetails;
