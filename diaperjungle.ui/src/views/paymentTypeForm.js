import React from 'react';
import {
  Container,
  Row,
  Form,
  Button
} from 'react-bootstrap';
import PaymentTypeCard from '../components/paymentTypeCard';
import paymentTypeData from '../helpers/data/paymentTypeData';

export default class PaymentTypeForm extends React.Component {
  state = {
    paymentTypes: [],
    addPay: false,
    user_id: this.props.userTable.id,
  };

  componentDidMount() {
    this.getAllOfThePaymentTypes(this.state.user_id);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.type !== 'text' ? parseInt(e.target.value, 10) : e.target.value
    });
  }

  getAllOfThePaymentTypes = (uid) => {
    paymentTypeData.getPaymentTypesByUid(uid).then((response) => {
      this.setState({
        paymentTypes: response,
      });
    });
  };

  addPaymentForm = () => {
    this.setState({
      addPay: true,
    });
  };

  removePaymentType = (id) => {
    paymentTypeData.deletePaymentType(id).then(() => {
      this.getAllOfThePaymentTypes(this.state.user_id);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      addPay: false,
    });
    console.warn(this.state);
    paymentTypeData.addPaymentType(this.state).then(() => {
      this.getAllOfThePaymentTypes(this.state.user_id);
    });
  }

  render() {
    const { paymentTypes } = this.state;
    const renderAllPaymentTypeCards = () => paymentTypes.map((payment) => (<PaymentTypeCard key={payment.id} payment={payment} removePaymentType={this.removePaymentType}/>));
    return (
      <>
        <div>
          <h1>Payments</h1>
          <Button variant="primary" onClick={this.addPaymentForm}> Add Payment </Button>
          <Container>
            <Row>{renderAllPaymentTypeCards()}</Row>
          </Container>
        </div>
        <div>
          {this.state.addPay ? (
            <Form>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Payment Type</Form.Label>
                <Form.Control type='text' name='pay_type' value={this.state.pay_type} onChange={this.handleChange} required/>
              </Form.Group>
              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Card #</Form.Label>
                <Form.Control type='number' name='account_number' value={this.state.account_number} onChange={this.handleChange} required/>
              </Form.Group>
              <Button variant='primary' type='submit' onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          ) : (
            <p></p>
          )}
        </div>
      </>
    );
  }
}
