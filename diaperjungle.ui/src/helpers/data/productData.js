import axios from 'axios';
import { baseUrl } from '../config.json';

const productUrl = `${baseUrl}/products`;

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${productUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getRecentTwentyProducts = () => new Promise((resolve, reject) => {
  axios.get(`${productUrl}/recent`).then((response) => {
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
  axios.post(`${productUrl}`, data)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

const getSearchedProducts = (searchTerm) => new Promise((resolve, reject) => axios
  .get(`${productUrl}`).then((response) => {
    const searched = response.data.filter((product) => product.title.toLowerCase().includes(searchTerm));
    resolve(searched);
  }).catch((error) => reject(error)));

const updateProducts = (data) => new Promise((resolve, reject) => {
  const objData = data;
  const newObj = {
    id: objData.id,
    type_id: objData.type_id,
    animal_type_id: objData.animal_type_id,
    price: objData.price,
    title: objData.title,
    description: objData.description,
    quantity: objData.quantity,
    image_url: objData.image_url,
  };
  axios.put(`${productUrl}/${data.id}/update`, newObj)
    .then(resolve)
    .catch((error) => reject(error));
});

export default {
  getAllProducts,
  getRecentTwentyProducts,
  getSingleProduct,
  deleteProducts,
  addProduct,
  getSearchedProducts,
  updateProducts
};
