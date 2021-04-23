import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from '../views/products';
import ProductTypes from '../views/productTypes';

export default function Routes() {
  return (
        <Switch>
            <Route exact path='/products' component={Products} />
            <Route exact path='/producttypes' component={ProductTypes}/>
        </Switch>
  );
}
