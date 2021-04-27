import React, { Component } from 'react';
import {
  Button, Form, Input, InputGroup, InputGroupAddon
} from 'reactstrap';
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
      // const dataItems = ['type_id', 'price', 'title', 'description', 'quantity'];
      return (
            <>
            <h2>Add A Product</h2>
            <h5>TypeId is a number 1 to 5</h5>
            <Form className='container mb-3' onSubmit={this.handleSubmit}>
              <InputGroup size='lg'>
                <Input
                type='number'
                value={this.state.type_id}
                min={0} max={5}
                placeholder='1 - 5'
                onChange={this.handleChange}
                required
                />
                <InputGroupAddon addonType="append">Type ID</InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup size='lg'>
                <Input
                type='number'
                value={this.state.price}
                min={0} max={10000}
                onChange={this.handleChange}
                required
                />
                <InputGroupAddon addonType="append">$</InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup size='lg'>
                <Input
                type='text'
                value={this.state.title}
                onChange={this.handleChange}
                required
                />
                <InputGroupAddon addonType="append">Title</InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup size='lg'>
                <Input
                type='text'
                value={this.state.description}
                />
                <InputGroupAddon addonType="append">Descripton</InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup size='lg'>
                <Input
                type='number'
                value={this.state.type_id}
                min={0} max={1000}
                onChange={this.handleChange}
                required
                />
                <InputGroupAddon addonType="append">Quantity</InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup size='lg'>
                <Input
                type='number'
                value={this.state.type_id}
                min={0} max={1000}
                onChange={this.handleChange}
                required
                />
                <InputGroupAddon addonType="append">Quantity</InputGroupAddon>
              </InputGroup>
              <br />
                <Button className='mt-3'>Submit</Button>
            </Form>
            </>
      );
    }
}

export default ProductForm;
