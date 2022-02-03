import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/logo.png';
import userImage from '../../assets/img/user.png';
import SweetAlert2 from 'react-sweetalert2';
import Login from '../Login/Login';
import './Header.scss';
import Register from '../Register/Register';


function Header() {
    const logged = false;
    const signin = "Ingresar";
    const register = "Registrarse";
    
    const [ swalProps, setSwalProps ] = useState();

    const clickLogin = () => {
        setSwalProps({
            show: true,
            title: signin
        });
    }

    const clickRegister = () => {
        setSwalProps({
            show: true,
            title: register
        });
    }

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
                        <div className='btn_sign_in'  onClick={() => clickLogin()}>
                            {/* <Link to={"/login"}> */}
                                <span>{signin}</span>
                                <FontAwesomeIcon icon={faSignInAlt} />
                            {/* </Link> */}
                            {/* <SweetAlert2 {...setSwalProps}>
                                <Login />
                            </SweetAlert2> */}
                        </div>
                        {/* <Link to={"/register"}> */}
                            <button id='signup' className='btn_signup' onClick={clickRegister}>{register}</button>
                        {/* </Link> */}
                        <SweetAlert2 {...setSwalProps}>
                                {/* <Register /> */}
                                <h2>Hello world</h2>
                        </SweetAlert2>
                    </div>
                }
            </header>
        </div>
  );
};

export default Header;
