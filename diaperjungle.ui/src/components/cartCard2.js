import React from 'react';
import {
  Table,
  Button
} from 'react-bootstrap';
import Checkout from './checkout';
import Modal from './modal';
import cartData from '../helpers/data/cartData';

export default class CartCard extends React.Component {
  state = {
    order: this.props.order,
    user: {},
  }

  componentDidMount() {
    this.getUserCartItems(this.state.order.fb_uid);
    this.setState({
      user: this.props.user
    });
    setTimeout(() => {
      this.addTotalToState();
    }, 1000);
  }

  getUserCartItems = (fbUid) => {
    cartData.getUserCart(fbUid).then((response) => {
      console.warn('cart response', response);
      this.setState({
        cart: response
      });
    });
  }

  deleteCart = (e, cartId) => {
    cartData.removeFromCart(e.target.id, cartId).then(() => {
      this.getUserCartItems(this.state.order.fb_uid);
    });
  }

  handleChange = (e) => {
    this.setState((prevState) => {
      const cart = { ...prevState.cart };
      cart.units = e.target.value;
      return { cart };
    });
  }

  addTotalToState = () => {
    let total = 0;
    this.state.cart.forEach((i) => {
      total += (i.price * i.units);
    });
    const renderTotal = total.toFixed(2);
    this.setState({
      orderTotal: Number(renderTotal)
    });
  }

  render() {
    const { cart } = this.state;
    let renderCart;
    if (cart && Object.keys(cart).length !== 0) {
      renderCart = cart.map((i) => <tr key={i.id} >
          <td>
              <Button
                className='btn-danger'
                id={i.id}
                onClick={(e) => this.deleteCart(e, cart.id)}>
                X
              </Button>
            </td>
            <td><p>{i.product_desc}</p></td>
            <td>{i.price}</td>
            <td>{i.units}</td>
            <td>${i.price * i.units}</td>
          </tr>);
    }
    let renderTotal;
    if (cart && Object.keys(cart).length !== 0) {
      let total = 0;
      this.state.cart.forEach((i) => {
        total += (i.price * i.units);
      });
      // renderTotal = this.setState({ orderTotal: total.toFixed(2) });
      renderTotal = total.toFixed(2);
      // this.setState({ orderTotal: renderTotal });
    }
    return (
        <div className="cartSummary">
            <h2>Cart</h2>
            <Table borderless>
                <thead>
                    <tr>
                        <th>Remove</th>
                        <th>Item</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Item Total</th>
                    </tr>
                </thead>
                <tbody>
                {renderCart}
            </tbody>
            </Table>
            <div className='cartTotal'>
            {this.state.cart !== undefined ? <h3>Cart Total: ${renderTotal}</h3> : <h3>Cart Total: $0</h3>}
             {this.state.cart !== undefined ? <Modal title={'Checkout'} buttonLabel={'Checkout'}>
                    {<Checkout cart={this.state.cart} order={this.state.order} orderTotal={this.state.orderTotal} />}
                  </Modal> : <div></div>}
            </div>
        </div>
    );
  }
}
