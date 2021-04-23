import React from 'react';

export default function ProductCard({ allProducts }) {
  return (
    <div className='card m-2'>
      <h5 className='card-title'>{allProducts.title}</h5>
      <div className='card-body'>
        <p className='card-text'>{allProducts.description}</p>
      </div>
    </div>
  );
}
