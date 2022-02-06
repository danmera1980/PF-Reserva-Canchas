import React from 'react';
import './Popular.scss';

const popularTitle = 'Canchas populares cerca de tú ubicación'

export default function Popular() {
  return (
    <div className='popular dark:bg-darkPrimary text-center sm:text-left'>
        <h2 className='text-2xl font-semibold text-lightSecondary dark:text-darkAccent'>{popularTitle}</h2>
        <p className='text-black dark:text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis earum fugiat nostrum, soluta quis labore recusandae aut dicta maxime ratione sit, quia cupiditate similique. Iure esse alias impedit unde dolorum?</p>
    </div>

  );
}
