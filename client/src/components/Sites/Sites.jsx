import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSite } from "../../redux/actions/site";
import Swal from "sweetalert2";

function Sites({ establishmentDetail }) {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.register.userToken);
  const [courts, setCourts] = useState([]);

  const handleSites = (sites) => {
    setCourts(() => sites.courts);
  };
  function handleDeleteSite(event, site) {
    event.preventDefault();
    new Swal({
      title: "Estas seguro de eliminar la sede?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSite(site.id, userToken));
        Swal.fire("Sede eliminada");
        window.location.reload();
      } else if (result.isDenied) {
        Swal.fire("La sede no se elimino");
      }
    });
  }

  let sitesActive = [];
  establishmentDetail.map((e) =>
    e.isActive === true ? sitesActive.push(e) : null
  );
  return (
    <div className="w-[20rem] overflow-x-auto sm:w-full my-5">
      {!sitesActive.length ? (
        <span>No hay sedes</span>
      ) : (
        <div>
          <table className="w-full border-collapse border border-slate-500">
            <thead className="bg-slate-600">
              <tr>
                <th className="border border-slate-600 px-10">Nombre</th>
                <th className="border border-slate-600 px-10">Ciudad</th>
                <th className="border border-slate-600 px-10">País</th>
                <th className="border border-slate-600 px-10">Calle</th>
                <th className="border border-slate-600">Número de calle</th>
                <th className="border border-slate-600 px-5">Canchas</th>
                <th className="border border-slate-600 px-5">Eliminar sede</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {sitesActive.map((e) => (
                <tr key={e.id} className="hover:bg-black">
                  <td className="border border-slate-700 py-2">{e.name}</td>
                  <td className="border border-slate-700 py-2">{e.city}</td>
                  <td className="border border-slate-700 py-2">{e.country}</td>
                  <td className="border border-slate-700 py-2">{e.street}</td>
                  <td className="border border-slate-700 py-2">
                    {e.streetNumber}
                  </td>
                  {e.courts.length === 0 ? (
                    <td className="border border-slate-700 py-2">
                      Sin canchas cargadas
                    </td>
                  ) : (
                    <td
                      className="border border-slate-700 py-2 underline cursor-pointer"
                      onClick={() => handleSites(e)}
                    >
                      Ver canchas
                    </td>
                  )}
                  <td className="border border-slate-700 py-2">
                    {" "}
                    <button
                      value={e}
                      onClick={(event) => handleDeleteSite(event, e)}
                      className="bg-red-500 px-1 hover:bg-red-600 transition-all active:scale-95"
                    >
                      X
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="py-2">
        {courts.length ? (
          <table className="w-full border-collapse border border-slate-500">
            <thead className="bg-slate-600">
              <tr>
                <th className="border border-slate-600 px-10">Nombre</th>
                <th className="border border-slate-600 px-10">Precio</th>
                <th className="border border-slate-600">Duración del turno</th>
                <th className="border border-slate-600 px-10">Deporte</th>
                <th className="border border-slate-600 text-center">
                  Eliminar Cancha
                </th>
              </tr>
            </thead>
            {courts.map((e) => (
              <tbody className="text-center" key={e.id}>
                <tr key={e.id}>
                  <td className="border border-slate-700">{e.name}</td>
                  <td className="border border-slate-700">${e.price}</td>
                  <td className="border border-slate-700">
                    {e.shiftLength} Minutos
                  </td>
                  <td className="border border-slate-700">{e.sport}</td>
                  <td className="border border-slate-700 py-2">
                    {" "}
                    <button
                      value={e}
                      // onClick={(event) => handleDeleteCourt(event, e)}
                      className="bg-red-500 px-1 hover:bg-red-600 transition-all active:scale-95"
                    >
                      X
                    </button>{" "}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        ) : null}
      </div>
    </div>
  );
}

export default Sites;
