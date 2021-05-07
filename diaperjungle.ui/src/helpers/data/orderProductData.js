import axios from 'axios';
import { baseUrl } from '../config.json';

const orderProductUrl = `${baseUrl}/order_product`;

const getProductsOfAnOrder = (orderId) => new Promise((resolve, reject) => {
  axios.get(`${orderProductUrl}/order/${orderId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export default { getProductsOfAnOrder };
