import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import productData from '../helpers/data/productData';

class ProductForm extends Component {
    state = {
    //   id: this.props.product.id || '',
    //   type_id: this.props.product.type_id || '',
    //   price: this.props.product.price || '',
    //   title: this.props.product.title || '',
    //   description: this.props.product.description || '',
    //   quantity: this.props.product.quantity || ''
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: '',
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      productData.addProduct(this.state);
    }

    render() {
      const dataItems = ['type_id', 'price', 'title', 'description', 'quantity'];
      return (
            <>
            <h2>Add A Product</h2>
            <h5>TypeId is a number 1 to 5</h5>
            <Form className='container mb-3' onSubmit={this.handleSubmit}>
                {
                    dataItems.map((item) => (
                        <Input
                        key={item}
                        className='mb-2'
                        type='text'
                        name={item}
                        id={item}
                        value={this.state[`${item}`]}
                        placeholder={`Enter ${item}`}
                        onChange={this.handleChange}
                        required
                   />
                    ))
                }
                <Button className='mt-3'>Submit</Button>
            </Form>
            </>
      );
    }
}

export default ProductForm;
