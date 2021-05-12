import axios from 'axios';
import { baseUrl } from '../config.json';

const cartUrl = `${baseUrl}/order_product`;

const addToOrderProduct = (data) => new Promise((resolve, reject) => {
  const objData = data;
  const newObj = {
    order_id: objData.order.id,
    product_id: objData.products.id,
    price: objData.products.price,
    quantity: 1
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

// const addProductToCart = () => new Promise((resolve, reject) => {
//     axios.post
// })

export default { addToOrderProduct, getUserCart };
