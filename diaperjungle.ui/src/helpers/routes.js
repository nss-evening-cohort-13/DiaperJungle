import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Orders from '../views/orders';
import Products from '../views/products';

export default function Routes() {
  return (
        <Switch>
            <Route exact path="/products" component={Products} />
            <Route exact path="/orders" component={Orders} />
        </Switch>
  );
}
