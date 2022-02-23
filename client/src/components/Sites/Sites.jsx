import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSite } from "../../redux/actions/site";
import { deleteCourt } from "../../redux/actions/court";
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../redux/actions/actionNames";

function Sites() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.register.userToken);
  const [establishmentDetail, setEstablishmentDetail] = useState(null);
  const [courts, setCourts] = useState([]);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    axios
      .get(`${SERVER_URL}/establishment/idUser`, { headers: headers })
      .then((res) => {
        setEstablishmentDetail(res.data);
      })
  }, [userToken]);

  useEffect(()=>{
    if(establishmentDetail){
      setSites(establishmentDetail.sites.filter((e) => e.isActive === true))
    }
  },[establishmentDetail])


  const handleSites = (site) => {
    if (!courts.length) {
      setCourts(() => site.courts.filter((e) => e.isActive === true));
    } else {
      setCourts([]);
    }
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
        setCourts(site.courts.map((court) => dispatch(deleteCourt(court.id, userToken))))
        setSites(sites.filter((e) => e !== site));
        Swal.fire("Sede eliminada");
        //window.location.reload();
      } else if (result.isDenied) {
        Swal.fire("La sede no se elimino");
      }
    });
  }
  function handleDeleteCourt(event, court) {
    event.preventDefault();
    new Swal({
      title: "Estas seguro de eliminar la cancha?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCourt(court.id, userToken));
        Swal.fire("Cancha eliminada");

        sites.map((site) =>
          // eslint-disable-next-line array-callback-return
          site.courts.map((c) => {
            if (c === court) {
              c.isActive = false;
            }
          })
        );
        setCourts(courts.filter((e) => e !== court));
      } else if (result.isDenied) {
        Swal.fire("La cancha no se elimino");
      }
    });
  }

  return (
    <div className="w-[20rem] overflow-x-auto overflow-y-hidden sm:w-full my-5">
      {!sites.length ? (
        <span className="flex place-content-center mt-40 text-4xl text-blue-800 dark:text-white">
          No tenes sedes actualmente
        </span>
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
              {sites.map((e) => (
                <tr key={e.id}>
                  <td className="border border-slate-700 py-2">{e.name}</td>
                  <td className="border border-slate-700 py-2">{e.city}</td>
                  <td className="border border-slate-700 py-2">{e.country}</td>
                  <td className="border border-slate-700 py-2">{e.street}</td>
                  <td className="border border-slate-700 py-2">
                    {e.streetNumber}
                  </td>
                  {!e.courts.filter((c) => c.isActive === true).length ? (
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

      {courts.filter(c => c.isActive===true).length ? (
        <div className="py-2">
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
            {courts.map((e) =>
              e.isActive === true ? (
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
                        onClick={(event) => handleDeleteCourt(event, e, sites)}
                        className="bg-red-500 px-1 hover:bg-red-600 transition-all active:scale-95"
                      >
                        X
                      </button>{" "}
                    </td>
                  </tr>
                </tbody>
              ) : null
            )}
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default Sites;
