import React, { Component } from 'react';
import {
  Form,
  Button
} from 'react-bootstrap';
import paymentTypeData from '../helpers/data/paymentTypeData';
import orderData from '../helpers/data/orderData';

export default class Checkout extends Component {
  state = {
    paymentTypes: [],
    order: this.props.order,
    orderTotal: this.props.orderTotal
  }

  componentDidMount() {
    this.getAllOfThePaymentTypes(this.state.order.user_id);
  }

  getAllOfThePaymentTypes = (id) => {
    paymentTypeData.getPaymentTypesByUid(id).then((response) => {
      this.setState({
        paymentTypes: response,
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10)
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    orderData.completeOrder(this.state);
  }

  render() {
    const { paymentTypes } = this.state;
    const paymentOptions = () => paymentTypes.map((payments) => (
        <option key={payments.id}
        type='number'
        name='paymentTypeId'
        value={payments.id}
        onChange={this.handleChange}>{payments.pay_type}</option>
    ));
    return (
            <>
            <Form>
            <select type='number' value={this.state.paymentTypes.id} name='id' onChange={this.handleChange} required>
                <option value='' disabled selected hidden>Select Payment Type</option>
                {paymentOptions()}
              </select>
            <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>
            </>
    );
  }
}
