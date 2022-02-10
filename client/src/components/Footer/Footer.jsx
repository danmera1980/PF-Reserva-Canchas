import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.scss';

const createdBy = "Diseñado y Creado por: Grupo 7"

function Footer() {
  return (
    <div className='fixed bottom-0 w-full h-10 bg-lightSecondary dark:bg-darkSecondary'>
      <div className='grid grid-cols-2'>
        <h2 className='dark:text-white'>{createdBy}</h2>
        <div className='social-media'>
          <FontAwesomeIcon icon={faFacebookF} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faTwitter} />
        </div>
      </div>
    </div>
  );
};

export default Footer; 