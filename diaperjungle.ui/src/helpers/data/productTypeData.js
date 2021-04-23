import axios from 'axios';
import { baseUrl } from '../config.json';

const productTypeUrl = `${baseUrl}/producttypes`;

const getAllProductTypes = () => new Promise((resolve, reject) => {
  axios.get(`${productTypeUrl}`).then((response) => {
    console.warn('response', response);
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

export default { getAllProductTypes };