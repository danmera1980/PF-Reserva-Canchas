import React from "react";
import {Link} from "react-router-dom"

function CardCourt({id, name, images, siteName, street, streetNumber,city,description , timeActiveFrom, timeActiveTo, price, sport}) {


  return (
    <div className="flex flex-column place-content-center -m-3">
      <div className="w-full flex flex-col p-3 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-1 flex-col sm:grid sm:grid-cols-2">
          <img src={images} alt={name}/>

          <div className="flex flex-1 flex-col p-1 font-['Roboto'] relative">

            <button className="absolute right-4 top-2 block scale-125 active:scale-90 transition-all sm:right-2">
              ⭐
            </button>
            <Link >
              <h1 className="font-bold text-2xl">{siteName}</h1>
            </Link>
            <Link >
              <h2 className="font-bold text-xl">{name}</h2>
            </Link>

            <div className="m-2 text-sm flex-1">
              <h2>{street} {streetNumber} , {city}</h2>
              <h3 className="mt-2">{description}</h3>
            </div>
            <p>{sport}</p>
            <p>Horario de {timeActiveFrom} a {timeActiveTo}</p>
            <p className="font-bold text-xl text-green-500">${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCourt;
