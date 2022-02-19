import { useEffect } from "react";
import { React, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../redux/actions/actionNames";
import Card from "../Card/Card";
import ReactLoading from "react-loading";

function Bookings() {
  const [visual, setVisual] = useState("bookings");
  const userToken = useSelector((state) => state.register.userToken);
  const [booking, SetBooking] = useState(null);
  const [favorites, setFavorites] = useState(null)
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
    
      axios
      .get(`${SERVER_URL}/users/fav`, { headers: headers })
      .then((res) => {
        setFavorites(res.data.courts);
      });
  }, [userToken]);

console.log(favorites)

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
                booking.map((e) => {
                  return (
                    <div key={e.id} className="overflow-hidden pb-4">
                      <Card
                        name={e.court.name}
                        establishment={e.court.site.establishment.name}
                        images={e.court.image[0]}
                        site={e.court.site.name}
                        address={e.court.site.street}
                        price={e.finalAmount}
                        sport={e.court.sport}
                        courtId={e.courtId}
                      />
                    </div>
                  );
                })
              );
            case "favorites":
              return favorites === null ? (
                <ReactLoading
                  type={"spin"}
                  color={"#000000"}
                  height={"8.5rem"}
                  width={"8.5rem"}
                />
              ) : (
                favorites.map((e) => {
                  return (
                    <div key={e.id} className="overflow-hidden pb-4">
                      <Card
                        name={e.name}
                        establishment={e.site.establishment.name}
                        images={e.image[0]}
                        site={e.site.name}
                        address={e.site.street}
                        price={e.price}
                        sport={e.sport}
                        courtId={e.id}
                      />
                    </div>
                  );
                })
              )
            default:
              return "bookings";
          }
        })()}
      </div>
    </div>
  );
}

export default Bookings;
