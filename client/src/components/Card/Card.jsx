import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Slider from "../Slider/Slider";
import {useHistory} from "react-router-dom"

function Card({id, name, images,button, establishment, court, courtId, address, price, sport}) {
  const history = useHistory()
  function handleClick(){
    history.push(`/establishment/${courtId}`)
  }
  return (
    <div className="flex flex-wrap -m-3">
      <div className="w-full flex flex-col p-3 max-w-3xl">
        <div className=" dark:text-darkPrimary bg-white dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden flex flex-1 flex-col sm:grid sm:grid-cols-2">
          <Slider images={[images]} />

          <div className="flex flex-1 flex-col p-1 relative">

            <button className="absolute right-4 top-2 block scale-125 active:scale-90 transition-all sm:right-2">
              <FontAwesomeIcon icon={faStar} color={"yellow"} />
            </button>
            <h1 className="font-bold text-2xl dark:text-darkAccent">{establishment}</h1>

            <div className="m-2 text-sm flex-1">
              <h2 className="dark:text-darkAccent">{name} {court}</h2>
              <h3 className="mt-2 dark:text-darkAccent">{address}</h3>
            </div>
            <p>{sport}</p>
            {/* <p>10 de Marzo a las 20:00 hs</p> */}
            <p className="font-bold text-xl text-green-500">${price}</p>
            {button?<button onClick={handleClick} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded  absolute right-6 bottom-4">Reserva</button>: null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
