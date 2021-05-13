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

  addPaymentForm = () => {
    this.setState({
      addPay: true,
    });
  };

  removePaymentForm = () => {
    this.setState({
      addPay: false,
    });
  };

  removePaymentType = (id) => {
    paymentTypeData.deletePaymentType(id).then(() => {
      this.getAllOfThePaymentTypes();
    });
  };

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
                <Form.Control type='text' placeholder='Visa' />
              </Form.Group>
              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Card #</Form.Label>
                <Form.Control type='text' placeholder='12232432' />
              </Form.Group>
              <Button variant='primary' type='submit' onClick={this.removePaymentForm}>
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
