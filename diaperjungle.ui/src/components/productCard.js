import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className='product-card' style= {{ width: '500px' }}>
        <div className='card m-2'>
          <img src={product.image_url} alt=''></img>
          <h5 className='card-title'>{product.title}</h5>
          <div className='card-body'>
          <p className='card-text'>{product.description}</p>
          <p>${product.price}</p>
          <p>In Stock: {product.quantity}</p>
          </div>
          <Link className='btn btn-primary m-2' to={`/products/${product.id}`}>Product Details</Link>{' '}
        </div>
        </div>
  );
}
