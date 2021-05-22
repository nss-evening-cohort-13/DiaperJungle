import React from 'react';
import orderData from '../helpers/data/orderData';
import OrderCard from '../components/orderCard';
import userData from '../helpers/data/userData';
import UserCard from '../components/userCard';

export default class Admin extends React.Component {
  state = {
    orders: [],
    results: [],
    text: '',
    userSearched: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      userSearched: true,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  populateResults = () => {
    const searchTerm = this.state.text;

    userData.getSearchedUsers(searchTerm.toLowerCase()).then((response) => {
      this.setState({
        results: response,
        searchTerm,
      });
    });
  };

  componentDidUpdate(prevState) {
    if (prevState.searchTerm !== this.state.text) {
      this.populateResults();
    }
  }

  componentDidMount() {
    this.getAllTheOrders();
    this.populateResults();
  }

  getAllTheOrders = () => {
    orderData.getAllCompletedOrders().then((response) => {
      this.setState({
        orders: response,
      });
    });
  }

  render() {
    const { orders, results } = this.state;
    const renderAllOrderCards = () => orders.map((order) => <OrderCard key={order.id} order={order}/>);
    const renderUsersCards = () => results.map((user) => <UserCard key={user.id} user={user}/>);
    let orderTotal;
    if (orders.length !== 0) {
      let total = 0;
      orders.forEach((item) => {
        total += (item.total_cost);
      });
      orderTotal = total;
    }

    return (
      <>
        <h2>Admin</h2>
        <form onSubmit={this.handleSubmit}>
        <label className='p-1'>
          Search:
            <input type='text' name='text' value={this.state.text} onChange={this.handleChange} />
          </label>
        </form>
        <h2>Total Of All Orders: ${`${orderTotal}`}</h2>
        <div className='order-cards-container'>
          {renderAllOrderCards()}
        </div>
        <div>
          {this.state.userSearched ? (
            <div>
              <h1>Users Searched</h1>
              {renderUsersCards()}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </>
    );
  }
}
