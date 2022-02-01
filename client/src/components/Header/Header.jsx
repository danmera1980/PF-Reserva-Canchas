import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/logo.png';
import userImage from '../../assets/img/user.png';
import './Header.scss';


function Header() {
    const logged = true;


    return (
        <div className="head">
            <header className='header'>
                <div className='logo'>
                    <a href="/"><img src={logo} alt='logo here'/></a>
                </div>
                {logged ?
                    <div className='login'>
                        <div className='btn_signed_in'>
                            <img className='userLoggedImage' src={userImage} alt="user here"/>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                    </div>
                :
                    <div className='login'>
                        <div className='btn_sign_in'>
                            <Link to={"/"}>
                                <span>Sign in </span>
                                <FontAwesomeIcon icon={faSignInAlt} />
                            </Link>
                        </div>
                        <button id='signup' className='btn_signup'>Sign up</button>
                    </div>
                }
            </header>
        </div>
  );
};

export default Header;
