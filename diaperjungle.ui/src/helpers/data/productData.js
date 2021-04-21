import axios from 'axios';
import { baseUrl } from '../config.json';

const productUrl = `${baseUrl}/products`;

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${productUrl}`).then((response) => {
    console.warn('response', response);
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

export default { getAllProducts };
