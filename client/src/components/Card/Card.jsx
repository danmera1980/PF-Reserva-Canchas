import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../../redux/actions/actionNames";
import { addfav, delfav, getfavs } from "../../redux/actions/users";
import Swal from "sweetalert2";
import {
  faBaseballBall,
  faFutbol,
  faMapMarkerAlt,
  faTableTennis,
  faVolleyballBall,
} from "@fortawesome/free-solid-svg-icons";

function Card({
  id,
  name,
  images,
  button,
  establishment,
  court,
  courtId,
  address,
  price,
  sport,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userToken = useSelector((state) => state.register.userToken);
  const isActive = useSelector((state) => state.register.isActive);

  const [fav, setFav] = useState(false);
  function handleClick() {
    history.push(`/establishment/${courtId}`);
  }
  useEffect(() => {
    if (userToken) {
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios
        .get(`${SERVER_URL}/users/onefav?courtid=${courtId}`, {
          headers: headers,
        })
        .then((res) => {
          res.data.courtId ? setFav(true) : setFav(false);
        });
    }
  }, [courtId]);

  function handleAddFav(e) {
    e.preventDefault();
    if (isActive) {
      dispatch(addfav(userToken, courtId));
      setFav(true);
    } else if (!isActive && userToken) {
      Swal.fire({
        title: `Has sido deshabilitado por el admin`,
      });
    } else {
      Swal.fire({
        title: `Debes iniciar sesión`,
      });
      history.push(`/login`);
    }
  }

  function handleRemoveFav(e) {
    e.preventDefault();
    dispatch(delfav(userToken, courtId));
    dispatch(getfavs(userToken));
    setFav(false);
  }

  let sportsIcon = null;
  switch (sport) {
    case "Futbol 5":
    case "Futbol 7":
    case "Futbol 11":
      sportsIcon = <FontAwesomeIcon icon={faFutbol} size="2x" />;
      break;
    case "Basquet":
      sportsIcon = <FontAwesomeIcon icon={faBaseballBall} size="2x" />;
      break;
    case "Tenis":
      sportsIcon = <FontAwesomeIcon icon={faTableTennis} size="2x" />;
      break;
    case "Handbol":
      sportsIcon = <FontAwesomeIcon icon={faVolleyballBall} size="2x" />;
      break;
    case "Squash":
      sportsIcon = <FontAwesomeIcon icon={faBaseballBall} size="2x" />;
      break;
    case "Padel":
      sportsIcon = <FontAwesomeIcon icon={faBaseballBall} size="2x" />;
      break;
    default:
      sportsIcon = <FontAwesomeIcon icon={faFutbol} size="2x" />;
  }

  return (
    <div className="flex flex-wrap -m-3">
      <div className="w-full flex flex-col p-3 max-w-3xl">
        <div className="dark:text-darkPrimary bg-white dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden flex flex-1 flex-col sm:grid sm:grid-cols-2">
          <Slider images={[images]} />
          
          <div className="flex flex-1 flex-col text-center p-1 relative">
            <h1 className="font-bold text-2xl dark:text-darkAccent">
              {establishment}
            </h1>

            <div className="py-2 text-base flex-1">
              <h2 className="dark:text-darkAccent shrink-1">
                🥅 {name} {court}
              </h2>

              <h1 className="py-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                <span className="dark:text-darkAccent text-base md:text-sm">
                  {address}
                </span>
              </h1>

              <p className="pt-1">{sportsIcon}</p>

              <p className="font-bold text-xl md:text-base">$ {price}</p>
            </div>

            {button ? (
              <div className="pb-1">
                <button
                  onClick={handleClick}
                  className="bg-blue-500 hover:bg-blue-700 font-semibold py-2 border border-blue-500 rounded active:scale-95 transition-all w-full sm:w-32"
                >
                  Reserva
                </button>
              </div>
            ) : null}
            <button
            onClick={fav === true ? handleRemoveFav : handleAddFav}
            className="absolute top-32 md:bottom-4 right-3 block scale-150 transition-all active:scale-125"
          >
            <FontAwesomeIcon
              icon={faStar}
              color={fav === true ? "yellow" : "gray"}
              className=""
            />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
