import React from 'react';
import { CardGroup } from 'react-bootstrap';
import {
  Card, CardText, CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import orderData from '../helpers/data/orderData';

class Orders extends React.Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    this.getAllTheOrders();
  }

  getAllTheOrders = () => {
    orderData.getAllOrders().then((response) => {
      this.setState({
        orders: response,
      });
    });
  }

  render() {
    const { orders } = this.state;

    const orderCard = (order) => (
      <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Id: {order.id}</CardTitle>
          <CardText>Pay_Type: {order.pay_type}</CardText>
          <CardText>User_Id: {order.user_id}</CardText>
          <CardText>Total_Cost: ${order.total_cost}</CardText>
          <Link className="btn btn-primary" to={`/orders/${order.id}`}>Order Single view</Link>{' '}
        </CardBody>
      </Card>
    </div>
    );
      // creates a new array of cards with the data of Order
    const cards = orders.map(orderCard);

    return (
      <>
        <h2>Orders</h2>
        <CardGroup>
          {cards}
        </CardGroup>
      </>
    );
  }
}

export default Orders;
