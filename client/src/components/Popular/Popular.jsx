import React from 'react';
import './Popular.scss';

const popularTitle = 'Canchas populares cerca de tú ubicación'

export default function Popular() {
  return (
    <div className='popular dark:bg-darkPrimary dark:text-darkPrimary'>
        <h2>{popularTitle}</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis earum fugiat nostrum, soluta quis labore recusandae aut dicta maxime ratione sit, quia cupiditate similique. Iure esse alias impedit unde dolorum?</p>
    </div>

  );
}
