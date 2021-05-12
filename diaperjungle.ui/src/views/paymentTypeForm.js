import React from 'react';
import paymentTypeData from '../helpers/data/paymentTypeData';

export default class PaymentTypeForm extends React.Component {
  state = {
    paymentTypes: [],
  };

  componentDidMount() {
    this.getAllOfThePaymentTypes();
  }

  getAllOfThePaymentTypes = () => {
    paymentTypeData.getAllPaymentTypes().then((response) => {
      this.setState({
        paymentTypes: response,
      });
    });
  };

  render() {
    return (
    <div>
    <h1>Payments</h1>
    <button>Add Payment</button>
    </div>
    );
  }
}
