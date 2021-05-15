import React from 'react';
import {
  Table,
//   Button
} from 'react-bootstrap';
import cartData from '../helpers/data/cartData';

export default class CartCard extends React.Component {
  state = {
    carts: this.props.cart
  }

  componentDidMount() { }

  deleteCart = (e) => {
    cartData.removeFromCart(e.target.id, this.props.cart.id);
  }

  render() {
    const { cart } = this.props;
    let renderCart;
    if (cart && Object.keys(cart).length !== 0) {
      renderCart = cart.map((i) => <tr key={i.id} >
            <td><p>{i.product_desc}</p></td>
            <td>{i.price}</td>
            <td>{i.units}</td>
            <td>${i.price * i.units}</td>
            <td>
              {/* <Button
                className='btn-danger'
                id={i.id}
                onClick={(e) => this.deleteCart(e, cart.id)}>
                X
              </Button> */}
            </td>
          </tr>);
    }
    let renderTotal;
    if (cart && Object.keys(cart).length !== 0) {
      let total = 0;
      this.props.cart.forEach((i) => {
        total += (i.price * i.units);
      });
      renderTotal = total;
    }
    return (
        <div className="cartSummary">
            <h2>Cart</h2>
            <Table borderless>
                <thead>
                    <tr>
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
            <h3 className="cart-total">Cart Total: ${renderTotal}</h3>
            {/* <Button variant="outline-info">Checkout</Button> */}
        </div>
    );
  }
}
