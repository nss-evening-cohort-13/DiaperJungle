import React from 'react';
import productData from '../helpers/data/productData';
import ProductCard from '../components/productCard';

class Home extends React.Component {
    state = {
      products: [],
    };

    componentDidMount() {
      this.getAllOfTheProducts();
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    getAllOfTheProducts = () => {
      productData.getRecentTwentyProducts().then((response) => {
        this.setState({
          products: response,
        });
      });
    }

    render() {
      const { products } = this.state;
      const renderAllProductCards = () => products.map((product) => <ProductCard key={product.id} product={product} />);
      return (
            <>
              <h2>Home</h2>
              <div>
                {renderAllProductCards()}
              </div>
            </>
      );
    }
}
export default Home;
