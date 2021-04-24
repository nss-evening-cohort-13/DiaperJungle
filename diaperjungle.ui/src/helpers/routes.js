import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Orders from '../views/orders';
import Products from '../views/products';
import Users from '../views/users';
import ProductTypes from '../views/productTypes';
import ProductDetails from '../views/productDetails';
import ProductForm from '../views/productForm';

export default function Routes() {
  return (
        <Switch>
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/users" component={Users} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/producttypes' component={ProductTypes}/>
            <Route exact path='/products/:id' component={ProductDetails}/>
            <Route exact path='/product-form' component={(props) => <ProductForm {...props} />}/>
        </Switch>
  );
}
