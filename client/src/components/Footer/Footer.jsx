import React from 'react';
import './Footer.scss';

const createdBy = "Diseñado y Creado por: Grupo 7"

function Footer() {
  return (
    <div className='footer'>
      <div className='footer__info'>
        <h2>{createdBy}</h2>

      </div>
    </div>
  );
};

export default Footer; 