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

const addProduct = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/gear.json`, data)
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/gear/${response.data.name}.json`, update)
        .then(() => {
          resolve(response);
        });
    }).catch((error) => reject(error));
});

const getSearchedProducts = (searchTerm) => new Promise((resolve, reject) => axios
  .get(`${productUrl}`).then((response) => {
    const searched = response.data.filter((product) => product.title.toLowerCase().includes(searchTerm));
    resolve(searched);
  }).catch((error) => reject(error)));

export default {
  getAllProducts,
  getSingleProduct,
  deleteProducts,
  addProduct,
  getSearchedProducts
};
