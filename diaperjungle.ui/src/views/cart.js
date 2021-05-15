import React from 'react';
import CartCard from '../components/cartCard2';
import cartData from '../helpers/data/cartData';

class Cart extends React.Component {
    state = {
      order: this.props.order,
      user: this.props.user,
    };

    componentDidMount() {
      this.getUserCartItems(this.state.order.fb_uid);
    }

    getUserCartItems = (fbUid) => {
      cartData.getUserCart(fbUid).then((response) => {
        this.setState({
          cart: response
        });
      });
    }

    render() {
      return (
            <>
          <CartCard cart={this.state.cart} user={this.state.user}/>
            </>
      );
    }
}

export default Cart;
