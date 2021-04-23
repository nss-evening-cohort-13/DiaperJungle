import axios from 'axios';
import { baseUrl } from '../config.json';

const OrdersUrl = `${baseUrl}/orders`;

const getAllOrders = () => new Promise((resolve, reject) => {
  axios.get(`${OrdersUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

export default { getAllOrders };
