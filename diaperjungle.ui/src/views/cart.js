import React from 'react';
import CartCard from '../components/cartCard';
import cartData from '../helpers/data/cartData';

class Cart extends React.Component {
    state = {
      order: this.props.order,
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
              <h2>The Cart</h2>
              <CartCard />
            </>
      );
    }
}

export default Cart;
