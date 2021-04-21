import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from '../views/products';

export default function Routes() {
  return (
        <Switch>
            <Route exact path="/products" component={Products} />
        </Switch>
  );
}
