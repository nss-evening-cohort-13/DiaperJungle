import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';

class ProductForm extends Component {
    state = {
    //   id: this.props.product.id || '',
    //   type_id: this.props.product.type_id || '',
    //   price: this.props.product.price || '',
    //   title: this.props.product.title || '',
    //   description: this.props.product.description || '',
    //   quantity: this.props.product.quantity || ''
      id: 2,
    }

    render() {
      const dataItems = ['price', 'title', 'description', 'quantity'];
      return (
            <>
            <h2>Add A Product</h2>
            <Form className='container mb-3'>
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
