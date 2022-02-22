import { useEffect } from "react";
import { React, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../redux/actions/actionNames";
import BookingsCard from "./BookingsCard";
import ReactLoading from "react-loading";
import Favorites from "../Favorites/Favorites";
import "./Scrollbar.scss"

function Bookings() {
  const [visual, setVisual] = useState("bookings");
  const userToken = useSelector((state) => state.register.userToken);
  const [booking, SetBooking] = useState(null);
  const onButtonSelection = (option) => {
    setVisual(option);
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios
      .get(`${SERVER_URL}/users/bookings`, { headers: headers })
      .then((res) => {
        SetBooking(res.data);
      });
  }, [userToken]);

  return (
    <div>
      <div className="place-content-around lg:place-content-start flex lg:gap-10 border-b-[1px] border-black dark:border-white">
        <button
          className="inline-block"
          onClick={() => onButtonSelection("bookings")}
        >
          Reservas
        </button>
        <button
          className="inline-block"
          onClick={() => onButtonSelection("favorites")}
        >
          Favoritos
        </button>
      </div>
      <div className="mt-5">
        {(() => {
          switch (visual) {
            case "bookings":
              return booking === null ? (
                <ReactLoading
                  type={"spin"}
                  color={"#000000"}
                  height={"8.5rem"}
                  width={"8.5rem"}
                />
              ) : (
                <div className="h-[28rem] sm:h-[31rem] overflow-y-auto scrollbar">
                  {booking.map((e) => {
                    return (
                      <div key={e.id} className="overflow-hidden pb-4">
                        <BookingsCard
                          images={e.court.image.length ? e.court.image : "https://i.ibb.co/LSVSVLG/cancha.jpg"}
                          establishment={e.court.site.establishment.name}
                          name={e.court.name}
                          reference={e.external_reference}
                          place={e.court.site.street + " " + e.court.site.streetNumber}
                          date={e.startTime.replace("Z", "")}
                          price={e.finalAmount}
                          sport={e.court.sport}
                          courtId={e.courtId}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            case "favorites":
              return  <Favorites/> 
            default:
              return "bookings";
          }
        })()}
      </div>
    </div>
  );
}

export default Bookings;
