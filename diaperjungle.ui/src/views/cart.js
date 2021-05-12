import React from 'react';
import CartCard from '../components/cartCard';

class Cart extends React.Component {
    state = {
      orders: [],
    };

    componentDidMount() { }

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
