import React from 'react';
import productData from '../helpers/data/productData';

class Products extends React.Component {
    state = {
      products: []
    };

    componentDidMount() {
      this.getAllOfTheProducts();
    }

    getAllOfTheProducts = () => {
      productData.getAllProducts().then((response) => {
        this.setState({
          products: response,
        });
      });
    }

    render() {
      const { products } = this.state;
      console.warn('products', products);

      const productCard = (product) => (
             <div>
                 {product.title}
             </div>);

      const cards = products.map(productCard);
      // console.warn('cards', cards);

      return (
            <>
            <h2>Products</h2>
            {cards}
            </>
      );
    }
}

export default Products;
