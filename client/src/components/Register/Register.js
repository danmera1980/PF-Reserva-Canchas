/** @format */
import Google from '../../assets/img/google.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/users';
import { useHistory } from 'react-router';
import { validate } from '../../helpers';
import style from '../../styles/todo.module.css';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    email: '',
    password: '',
    name: '',
    lastName: '',
    phoneNumber: '',
    confirmPassword: '',
    hasEstablishment: false,
    isAdmin: false,
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const google = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };
  const handleChange = e => {
    e.preventDefault();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value,
    }));

    setErrors(
      validate({
        ...values,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (
      !Object.getOwnPropertyNames(errors).length &&
      values.name &&
      values.lastName &&
      values.email &&
      values.password &&
      values.confirmPassword &&
      values.phoneNumber
    ) {
      dispatch(register(values));
      setErrors({});
      history.push('/');
      setValues(initialState);
    } else {
      alert('Se produjo un error, por favor intentelo nuevamente');
    }
  };

  return (
    <div className={style.login}>
      <h1 className={style.loginTitle}>Registrate</h1>
      <div className={style.wrapper}>
        <div className={style.left}>
          <div className={style.loginButton} onClick={google}>
            <img src={Google} alt="" />
            Google
          </div>
        </div>
        <div className={style.right}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre: </label>
              <input
                type="text"
                name="name"
                value={values.name}
                placeholder="Escribe tu nombre"
                autoComplete="off"
                onChange={handleChange}
              ></input>
            </div>
            {errors.name && <p>{errors.name}</p>}
            <div>
              <label>Apellido: </label>
              <input
                type="text"
                name="lastName"
                value={values.lastName}
                placeholder="Escribe tu Apellido"
                autoComplete="off"
                onChange={handleChange}
              ></input>
            </div>
            {errors.lastName && <p>{errors.lastName}</p>}
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
            {errors.email && <p>{errors.email}</p>}
            <div>
              <label>Telefono: </label>
              <input
                type="tel"
                name="phoneNumber"
                value={values.phoneNumber}
                placeholder="Escribe tu numero"
                autoComplete="off"
                onChange={handleChange}
              ></input>
            </div>
            {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
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
            {errors.password && <p>{errors.password}</p>}
            <div>
              <label>Confirma la Contraseña: </label>
              <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                placeholder="Confirma la contraseña"
                autoComplete="off"
                onChange={handleChange}
              ></input>
            </div>
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

            <div>
              <button type="submit">Registrarse</button>
            </div>
            <div>
              <p>
                ¿Ya estas registrado? <Link to="/login">Ingresa aquí</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
