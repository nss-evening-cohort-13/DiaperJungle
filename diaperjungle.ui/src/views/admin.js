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

    let orderTotal;
    if (orders.length !== 0) {
      let total = 0;
      orders.forEach((item) => {
        total += (item.total_cost);
      });
      orderTotal = total;
    }

    return (
      <>
        <h2>Admin</h2>
        <h2>Total Of All Orders: ${`${orderTotal}`}</h2>
        <CardGroup className='order-cards-container'>
          {renderAllOrderCards()}
        </CardGroup>
      </>
    );
  }
}
