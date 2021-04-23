import React from 'react';
import productTypeData from '../helpers/data/productTypeData';

class ProductTypes extends React.Component {
    state = {
      productTypes: []
    };

    componentDidMount() {
      this.getAllOfTheProductTypes();
    }

    getAllOfTheProductTypes = () => {
      productTypeData.getAllProductTypes().then((response) => {
        this.setState({
          productTypes: response,
        });
      });
    }

    render() {
      const { productTypes } = this.state;
      console.warn('productTypes', productTypes);

      const productCard = (productType) => (
             <div>
                 {productType.category}
             </div>);

      const cards = productTypes.map(productCard);
      // console.warn('cards', cards);

      return (
            <>
            <h2>Product Types!!!!</h2>
            {cards}
            </>
      );
    }
}

export default ProductTypes;
