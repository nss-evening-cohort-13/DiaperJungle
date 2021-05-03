import React from 'react';
import { Dropdown } from 'react-bootstrap';
import AnimalTypeData from '../helpers/data/animalTypeData';

export default class AnimalTypeFilter extends React.Component {
  state = {
    animalcategories: [],
    animalType: '',
  }

  componentDidMount() {
    this.getAnimalTypesData();
  }

  getAnimalTypesData() {
    AnimalTypeData.getAllAnimalTypes().then((animaltypes) => {
      this.setState({
        animalcategories: animaltypes
      });
    })
      .catch((err) => console.error('unable to get data for animal type: ', err));
  }

  animalChange = (e) => {
    e.preventDefault();
    this.setState({ animalType: e.target.id });
  }

  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            Animals
          </Dropdown.Toggle>

          <Dropdown.Menu>
          {this.state.animalcategories.map((animal) => <Dropdown.Item key={animal.id} id={animal.id}>{ animal.animal_category }</Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
