/** @format */
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, loginWithGoogle } from "../../redux/actions/users";
import { useHistory } from "react-router";
import Swal from 'sweetalert2'
import "./Login.scss";

function validate(values) {
  let errors = {};
  const emailRegEx = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!values.email) {
    errors.email = "Ingresar Email";
  } else if (!emailRegEx.test(values.email)) {
    errors.email = "Verificar Email";
  } else if (!values.password) {
    errors.password = "Complete la contraseña";
  }
  return errors;
}

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const initialState = {
    email: "",
    password: "",
  };
  const [userInfo, setUserInfo] = useState(initialState);

  const responseSuccess = (response) => {
    console.log(response);
    dispatch(loginWithGoogle(response));
    Swal.fire({
      title: `Sesion iniciada`,
    });
    history.push("/");
  };
  const responseFailure = (response) => {
    Swal.fire({
      title: `Hubo un error`,
    });
    console.log(response);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...userInfo,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.email && userInfo.password) {
      dispatch(loginUser(userInfo));
      history.push("/");
      window.location.reload(true);
      setUserInfo(initialState);
    } else {
      Swal.fire({
        title: `Completar todos los datos`,
      });
    }
  };
  return (
    <div className="temp">
      <h1 className="temp">Selecciona un metodo para Ingresar</h1>
      <div className="temp">
        <div className="temp">
          <GoogleLogin
            clientId="325119971427-qq0udfk49hkpt0qrbbhfia9bbo6vjs8u.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseSuccess}
            onFailure={responseFailure}
            cookiePolicy={"single_host_origin"}
          />
          ,
        </div>
        <div className="temp">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                placeholder="Escribe tu Email"
                onChange={handleChange}
              ></input>
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
              <label>Contraseña: </label>
              <input
                type="password"
                name="password"
                value={userInfo.password}
                placeholder="Escribe tu contraseña"
                onChange={handleChange}
              ></input>
              {errors.password && <p>{errors.email}</p>}
            </div>

            <div>
              <button className="temp" type="submit">
                Entrar
              </button>
            </div>
            <div>
              <p>
                ¿Aún no te has registrado?{" "}
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
