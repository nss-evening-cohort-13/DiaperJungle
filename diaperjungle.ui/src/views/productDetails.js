import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Dropdown } from 'react-bootstrap';
import Modal from '../components/modal';
import ProductForm from './productUpdateForm';
import productData from '../helpers/data/productData';
import cartData from '../helpers/data/cartData';
// import userData from '../helpers/data/userData';

class ProductDetails extends Component {
    state = {
      units: [1, 2, 3, 4, 5],
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
      cartData.addToOrderProduct(this.state);
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
                {this.props.user && (
                  <>
                  <Button color="success" onClick={this.addToCart}>Add To Cart</Button>
                  <div>
                    <Dropdown>
                      <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
                        Quantity
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                      <Dropdown.Item value='1'>1</Dropdown.Item>
                      <Dropdown.Item value='1'>2</Dropdown.Item>
                      <Dropdown.Item value='1'>3</Dropdown.Item>
                      <Dropdown.Item value='1'>4</Dropdown.Item>
                      <Dropdown.Item value='1'>5</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                </div>
            </>
                )}
            </div>
      );
    }
}

export default ProductDetails;
