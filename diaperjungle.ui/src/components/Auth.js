import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

export default class Auth extends Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    return (
      // <Button outline color="info" className="btn" onClick={this.loginClickEvent}>
      //  Sign In
      // </Button>
      <Link to='null' className="nav-link m-2" href="#" onClick={this.loginClickEvent}>Login</Link>
    );
  }
}
