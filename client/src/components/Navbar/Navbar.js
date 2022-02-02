/** @format */

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from '../../styles/todo.module.css';

const Navbar = ({ user }) => {
  const userSigned = useSelector(state => state.signUpData);
  const logout = () => {
    window.open('http://localhost:5000/auth/logout', '_self');
  };
  return (
    <div className={style.navbar}>
      {user ? (
        <ul className={style.list}>
          <li className={style.listItem}>
            <img src={user.photos[0].value} alt="" className={style.avatar} />
          </li>
          <li className={style.listItem}>{user.displayName}</li>
          <li className={style.listItem} onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className={style.link} to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
