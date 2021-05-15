import React, { Component } from 'react';
import { Button } from 'reactstrap';
import orderData from '../helpers/data/orderData';
import orderProductData from '../helpers/data/orderProductData';
// import productData from '../helpers/data/productData';
import ProductCard from '../components/productCard';

class OrderSingleDetails extends Component {
    state = {
      order: {},
      products: [],
    }

    componentDidMount() {
      // Assigning the id to a variable grabbing it from props/match/params/id
      const orderId = this.props.match.params.id;
      // Then passing the id to this function
      this.getASingleOrder(orderId);
      this.getOrderProductIds(orderId);
    }

    // Gets a single order by Id and sets the state to that single order
    getASingleOrder = (orderId) => {
      orderData.getSingleOrder(orderId).then((response) => {
        this.setState({
          order: response,
        });
      });
    }

    getOrderProductIds = (orderId) => {
      orderProductData.getProductsOfAnOrder(orderId).then((response) => {
        this.setState({
          products: response,
        });
      });
    }

    removeOrder = () => {
      // Grabs the id from the current state state/orders/id and removes it
      orderData.deleteOrders(this.state.orders.id).then(() => {
        // Goes back to the last page you were on
        this.props.history.goBack();
      });
    }

    render() {
      // instead of typing this.state.id I can type orders.id
      const { order, products } = this.state;
      const renderAllProductCards = () => products.map((product) => <ProductCard key={product.id} product={product} />);
      return (
            <div>
                <h1>This is the single order view</h1>
                <h2>Order #{order.id}</h2>
                <Button color="danger" onClick={this.removeOrder}>Remove Order</Button>{' '}
                <div className='single-order-cards'>{renderAllProductCards()}</div>
            </div>
      );
    }
}

export default OrderSingleDetails;
