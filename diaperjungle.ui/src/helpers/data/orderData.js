import axios from 'axios';
import { baseUrl } from '../config.json';

const OrdersUrl = `${baseUrl}/orders`;

// Gets all the orders
const getAllOrders = () => new Promise((resolve, reject) => {
  axios.get(`${OrdersUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

// Gets a single order based on id
const getSingleOrder = (Id) => new Promise((resolve, reject) => {
  axios.get(`${OrdersUrl}/${Id}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

// Deletes a single order base on id and remove it
const deleteOrders = (Id) => axios.delete(`${OrdersUrl}/${Id}`);

export default { getAllOrders, deleteOrders, getSingleOrder };
