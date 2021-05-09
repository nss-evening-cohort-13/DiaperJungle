import './App.scss';
import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../helpers/routes';
import Navbar from '../components/navbar';
import fbConnection from '../helpers/data/fbConnection';
import orderData from '../helpers/data/orderData';
import userData from '../helpers/data/userData';

fbConnection();

class App extends React.Component {
  state = {
    user: null,
    order: {},
  };

  // When the user logs in do this if not set user to false
  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // grabs the auth token use sessionStorage.getItem("token") to grab it
        user.getIdToken().then((token) => sessionStorage.setItem('token', token));
        this.setState({ user });
        this.checkIfUserHasAnIncompleteOrder(user.uid);
        this.setUserInState(user.uid);
        // this.createOrder(this.state);
      } else {
        this.setState({ user: false });
      }
    });
    // this.createOrder(this.state);
  }

  // when app unloads kill the listener
  componentWillUnmount() {
    this.removeListener();
  }

  setUserInState = (fbUid) => {
    console.warn('setUserInState function');
    userData.getUserByFBUid(fbUid).then((response) => {
      this.setState({
        userTable: response,
      });
    });
  }

  checkIfUserHasAnIncompleteOrder = (fbUid) => {
    console.warn('checkIfUserHasAnIncompleteOrder function');
    orderData.getNotCompletedOrders(fbUid).then((response) => {
      this.setState({
        order: response,
      });
    }).then(() => {
      this.createOrder(this.state);
    });
  }

  createOrder = () => {
    if (Object.keys(this.state.order).length === 0) {
      orderData.addOrder(this.state).then((response) => {
        this.setState({
          order: response,
        });
      });
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
<<<<<<< HEAD
          <Navbar user={this.state.user}/>
          <Routes user={this.state.user}/>
=======
          <Navbar user={user}/>
          <Routes user={user}/>
>>>>>>> main
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
