import axios from 'axios';
import { baseUrl } from '../config.json';

const animalTypeUrl = `${baseUrl}/animaltypes`;

const getAllAnimalTypes = () => new Promise((resolve, reject) => {
  axios.get(`${animalTypeUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleAnimalType = (Id) => new Promise((resolve, reject) => {
  axios.get(`${animalTypeUrl}/${Id}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

export default { getAllAnimalTypes, getSingleAnimalType };
