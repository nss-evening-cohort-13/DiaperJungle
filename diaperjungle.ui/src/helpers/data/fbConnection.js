import firebase from 'firebase';
// import axios from 'axios';
import config from '../apiKeys.json';

// interceptors work by changing the outbound request before the xhr is sent
// or by changing the response before it's returned to our .then() method.
// axios.interceptors.request.use(function (request) {
// const token = sessionStorage.getItem('token');

// if (token != null) {
// request.headers.Authorization = `Bearer ${token}`;
// }

// return request;
// }, function (err) {
// return Promise.reject(err);
// });

const firebaseApp = () => {
  firebase.initializeApp(config.firebaseConfig);
};

export default firebaseApp;
