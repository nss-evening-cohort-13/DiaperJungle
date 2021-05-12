import axios from 'axios';
import { baseUrl } from '../config.json';

const paymentTypeUrl = `${baseUrl}/payment_type`;

const getAllPaymentTypes = () => new Promise((resolve, reject) => {
  axios.get(`${paymentTypeUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

export default { getAllPaymentTypes };
