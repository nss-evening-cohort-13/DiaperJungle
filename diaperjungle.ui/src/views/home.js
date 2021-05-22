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
              <div className="jumbotron jumbotron-fluid">
                <div className="container">
                  <h1 className="display-4">Welcome to Diaper Jungle</h1>
                  <hr className="my-4"/>
                  <p className="lead">Your one-stop shop for all your non-human diaper needs. A variety of colors, team logos and environmentally friendly materials are available. Any animal, any size. We&#39;ve got your back... end</p>
                </div>
              </div>
              <div className='home-cards-container'>
                {renderAllProductCards()}
              </div>
            </>
      );
    }
}
export default Home;
