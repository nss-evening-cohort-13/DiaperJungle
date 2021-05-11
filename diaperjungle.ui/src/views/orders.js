import React from 'react';
import { CardGroup } from 'react-bootstrap';
import orderData from '../helpers/data/orderData';
// import payTypeData from '../helpers/data/payTypesData';
import OrderCard from '../components/orderCard';

class Orders extends React.Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    const fbUid = this.props.match.params.id;
    this.getAllOrderByUser(fbUid);
  }

  getAllOrderByUser = (fbUid) => {
    orderData.getAllCompletedUserOrders(fbUid).then((response) => {
      this.setState({
        orders: response,
      });
    });
  }

  // getPaymentType = (payTypeId) => {
  //   payTypeData.getPayTypeById(payTypeId).then((response) => response.pay_type);
  // }

  render() {
    const { orders } = this.state;
    const renderAllOrderCards = () => orders.map((order) => <OrderCard key={order.id} order={order}/>);

    return (
      <>
        <h2>Orders</h2>
        <CardGroup>
          {renderAllOrderCards()}
        </CardGroup>
      </>
    );
  }
}

export default Orders;
