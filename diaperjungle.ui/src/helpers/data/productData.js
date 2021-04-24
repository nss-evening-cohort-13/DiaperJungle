import axios from 'axios';
import { baseUrl } from '../config.json';

const productUrl = `${baseUrl}/products`;

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${productUrl}`).then((response) => {
    console.warn('response', response);
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleProduct = (Id) => new Promise((resolve, reject) => {
  axios.get(`${productUrl}/${Id}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const deleteProducts = (Id) => axios.delete(`${productUrl}/${Id}`);

export default { getAllProducts, getSingleProduct, deleteProducts };
