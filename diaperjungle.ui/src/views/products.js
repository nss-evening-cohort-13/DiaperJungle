import React from 'react';
import { Link } from 'react-router-dom';
import productData from '../helpers/data/productData';
import ProductCard from '../components/productCard';
import Filter from '../components/filter';
import AnimalTypeFilter from '../components/animalTypeFilter';

class Products extends React.Component {
  state = {
    products: [],
    isSelectedCheckbox: [],
    isSelectedDropdown: [],
    isSelectedFiltered: [],
    animalId: -1,
  };

  componentDidMount() {
    this.getAllOfTheProducts();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getAllOfTheProducts = () => {
    productData.getAllProducts().then((response) => {
      this.setState({
        products: response,
      });
    });
  };

  // Pass to child to get data also filter the data as it comes back
  animalData = (childData) => {
    this.setState({ animalId: childData }, this.animalTypeFilter);
  }

  animalTypeFilter = () => {
    // getting the animal type id currently selected set in state
    let animalTypeId = parseInt(this.state.animalId, 10);
    const { isSelectedDropdown, products } = this.state;
    // Filter over products and grab the product that matches the animal type id
    if (animalTypeId !== -1 && isSelectedDropdown.length === 0) {
      const animalMatchArray = products.filter(
        (product) => product.animal_type_id === animalTypeId
      );
      this.setState({
        isSelectedDropdown: animalMatchArray,
      }, this.filterCheckboxAndDropdown);
      // If there is already an animal picked clear state get the new id re-filter and add back to state the new list
    } else if (animalTypeId !== -1 && isSelectedDropdown.length > 0) {
      this.setState({
        isSelectedDropdown: [],
      }, this.filterCheckboxAndDropdown);
      animalTypeId = parseInt(this.state.animalId, 10);
      const animalMatchArray = products.filter(
        (product) => product.animal_type_id === animalTypeId
      );
      this.setState({
        isSelectedDropdown: animalMatchArray,
      }, this.filterCheckboxAndDropdown);
    }
  }

  filterProducts = (e) => {
    // getting the typed id from filter? storing it in checkedtype
    const checkedType = parseInt(e.target.value, 10);
    const { isSelectedCheckbox, products } = this.state;
    // if the event target is checked and the length of isSelectedCheckbox is 0 filter over products find the type_id that is = to checked type and
    // set isSelectedCheckbox in state to the information passed.
    if (e.target.checked && isSelectedCheckbox.length === 0) {
      const newChecked = products.filter(
        (product) => product.type_id === checkedType
      );
      this.setState({
        isSelectedCheckbox: newChecked,
      }, this.filterCheckboxAndDropdown);
      // if the event target is checked and the length of isSelectedCheckbox is > then 0 currently checked is = to isSelectedCheckbox
      // then we create a new variable where we filter over products again then forEach over currently checked for each product in currently checked we push to newChecked
      // set state isSelectedCheckbox to newChecked
    } else if (e.target.checked && isSelectedCheckbox.length > 0) {
      const currentlyChecked = isSelectedCheckbox;
      const newChecked = products.filter(
        (product) => product.type_id === checkedType
      );
      currentlyChecked.forEach((product) => {
        newChecked.push(product);
      });
      this.setState({
        isSelectedCheckbox: newChecked,
      }, this.filterCheckboxAndDropdown);
      // if the event target is not checked
    } else if (!e.target.checked) {
      const noMatch = isSelectedCheckbox.filter(
        (product) => product.type_id !== checkedType
      );
      this.setState({
        isSelectedCheckbox: noMatch,
      }, this.filterCheckboxAndDropdown);
    }
  };

  //only show stuff that is matching need to set conditions for when things don't match or for when only the checkboxes or the dropdown is used
  filterCheckboxAndDropdown = () => {
    const thingArray = [];
    // loop over isSelectedCheck
    this.state.isSelectedCheckbox.forEach((animalCheck) => {
      // loop over isSelectedDrop
      this.state.isSelectedDropdown.forEach((animalDrop) => {
        // find the products that match both conditions
        if (animalCheck.animal_type_id === animalDrop.id) {
          thingArray.push(animalDrop);
        }
      });
    });
    // set the state of isSelectedFilter with the results
    this.setState({
      isSelectedFiltered: thingArray,
    });
  }

  render() {
    const { isSelectedFiltered, products } = this.state;
    const renderAllProductCards = () => products.map((product) => (<ProductCard key={product.id} product={product} />));
    const renderSelectedCards = () => isSelectedFiltered.map((product) => (<ProductCard key={product.id} product={product} />));
    return (
      <>
        <h2>Products</h2>
        <div className='filter-container'>
          <Filter products={products} filterProducts={this.filterProducts} />
        </div>
        <div>
        <AnimalTypeFilter animalTypeData={this.animalData}/>
        </div>
        <Link className='btn btn-info' to={'product-form'}>
          Add Products
        </Link>
        <div>
          {isSelectedFiltered.length === 0
            ? renderAllProductCards()
            : renderSelectedCards()}
        </div>
      </>
    );
  }
}
export default Products;
