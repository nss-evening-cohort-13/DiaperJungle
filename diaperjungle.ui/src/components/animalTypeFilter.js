import React from 'react';
import { Dropdown } from 'react-bootstrap';
import AnimalTypeData from '../helpers/data/animalTypeData';

export default class AnimalTypeFilter extends React.Component {
  state = {
    animalcategories: [],
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

  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            Animals
          </Dropdown.Toggle>

          <Dropdown.Menu>
          {this.state.animalcategories.map((animal) => <Dropdown.Item key={animal.id} category={animal.animal_category}>{ animal.animal_category }</Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
