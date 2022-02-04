/** @format */
import Google from "../../assets/img/google.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/actions/users";
import { useHistory } from "react-router";
import { validate } from "../../helpers";
import "./Register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    email: "",
    password: "",
    name: "",
    lastName: "",
    phoneNumber: "",
    confirmPassword: "",
    hasEstablishment: false,
    isAdmin: false,
  };
  const [userInfo, setUserInfo] = useState(initialState);
  const [errors, setErrors] = useState({});

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  const handleChange = (e) => {
    e.preventDefault();
    setUserInfo((userInfo) => ({
      ...userInfo,
      [e.target.name]: e.target.value,
    }));

    setErrors(
      validate({
        ...userInfo,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(userInfo));
    alert("Registro exitoso");

    history.push("/login");
    setUserInfo(initialState);
  };

  return (
    <div className="">
      <h1 className="">Registrate</h1>
      <div className="">
        <div className="">
          <div className="" onClick={google}>
            <img src={Google} alt="" />
            Google
          </div>
        </div>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre: </label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
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
                value={userInfo.lastName}
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
                value={userInfo.email}
                placeholder="Escribe tu Email"
                autoComplete="off"
                onChange={handleChange}
              ></input>
            </div>
            {errors.email && <p>{errors.email}</p>}
            <div>
              <label>Contraseña: </label>
              <input
                type="password"
                name="password"
                value={userInfo.password}
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
                value={userInfo.confirmPassword}
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
