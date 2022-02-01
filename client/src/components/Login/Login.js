/** @format */
import { Link } from 'react-router-dom';
import Google from '../../assets/img/google.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/users';
import { useHistory } from 'react-router';
import style from '../../styles/todo.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    email: '',
    password: '',
  };
  const [values, setValues] = useState(initialState);

  const google = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };
  const handleChange = e => {
    e.preventDefault();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (values.name && values.email) {
      dispatch(login(values));
      history.push('/');
      setValues(initialState);
    } else {
      alert('Debe Ingresar Email y Contraseña');
    }
  };
  return (
    <div className={style.login}>
      <h1 className={style.loginTitle}>Selecciona un metodo para Ingresar</h1>
      <div className={style.wrapper}>
        <div className={style.left}>
          <div className={style.loginButton} onClick={google}>
            <img src={Google} alt="" className={style.icon} />
            Google
          </div>
        </div>
        <div className={style.right}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={values.email}
                placeholder="Escribe tu Email"
                autoComplete="off"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Contraseña: </label>
              <input
                type="password"
                name="password"
                value={values.password}
                placeholder="Escribe tu contraseña"
                autoComplete="off"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <button className={style.submit} type="submit">
                Login
              </button>
            </div>
            <div>
              <p>
                ¿Aún no te has registrado?{' '}
                <Link to="/register">Regístrate aquí</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
