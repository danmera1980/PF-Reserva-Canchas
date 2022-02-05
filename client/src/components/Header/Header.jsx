import React, { useState, useEffect } from "react";
import useDarkMode from "../DarkModeToggle/darkModeToggle";
import Toggle from "../DarkModeToggle/Toggle";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/logo.png";
import logo_white from "../../assets/img/logo_white.png";
import userImage from "../../assets/img/user.png";
import "./Header.scss";

function Header() {
  const [logged, setLogged] = useState(false);
  const [darkMode] = useDarkMode();
  const signinText = "Ingresar";
  const registerText = "Registrarse";
  const profileText = "Mi Perfil";
  const logoutText = "Salir";

  console.log(localStorage.getItem("key"));

  useEffect(() => {
    localStorage.getItem("key") !== "" ? setLogged(true) : setLogged(false);
  }, []);

  const logOut = () => {
    localStorage.setItem("key", "");
    setLogged(false);
  };

  return (
    <div className="head dark:bg-black">
      <header className="header">
        <div className="logo">
          <a href="/">
            <img src={darkMode ? logo : logo} alt="logo here" />
          </a>
        </div>
        <div>
          <Toggle />
        </div>
        {logged ? (
          <div className="login">
            <div className="dropdown inline-block relative hover:shadow filter hover:">
              <button className="btn_signed_in">
                <img
                  className="userLoggedImage"
                  src={userImage}
                  alt="user here"
                />
                <FontAwesomeIcon
                  icon={faAngleDown}
                  color={darkMode ? "white" : "black"}
                />
              </button>
              <ul className="dropdown-menu absolute hidden">
                <li>
                  <Link to={"/profile"}>{profileText}</Link>
                </li>
                <li>
                  <a href="#" onClick={() => logOut()}>
                    {logoutText}
                  </a>
                </li>
              </ul>
              {/* <button onClick={()=>logOut()}>Logout</button> */}
            </div>
          </div>
        ) : (
          <div className="login">
            <div className="btn_sign_in">
              <Link to={"/login"}>
                <span>{signinText}</span>
                <FontAwesomeIcon icon={faSignInAlt} />
              </Link>
            </div>
            <Link to={"/register"}>
              <button id="signup" className="btn_signup">
                {registerText}
              </button>
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
