import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../redux/actions/actionNames";
import { useEffect } from "react";
import { faWindows } from "@fortawesome/free-brands-svg-icons";

function EstablihsmentTable({ establishment }) {
  const userToken = useSelector((state) => state.register.userToken);

  function HandleHabilitarEst(establishmentId) {
    // useEffect(() => {
    console.log(establishmentId);
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios.put(
      `${SERVER_URL}/establishment/updateStatus`,
      { establishmentId },
      {
        headers: headers,
      }
    );
    window.location.reload();
    // }, [establishmentId]);
  }

  return (
    <div>
      <table className="ml-36 mt-10 table-auto border-collapse border border-slate-500 text-white">
        <thead className="bg-slate-600">
          <tr>
            <th className="border border-slate-600 px-10">Cuit</th>
            <th className="border border-slate-600 px-10">Nombre</th>
            <th className="border border-slate-600 px-10">
              Horario de Apertura
            </th>
            <th className="border border-slate-600 px-10">Horario de Cierre</th>
            <th className="border border-slate-600 px-10">
              Habilitar/Deshabilitar
            </th>
          </tr>
        </thead>
        <tbody className="text-center text-white">
          {establishment?.map((est) => (
            <tr key={est.id}>
              <td className="border border-slate-700">{est.cuit}</td>
              <td className="border border-slate-700">{est.name}</td>
              <td className="border border-slate-700">{est.timeActiveFrom}</td>
              <td className="border border-slate-700">{est.timeActiveTo}</td>
              <td className="border border-slate-700">
                <label onClick={() => HandleHabilitarEst(est.id)}>
                  {est.isActive ? "Habilitado" : "Deshabilitado"}
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstablihsmentTable;
