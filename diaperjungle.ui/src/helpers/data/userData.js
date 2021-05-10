import axios from 'axios';
import { baseUrl } from '../config.json';

const userUrl = `${baseUrl}/users`;

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${userUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getUserByFBUid = (fbUid) => new Promise((resolve, reject) => {
  axios.get(`${userUrl}/fb/${fbUid}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export default { getAllUsers, getUserByFBUid };
