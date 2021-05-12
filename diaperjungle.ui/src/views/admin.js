import React from 'react';
import { CardGroup } from 'react-bootstrap';
import orderData from '../helpers/data/orderData';
import OrderCard from '../components/orderCard';

export default class Admin extends React.Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    this.getAllTheOrders();
  }

  getAllTheOrders = () => {
    orderData.getAllCompletedOrders().then((response) => {
      this.setState({
        orders: response,
      });
    });
  }

  render() {
    const { orders } = this.state;
    const renderAllOrderCards = () => orders.map((order) => <OrderCard key={order.id} order={order}/>);

    return (
      <>
        <h2>Admin</h2>
        <CardGroup>
          {renderAllOrderCards()}
        </CardGroup>
      </>
    );
  }
}
