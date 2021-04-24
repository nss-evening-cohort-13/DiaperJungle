import React, { Component } from 'react';
import { Button } from 'reactstrap';
import orderData from '../helpers/data/orderData';

class OrderSingleDetails extends Component {
    state = {
      orders: {},
    }

    componentDidMount() {
      // Assigning the id to a variable grabbing it from props/match/params/id
      const orderId = this.props.match.params.id;
      // Then passing the id to this function
      this.getASingleOrder(orderId);
    }

    // Gets a single order by Id and sets the state to that single order
    getASingleOrder = (orderId) => {
      orderData.getSingleOrder(orderId).then((response) => {
        this.setState({
          orders: response,
        });
      });
    }

    removeOrders = () => {
      // Grabs the id from the current state state/orders/id and removes it
      orderData.deleteOrders(this.state.orders.id).then(() => {
        // Goes back to the last page you were on
        this.props.history.goBack();
      });
    }

    render() {
      // instead of typing this.state.id I can type orders.id
      const { orders } = this.state;
      return (
            <div>
                <h1>This is the single order view</h1>
                <h2>{orders.id}</h2>
                <h3>{orders.user_id}</h3>
                <Button color="danger" onClick={this.removeOrders}>Remove Order</Button>{' '}
            </div>
      );
    }
}

export default OrderSingleDetails;
