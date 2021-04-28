import React, { Component } from 'react';
import {
  Button, Form, Input, InputGroup, InputGroupAddon
} from 'reactstrap';
import productData from '../helpers/data/productData';

class ProductForm extends Component {
    state = {}

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      productData.addProduct(this.state).then(() => {
        this.props.history.goBack();
      });
    }

    render() {
      return (
            <>
            <h2>Add A Product</h2>
            <Form className='container mb-3' onSubmit={this.handleSubmit}>
              <InputGroup size='lg'>
                <Input
                type='number'
                name='type_id'
                value={this.state.type_id}
                min={35} max={43}
                placeholder='35 - 43'
                onChange={this.handleChange}
                required
                />
                <InputGroupAddon addonType="append">Type ID</InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup size='lg'>
                <Input
                type='number'
                name='animal_type_id'
                value={this.state.animal_type_id}
                min={1} max={10}
                placeholder='1 - 10'
                onChange={this.handleChange}
                required
                />
                <InputGroupAddon addonType="append">Animal Type ID</InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup size='lg'>
                <Input
                type='number'
                name='price'
                value={this.state.price}
                min={1} max={10000}
                onChange={this.handleChange}
                required
                />
                <InputGroupAddon addonType="append">$</InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup size='lg'>
                <Input
                type='text'
                name='title'
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
                name='description'
                value={this.state.description}
                onChange={this.handleChange}
                required
                />
                <InputGroupAddon addonType="append">Description</InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup size='lg'>
                <Input
                type='number'
                name='quantity'
                value={this.state.quantity}
                min={1} max={1000}
                onChange={this.handleChange}
                required
                />
                <InputGroupAddon addonType="append">Quantity</InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup size='lg'>
                <Input
                type='url'
                name='image_url'
                value={this.state.image_url}
                onChange={this.handleChange}
                required
                />
                <InputGroupAddon addonType="append">Image URL</InputGroupAddon>
              </InputGroup>
              <br />
                <Button className='mt-3'>Submit</Button>
            </Form>
            </>
      );
    }
}

export default ProductForm;
