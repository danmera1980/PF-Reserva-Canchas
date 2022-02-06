import React, { useState, useEffect } from "react";
import useDarkMode from "../DarkModeToggle/darkModeToggle";
import Toggle from "../DarkModeToggle/Toggle";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/logo.svg";
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
  }, [darkMode]);

  const logOut = () => {
    localStorage.setItem("key", "");
    setLogged(false);
  };

  return (
    <div className="head bg-lightSecondary dark:bg-darkSecondary w-full">
      <header className="header w-[90%] xl:w-[100%]">
        <div className="logo max-w-[40%] md:max-w-2xl">
          <a href="/">
            <img src={logo} alt="logo here" className=""/>
          </a>
        </div>
        <div className="flex ">
        {logged ? (
          <div className="login">
            <div className="dropdown inline-block relative hover:shadow filter">
              <button className="btn_signed_in">
                <img
                  className="userLoggedImage"
                  src={userImage}
                  alt="user here"
                />
                {darkMode ? (
                  <FontAwesomeIcon icon={faAngleDown} color={"white"} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} color={"black"} />
                )}
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
        <span className="flex-none w-[50px]">
          <Toggle />
          </span>
        </div>
      </header>
    </div>
  );
}

export default Header;
