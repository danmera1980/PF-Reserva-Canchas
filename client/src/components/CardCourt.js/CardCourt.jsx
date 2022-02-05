import React from "react";
import {Link} from "react-router-dom"

function CardCourt({info}) {


  return (
    <div className="flex flex-wrap -m-3">
      <div className="w-full flex flex-col p-3 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-1 flex-col sm:grid sm:grid-cols-2">
          <img src={info.image} alt={info.establishment.name}/>

          <div className="flex flex-1 flex-col p-1 font-['Roboto'] relative">

            <button className="absolute right-4 top-2 block scale-125 active:scale-90 transition-all sm:right-2">
              ⭐
            </button>
            <Link to= {`/establishment/${info.establishment.id}`}>
              <h1 className="font-bold text-2xl">{info.establishment.name}</h1>
            </Link>
            <Link to={`/site/${info.siteId}`}>
              <h2 className="font-bold text-xl">{info.site.name}</h2>
            </Link>

            <div className="m-2 text-sm flex-1">
              <h2>{info.site.street} {info.site.streetNumber} , {info.site.city}</h2>
              <h3 className="mt-2">{info.description}</h3>
            </div>
            <p>{info.sport}</p>
            <p>Horario de {info.establishment.timeActiveFrom} a {info.establishment.timeActiveTo}</p>
            <p className="font-bold text-xl text-green-500">${info.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCourt;
