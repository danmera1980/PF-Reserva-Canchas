import React from "react";
import Slider from "../Slider/Slider";

function Card() {
  return (
    <div className="flex flex-wrap -m-3">
      <div className="w-full flex flex-col p-3 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-1 flex-col sm:grid sm:grid-cols-2">
          <Slider />

          <div className="flex flex-1 flex-col p-1 font-['Roboto'] relative">

            <button className="absolute right-4 top-2 block scale-125 active:scale-90 transition-all sm:right-2">
              ⭐
            </button>
            <h1 className="font-bold text-2xl">Las canchas de pepe</h1>

            <div className="m-2 text-sm flex-1">
              <h2>Ameghino 520, San Rafael, Mendoza</h2>
              <h3 className="mt-2">Hola</h3>
            </div>
            <p>Fútbol 11</p>
            <p>10 de Marzo a las 20:00 hs</p>
            <p className="font-bold text-xl text-green-500">$250</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
