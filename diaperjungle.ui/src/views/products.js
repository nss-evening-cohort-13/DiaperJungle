import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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

  // can't think of a better way to do this at the moment checkboxes are evil
  clearFilter = () => {
    // this.setState({
    //   isSelectedCheckbox: [],
    //   isSelectedDropdown: [],
    //   isSelectedFiltered: [],
    //   animalId: -1,
    // });
    // This will refresh to page and reset state
    window.location.reload(true);
  }

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

  // Can't clear the filtered results when a checkbox is unchecked
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

  filterCheckboxAndDropdown = () => {
    const animalFilterArray = [];
    // Checks if the dropdown and checkbox have anything in them if no dropdown item is selected display the checkboxed items
    if (this.state.isSelectedDropdown.length === 0 && this.state.isSelectedCheckbox.length > 0) {
      this.setState({
        isSelectedFiltered: this.state.isSelectedCheckbox,
      });
    // Checks if the dropdown and checkbox have anything in them if no checkbox item is selected display the dropdown items
    } else if (this.state.isSelectedDropdown.length > 0 && this.state.isSelectedCheckbox.length === 0) {
      this.setState({
        isSelectedFiltered: this.state.isSelectedDropdown,
      });
      // Checks if the dropdown and checkbox have anything in them if they both have something in filter the results and display them
    } else if (this.state.isSelectedDropdown.length > 0 && this.state.isSelectedCheckbox.length > 0) {
      this.setState({
        isSelectedFiltered: [],
      });
      // loop over isSelectedCheck
      this.state.isSelectedCheckbox.forEach((animalCheck) => {
      // loop over isSelectedDrop
        this.state.isSelectedDropdown.forEach((animalDrop) => {
        // find the products that match both conditions
          if (animalCheck.animal_type_id === animalDrop.id) {
            animalFilterArray.push(animalDrop);
          }
        });
      });
      // set the state of isSelectedFilter with the results
      this.setState({
        isSelectedFiltered: animalFilterArray,
      });
    } else {
      this.setState({
        isSelectedFiltered: [],
      });
    }
  }

  render() {
    let productsPage;
    const { isSelectedFiltered, products } = this.state;
    const renderAllProductCards = () => products.map((product) => (<ProductCard key={product.id} product={product} />));
    const renderSelectedCards = () => isSelectedFiltered.map((product) => (<ProductCard key={product.id} product={product} />));

    // Decides what get rendered on the page if the filter is empty but the checkbox and drop down are not display "No Match Found"
    if (isSelectedFiltered.length === 0 && this.state.isSelectedDropdown.length > 0 && this.state.isSelectedCheckbox.length > 0) {
      productsPage = <h1>No Match Found</h1>;
    } else if (isSelectedFiltered.length > 0) {
      productsPage = renderSelectedCards();
    } else {
      productsPage = renderAllProductCards();
    }

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
        <Button variant="warning" onClick={this.clearFilter}>Clear Filter</Button>{' '}
        <div className='product-cards-container'>
            {productsPage}
        </div>
      </>
    );
  }
}
export default Products;
