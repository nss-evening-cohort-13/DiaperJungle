import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../views/home';
import Orders from '../views/orders';
import Products from '../views/products';
import Users from '../views/users';
import ProductTypes from '../views/productTypes';
import ProductDetails from '../views/productDetails';
import ProductForm from '../views/productAddForm';
import SearchResults from '../views/searchResults';
import ordersSingleDetail from '../views/ordersSingleDetails';
import Cart from '../views/cart';
import Admin from '../views/admin';
import PaymentTypeForm from '../views/paymentTypeForm';

export default function Routes({ user, userTable, order }) {
  return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/payment_type" component={(props) => <PaymentTypeForm userTable={userTable} {...props}/>}/>
            <Route exact path="/orders/:id" component={(props) => <Orders user={user} {...props} />}/>
            <Route exact path='/order-details/:id' component={ordersSingleDetail}/>
            <Route exact path="/users" component={(props) => <Users user={user} userTable={userTable} order={order} {...props}/>} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/producttypes' component={ProductTypes}/>
            <Route exact path='/products/:id' component={(props) => <ProductDetails user={user} order={order} {...props} />}/>
            <Route exact path='/product-form' component={(props) => <ProductForm {...props} />}/>
            <Route exact path='/search/:term' component={(props) => <SearchResults {...props}/>} />
            <Route exact path='/orders/:id' component={ordersSingleDetail}/>
            <Route exact path='/cart' component={(props) => <Cart user={user} order={order} userTable={userTable} {...props}/>}/>
            <PrivateRoute exact path='/admin' component={Admin} user={user}/>
        </Switch>
  );
}

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user} />)
    : (<Redirect to={ { pathname: '/no-user', state: { from: taco.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
