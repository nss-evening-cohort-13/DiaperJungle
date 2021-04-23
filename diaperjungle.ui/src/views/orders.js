import React from 'react';
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

    const orderCard = (order) => <div>{order.pay_type}</div>;

    const cards = orders.map(orderCard);

    return (
      <>
        <h2>Orders</h2>
        {cards}
      </>
    );
  }
}

export default Orders;
