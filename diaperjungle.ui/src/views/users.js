import React from 'react';
import { Link } from 'react-router-dom';
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
    const { userTable, user } = this.props;

    return (
      <>
      <div>
        <img className='user-img' src={user.photoURL}/>
        <h1>{userTable.first_name} {userTable.last_name}</h1>
        <Link className='btn btn-primary m-2' to={`/orders/${user.uid}`}>View Orders</Link>{' '}
        <Link className='btn btn-primary m-2' to={'/payment_type'}>Manage Payments</Link>{' '}
      </div>
      </>
    );
  }
}
