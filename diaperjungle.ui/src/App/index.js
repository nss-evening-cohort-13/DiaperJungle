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
    dbUser: {},
    userTable: {},
  };

  // When the user logs in do this if not set user to false
  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // grabs the auth token use sessionStorage.getItem("token") to grab it
        user.getIdToken().then((token) => sessionStorage.setItem('token', token));
        this.setState({ user });
        userData.getUserByFBUid(user.uid).then((currentUser) => {
          this.setState({ dbUser: currentUser });
        });
        setTimeout(() => {
          this.setUserInState(user.uid);
        }, 1000);
      } else {
        this.setState({ user: false });
      }
    });
  }

  // when app unloads kill the listener
  componentWillUnmount() {
    this.removeListener();
  }

  setUserInState = (fbUid) => {
    userData.getUserByFBUid(fbUid).then((response) => {
      this.setState({
        userTable: response,
      });
    }).then(() => {
      this.checkIfUserHasAnIncompleteOrder(fbUid);
    });
  }

  checkIfUserHasAnIncompleteOrder = (fbUid) => {
    orderData.getNotCompletedOrders(fbUid).then((response) => {
      this.setState({
        order: response,
      });
    }).then(() => {
      setTimeout(() => {
        this.createOrder(this.state);
      }, 1000);
    });
  }

  createOrder = () => {
    if (Object.keys(this.state.order).length === 0) {
      orderData.addOrder(this.state).then((response) => {
        this.setState({
          order: response.data,
        });
      });
    }
  }

  render() {
    const {
      user,
      userTable,
      order,
      dbUser
    } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar user={user} dbUser={dbUser} />
          <Routes user={user} dbUser={dbUser} userTable={userTable} order={order}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
