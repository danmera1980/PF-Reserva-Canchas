import React from "react";
import Slider from "../Slider/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBaseballBall,
  faCalendar,
  faFutbol,
  faMapMarkerAlt,
  faTableTennis,
  faVolleyballBall,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

function BookingsCard({
  id,
  name,
  images,
  place,
  establishment,
  reference,
  date,
  price,
  sport,
}) {
  let fecha = new Date(date);
  let timeZone = fecha.toLocaleTimeString("es-ar", {
    hour: "2-digit",
    minute: "2-digit",
  });
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

          <div className="flex flex-1 flex-col py-1 relative text-center sm:py-0">
            <h1 className="font-bold text-2xl dark:text-darkAccent">
              {establishment}
            </h1>

            <div className="pt-1 text-sm flex-1">
              <h1 className="py-1 dark:text-darkAccent text-base">🥅 {name}</h1>

              <h1 className="py-1 dark:text-darkAccent text-base">
                Código de reserva: "
                <span className="dark:text-white">{reference}</span>"
              </h1>

              <h1 className="py-1 ">
                <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                <span className="dark:text-darkAccent text-base"> {place}</span>
              </h1>
              
              <h1 className="py-1">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="mr-2"
                />
                <span className="dark:text-darkAccent text-base">{format(fecha, "dd-MM-yyyy")} {timeZone}</span>
              </h1>
            </div>
            <p className="py-1">{sportsIcon}</p>
            <p className="font-bold text-xl">$ {price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingsCard;
