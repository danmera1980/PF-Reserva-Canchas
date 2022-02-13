import { React, useState } from "react";
import Card from "../Card/Card";

function Bookings() {
  const [visual, setVisual] = useState("bookings");
  const onButtonSelection = (option) => {
    setVisual(option);
  };
  return (
    <div>
      <div className="place-content-around lg:place-content-start flex lg:gap-10 border-b-[1px] border-black dark:border-white">
        <button className="inline-block" onClick={() => onButtonSelection("bookings")}>Reservas</button>
        <button className="inline-block" onClick={() => onButtonSelection("favorites")}>Favoritos</button>
      </div>
      <div className="mt-5">
      {(() => {
              switch (visual) {
                case "bookings":
                  return <Card/>
                case "favorites":
                return <Card/>
                default:
                  return <Card/>
              }
            })()}
      </div>
    </div>
  );
}

export default Bookings;
