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
      setUserInfo(initialState);
    } else {
      Swal.fire({
        title: `Completar todos los datos`,
      });
    }
  };
  return (
    <div className="temp">
      <h1 className="flex justify-center text-xl text-indigo-800">Selecciona un metodo para Ingresar</h1>
      <div className="temp">
        <div className="mt-5 flex justify-center cursor-pointer rounded-xl">
          <GoogleLogin
            clientId="325119971427-qq0udfk49hkpt0qrbbhfia9bbo6vjs8u.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseSuccess}
            onFailure={responseFailure}
            cookiePolicy={"single_host_origin"}
          />
          
        </div>
        <div className="flex justify-center">
          <form className="md:w-3/5 lg:w-2/5 flex-col justify-center items-center mx-5 border-grey-400 border-2 mt-10 bg-white drop-shadow-md backdrop-blur-3xl rounded-md px-3 py-3" onSubmit={handleSubmit}>
            <div className="relative ">
              <input id="mail" className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                type="email"
                name="email"
                value={userInfo.email}
                placeholder="Escribe tu Email"
                onChange={handleChange}
                ></input>
                <label className="absolute left-0 -top-3.5 
                                            text-gray-600 text-sm 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400
                                            peer-placeholder-shown:top-2 transition-all 
                                            peer-focus:-top-3.5 peer-focus:text-gray-600
                                            peer-focus:text-sm
                                            cursor-text" htmlFor="mail">Email 
                  </label>
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="relative mt-3">
              <input id="pw" className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                type="password"
                name="password"
                value={userInfo.password}
                placeholder="Escribe tu contraseña"
                onChange={handleChange}
                ></input>
                <label className="absolute left-0 -top-3.5 
                                            text-gray-600 text-sm 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400
                                            peer-placeholder-shown:top-2 transition-all 
                                            peer-focus:-top-3.5 peer-focus:text-gray-600
                                            peer-focus:text-sm
                                            cursor-text" htmlFor="pw">Contraseña 

                </label>
              {errors.password && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <button className="mt-5 w-full bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Entrar
              </button>
            </div>
            <div>
              <p className="mt-3 text-xl text-indigo-800">
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
