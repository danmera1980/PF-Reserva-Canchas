import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.scss';

const createdBy = "Diseñado y Creado por: Grupo 7"

function Footer() {
  return (
    <div className='footer'>
      <div className='footer__info'>
        <h2>{createdBy}</h2>
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