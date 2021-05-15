import axios from 'axios';
import { baseUrl } from '../config.json';

const cartUrl = `${baseUrl}/order_product`;

const addToOrderProduct = (data) => new Promise((resolve, reject) => {
  const objData = data;
  console.warn('data passed to add to cart', objData);
  const newObj = {
    order_id: objData.order.id,
    product_id: objData.products.id,
    price: objData.products.price,
    units: 1,
    product_desc: objData.products.title
  };
  axios.post(`${cartUrl}`, newObj)
    .then(resolve)
    .catch((error) => reject(error));
});

const getUserCart = (fbUid) => new Promise((resolve, reject) => {
  axios.get(`${cartUrl}/fb/${fbUid}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const removeFromCart = (Id) => axios.delete(`${cartUrl}/${Id}`);

export default { addToOrderProduct, getUserCart, removeFromCart };
