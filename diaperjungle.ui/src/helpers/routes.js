import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Orders from '../views/orders';
import Products from '../views/products';
import Users from '../views/users';
import ProductTypes from '../views/productTypes';

export default function Routes() {
  return (
        <Switch>
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/users" component={Users} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/producttypes' component={ProductTypes}/>
        </Switch>
  );
}
