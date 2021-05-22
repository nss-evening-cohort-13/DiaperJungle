import React from 'react';
import { Dropdown } from 'react-bootstrap';
import AnimalTypeData from '../helpers/data/animalTypeData';

export default class AnimalTypeFilter extends React.Component {
  state = {
    animalcategories: [],
    animalId: -1,
    animalName: 'Animal',
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

  getAnimalId = (e) => {
    this.props.animalTypeData(e);
    const foundAnimal = this.state.animalcategories.find((animal) => parseInt(animal.id, 10) === parseInt(e, 10));
    this.setState({ animalId: e, animalName: foundAnimal.animal_category });
  }

  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
          {this.state.animalName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {this.state.animalcategories.map((animal) => <Dropdown.Item key={animal.id} eventKey={animal.id} id={animal.id} onSelect={this.getAnimalId}>
              { animal.animal_category }
            </Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
