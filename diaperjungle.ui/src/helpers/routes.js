import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Products from '../views/products';
import Users from '../views/users';

export default function Routes() {
  return (
        <Switch>
            <Route exact path="/products" component={Products} />
            <Route exact path="/users" component={Users} />
        </Switch>
  );
}
