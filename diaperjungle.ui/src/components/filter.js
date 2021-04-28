import React from 'react';
// import { Card } from 'react-bootstrap';
import productTypeData from '../helpers/data/productTypeData';
// import FilterCheckbox from './filterCheckbox';

export default class Filter extends React.Component {
    state = {
      categories: []
    }

    componentDidMount() {
      this.getProductTypes();
    }

    getProductTypes = () => {
      productTypeData.getAllProductTypes().then((response) => {
        this.setState({
          categories: response
        });
      });
    }

    numOfTypes = (categoryId) => {
      const { products } = this.props;
      const group = products.filter((product) => product.type_id === categoryId);
      return group.length;
    }

    render() {
      const { categories } = this.state;
      // const { filterProducts } = this.props;
      return (
        <>
          {categories.forEach((category) => { <h1>{category.category}</h1>; })}
                            {/* {categories.map((category) => {
                              if (this.numOfTypes(category.id) !== 0) {
                                return <FilterCheckbox key={category.id} category={category} quantity={this.numOfTypes(category.id)} filterProducts={filterProducts} />;
                              }
                            })} */}
        </>
      );
    }
}
