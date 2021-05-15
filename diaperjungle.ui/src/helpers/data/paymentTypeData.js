import axios from 'axios';
import { baseUrl } from '../config.json';

const paymentTypeUrl = `${baseUrl}/PaymentTypes`;

const getAllPaymentTypes = () => new Promise((resolve, reject) => {
  axios.get(`${paymentTypeUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const addPaymentType = (data) => new Promise((resolve, reject) => {
  axios.post(`${paymentTypeUrl}`, data)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

const deletePaymentType = (Id) => axios.delete(`${paymentTypeUrl}/${Id}`);

export default { getAllPaymentTypes, deletePaymentType, addPaymentType };
