import { React, useState } from "react";
import "./Sites.scss";

function Sites({ establishmentDetail }) {
  const [ courts, setCourts ] = useState([])

  const handleSites = (sites) => {
    console.log(sites.courts)
    setCourts(() => sites.courts)
    console.log(courts)
  }

  return (
    <div className="w-[20rem] overflow-x-auto sm:w-full my-5">
      <table className="w-full border-collapse border border-slate-500">
        <thead className="bg-slate-600">
          <tr>
            <th className="border border-slate-600 px-10">Nombre</th>
            <th className="border border-slate-600 px-10">Ciudad</th>
            <th className="border border-slate-600 px-10">País</th>
            <th className="border border-slate-600 px-10">Calle</th>
            <th className="border border-slate-600">Número de calle</th>
            <th className="border border-slate-600 px-5">Canchas</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {establishmentDetail.map((e) => (
            <tr key={e.id} className='hover:bg-black' onClick={() => handleSites(e)}>
              <td className="border border-slate-700 py-2">{e.name}</td>
              <td className="border border-slate-700 py-2">{e.city}</td>
              <td className="border border-slate-700 py-2">{e.country}</td>
              <td className="border border-slate-700 py-2">{e.street}</td>
              <td className="border border-slate-700 py-2">{e.streetNumber}</td>
              {e.courts.length === 0 ? (
                <td className="border border-slate-700 py-2">
                  Sin canchas cargadas
                </td>
              ) : (
                <td className="border border-slate-700 py-2 underline cursor-pointer btn">
                  Ver canchas
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="py-2 listHolder">
        <table className="w-full border-collapse border border-slate-500">
          <thead className="bg-slate-600">
            <tr>
              <th className="border border-slate-600 px-10">Nombre</th>
              <th className="border border-slate-600 px-10">Precio</th>
              <th className="border border-slate-600">Duración del turno</th>
              <th className="border border-slate-600 px-10">Deporte</th>
            </tr>
          </thead>
          {courts.map((e) => (
            <tbody className="text-center" key={e.id}>
                <tr key={e.id}>
                  <td className="border border-slate-700">{e.name}</td>
                  <td className="border border-slate-700">${e.price}</td>
                  <td className="border border-slate-700">{e.shiftLength} Minutos</td>
                  <td className="border border-slate-700">{e.sport}</td>
                </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Sites;
