import React from 'react';
import CartCard from '../components/cartCard2';
// import cartData from '../helpers/data/cartData';

class Cart extends React.Component {
    state = {
      order: this.props.order,
      user: this.props.user,
    };

    componentDidMount() {
      // this.getUserCartItems(this.state.order.fb_uid);
    }

    render() {
      return (
            <>
          {/* {this.state.cart.length ? <CartCard cart={this.state.cart} user={this.state.user} order={this.state.order}/> : <h3>Loading...</h3>} */}
          <CartCard cart={this.state.cart} user={this.state.user} order={this.state.order}/>
            </>
      );
    }
}

export default Cart;
