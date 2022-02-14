import React from "react";

function Sites({ establishmentDetail }) {
  return (
    <div>
      {establishmentDetail.map((e) => {
        return (
          <div key={e.id} className="grid">
            <table className="table-auto border-collapse border border-slate-500">
              <thead className="bg-slate-600">
                <tr>
                  <th className="border border-slate-600 px-10">Nombre</th>
                  <th className="border border-slate-600 px-10">Ciudad</th>
                  <th className="border border-slate-600 px-10">País</th>
                  <th className="border border-slate-600 px-10">Calle</th>
                  <th className="border border-slate-600 px-5">
                    Número de calle
                  </th>
                  <th className="border border-slate-600 px-5">Canchas</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td className="border border-slate-700">{e.name}</td>
                  <td className="border border-slate-700">{e.city}</td>
                  <td className="border border-slate-700">{e.country}</td>
                  <td className="border border-slate-700">{e.street}</td>
                  <td className="border border-slate-700">{e.streetNumber}</td>
                  {e.courts.length === 0 ? (
                    <td className="text-xs">Sin canchas cargadas</td>
                  ) : (
                    <td className="border border-slate-700 underline cursor-pointer">
                      Ver canchas
                    </td>
                  )}
                </tr>
              </tbody>
            </table>

            {e.courts.map((e) => {
              return (
                <div className="py-2 hidden" key={e.id}>
                  <table className="table-fixed border-collapse border border-slate-500">
                    <thead className="bg-slate-600">
                      <tr>
                        <th className="border border-slate-600 px-10">
                          Nombre
                        </th>
                        <th className="border border-slate-600 px-10">
                          Precio
                        </th>
                        <th className="border border-slate-600">
                          Duración del turno
                        </th>
                        <th className="border border-slate-600 px-10">
                          Deporte
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      <tr>
                        <td className="className=border border-slate-700">
                          {e.name}
                        </td>
                        <td className="className=border border-slate-700">
                          {e.price}
                        </td>
                        <td className="className=border border-slate-700">
                          {e.shiftLength}
                        </td>
                        <td className="className=border border-slate-700">
                          {e.sport}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Sites;
