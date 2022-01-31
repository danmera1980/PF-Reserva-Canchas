import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/logo.png';
import './Header.scss';


function Header() {
  return (
    <>
        <header className='header'>
            <div className='logo'>
                <a href="/"><img src={logo} alt='logo here'/></a>
            </div>
            <div className='login'>
                <div className='btn_sign_in'>
                    <Link to={"/"}>
                        <FontAwesomeIcon icon={faSignInAlt} />
                        <span>Sign in</span>
                    </Link>
                </div>
                <button id='signup' className='btn_signup'>Sign up</button>
            </div>
        </header>
    </>
  );
};

export default Header;
