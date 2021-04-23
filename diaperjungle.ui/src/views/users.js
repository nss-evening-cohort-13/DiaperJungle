import React from 'react';
import userData from '../helpers/data/userData';

export default class Users extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.getAllOfTheUsers();
  }

  getAllOfTheUsers = () => {
    userData.getAllUsers().then((response) => {
      this.setState({
        users: response,
      });
    });
  };

  render() {
    const { users } = this.state;

    const userInfo = (user) => (
      <div>
        <h2>{user.first_name} {user.last_name}</h2>
        <h3>Username: {user.username}</h3>
        <h3>Password: {user.password}</h3>
        <h3>Payment Id: {user.payment_id}</h3>
        <h3>Date Created: {user.date_created}</h3>
        <div>---------------------------------</div>
      </div>
    );

    const printToDom = users.map(userInfo);

    return (
      <>
        <h1>User Info</h1>
        {printToDom}
      </>
    );
  }
}
