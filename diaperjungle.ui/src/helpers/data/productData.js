import axios from 'axios';
import { baseUrl } from '../config.json';

const productUrl = `${baseUrl}/products`;

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${productUrl}`).then((response) => {
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

const getSearchedProducts = (searchTerm) => new Promise((resolve, reject) => axios
  .get(`${productUrl}`).then((response) => {
    const searched = response.data.filter((product) => product.title.toLowerCase().includes(searchTerm));
    resolve(searched);
  }).catch((error) => reject(error)));

export default {
  getAllProducts,
  getSingleProduct,
  deleteProducts,
  getSearchedProducts
};
