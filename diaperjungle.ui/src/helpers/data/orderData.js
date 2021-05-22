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
  const objData = data;
  const newObj = {
    user_id: objData.userTable.id,
    is_complete: false,
  };
  axios.post(`${OrdersUrl}`, newObj)
    .then(resolve)
    .catch((error) => reject(error));
});

const getAllCompletedUserOrders = (fbUid) => new Promise((resolve, reject) => {
  axios.get(`${OrdersUrl}/history/${fbUid}`)
    .then((response) => {
      resolve(Object.values(response.data));
    }).catch((error) => reject(error));
});

const getAllCompletedOrders = () => new Promise((resolve, reject) => {
  axios.get(`${OrdersUrl}/history`)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

// Deletes a single order base on id and remove it
const deleteOrders = (Id) => axios.delete(`${OrdersUrl}/${Id}`);

const completeOrder = (data) => new Promise((resolve, reject) => {
  console.warn('Completed order data being passed', data);
  const newObj = {
    pay_type: data.id,
    total_cost: data.orderTotal,
    is_complete: true,
  };
  axios.patch(`${OrdersUrl}/${data.order.id}/update`, newObj)
    .then(resolve)
    .catch((error) => reject(error));
});

export default {
  getAllOrders,
  deleteOrders,
  getAllCompletedUserOrders,
  addOrder,
  getNotCompletedOrders,
  getSingleOrder,
  getAllCompletedOrders,
  completeOrder
};
