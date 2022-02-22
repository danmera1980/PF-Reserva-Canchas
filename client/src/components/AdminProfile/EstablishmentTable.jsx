import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../redux/actions/actionNames";
import Toggle from "react-toggle";
import "./css-toggle.scss";

function EstablihsmentTable({ establishment }) {
  const userToken = useSelector((state) => state.register.userToken);
  const [data, setData] = useState(establishment);

  function handleSearch(input) {
    switch (input.target.id) {
      case "name":
        if (input.target.value !== "") {
          setData(() => {
            return establishment.filter((item) =>
              item.name.toLowerCase().includes(input.target.value.toLowerCase())
            );
          });
        } else {
          setData(establishment);
        }
        break;
      case "cuit":
        if (input.target.value !== "") {
          setData(() => {
            return establishment.filter((item) =>
              item.cuit.includes(input.target.value)
            );
          });
        } else {
          setData(establishment);
        }
        break;
      default:
        setData(establishment);
        break;
    }
  }

  function HandleHabilitarEst(establishmentId) {
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
  }

  return (
    <div className="w-[20rem] overflow-x-auto sm:w-full my-5">
      <table className="ml-36 mt-10 table-auto border-collapse border border-slate-500 text-white">
        <thead className="bg-slate-600">
          <tr>
            <th className="border border-slate-600 px-10">
              Cuit
              <div>
                <input
                  className="text-black"
                  id="cuit"
                  type="text"
                  onChange={(e) => handleSearch(e)}
                ></input>
              </div>
            </th>
            <th className="border border-slate-600 px-10">
              Nombre
              <div>
                <input
                  className="text-black"
                  id="name"
                  type="text"
                  onChange={(e) => handleSearch(e)}
                ></input>
              </div>
            </th>
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
          {data?.map((est) => (
            <tr key={est.id}>
              <td className="border border-slate-700">{est.cuit}</td>
              <td className="border border-slate-700">{est.name}</td>
              <td className="border border-slate-700">{est.timeActiveFrom}</td>
              <td className="border border-slate-700">{est.timeActiveTo}</td>
              <td className="border border-slate-700">
                <div>
                  <Toggle
                    onClick={() => HandleHabilitarEst(est.id)}
                    defaultChecked={est.isActive}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstablihsmentTable;
