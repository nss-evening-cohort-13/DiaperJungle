import React, { Component } from 'react';
import {
  Button, Form, Input, InputGroup, InputGroupAddon
} from 'reactstrap';
import productData from '../helpers/data/productData';
import productTypeData from '../helpers/data/productTypeData';
import animalTypeData from '../helpers/data/animalTypeData';

class ProductUpdateForm extends Component {
    state = {
      productType: [],
      animalType: [],
      animal_type_id: this.props.products?.animal_type_id || '',
      description: this.props.products?.description || '',
      id: this.props.products?.id || '',
      image_url: this.props.products?.image_url || '',
      price: this.props.products?.price || '',
      quantity: this.props.products?.quantity || '',
      title: this.props.products?.title || '',
      type_id: this.props.products?.type_id || ''
    }

    componentDidMount() {
      this.getAllOfTheProductTypes();
      this.getAllOfTheAnimalTypes();
    }

    getAllOfTheProductTypes = () => {
      productTypeData.getAllProductTypes().then((response) => {
        this.setState({
          productType: response,
        });
      });
    }

    getAllOfTheAnimalTypes = () => {
      animalTypeData.getAllAnimalTypes().then((response) => {
        this.setState({
          animalType: response,
        });
      });
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.type !== 'text' ? parseInt(e.target.value, 10) : e.target.value
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      productData.updateProducts(this.state).then(() => {
        this.props.onUpdate?.(this.state.id);
      });
      this.props.toggle();
    }

    render() {
      const { productType, animalType } = this.state;
      const productOptions = () => productType.map((product) => (
        <option key={product.id}
        type='number'
        name='type_id'
        value={product.id}
        onChange={this.handleChange}>{product.category}</option>
      ));
      const animalOptions = () => animalType.map((animal) => (
        <option key={animal.id}
        type='number'
        name='animal_type_id'
        value={animal.id}
        onChange={this.handleChange}>{animal.animal_category}</option>
      ));

      return (
            <>
            <h2>Product Form</h2>
            <Form className='container mb-3' onSubmit={this.handleSubmit}>
              <select type='number' value={this.state.productType.type_id} name='type_id' onChange={this.handleChange} required>
                <option value='' disabled selected hidden>Product Type</option>
                {productOptions()}
              </select>
              <select type='number' value={this.state.animalType.id} name='animal_type_id' onChange={this.handleChange} required>
                <option value='' disabled selected hidden>Animal Type</option>
                {animalOptions()}
              </select>
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
                type='text'
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

export default ProductUpdateForm;
