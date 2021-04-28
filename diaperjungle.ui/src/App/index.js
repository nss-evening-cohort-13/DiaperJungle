import './App.scss';
import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../helpers/routes';
import Navbar from '../components/navbar';
import fbConnection from '../helpers/data/fbConnection';

fbConnection();

class App extends React.Component {
  state = {
    user: null
  };

  // When the user logs in do this if not set user to false
  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  // when app unloads kill the listener
  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
