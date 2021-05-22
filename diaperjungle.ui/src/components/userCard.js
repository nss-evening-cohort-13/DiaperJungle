import React from 'react';

export default function UserCard({ user }) {
  return (
    <div className='product-card' style= {{ width: '500px' }}>
        <div className='card m-2'>
          <h5 className='card-title'>{user.first_name} {user.last_name}</h5>
          <div className='card-body'>
          <p className='card-text'>Date Created: {user.date_created}</p>
          </div>
        </div>
        </div>
  );
}
