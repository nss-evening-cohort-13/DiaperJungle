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

// Gets orders that are not completed to load the cart
const getNotCompletedOrders = (fbUid) => new Promise((resolve, reject) => {
  axios.get(`${OrdersUrl}/${fbUid}/cart`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const addOrder = (data) => new Promise((resolve, reject) => {
  axios.post(`${OrdersUrl}`, data)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

// Deletes a single order base on id and remove it
const deleteOrders = (Id) => axios.delete(`${OrdersUrl}/${Id}`);

export default {
  getAllOrders, deleteOrders, getSingleOrder, addOrder, getNotCompletedOrders
};
