import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../redux/actions/actionNames";
import { useSelector } from "react-redux";

function UsersTable({ users }) {
  const userToken = useSelector((state) => state.register.userToken);
  const [usersTemp, setUsersTemp] = useState(users);

  function handleSearch(input) {
    switch (input.target.id) {
      case "name":
        if (input.target.value !== "") {
          setUsersTemp(() => {
            return users.filter((item) =>
              item.name.toLowerCase().includes(input.target.value.toLowerCase())
            );
          });
        } else {
          setUsersTemp(users);
        }
        break;
      case "lastName":
        if (input.target.value !== "") {
          setUsersTemp(() => {
            return users.filter((item) =>
              item.lastName
                .toLowerCase()
                .includes(input.target.value.toLowerCase())
            );
          });
        } else {
          setUsersTemp(users);
        }
        break;
      default:
        setUsersTemp(users);
        break;
    }
  }

  function handleFilter(e) {
    if (e.target.value !== "all") {
      if (e.target.value === "true") {
        setUsersTemp(users.filter((u) => u.hasEstablishment === true));
      } else {
        setUsersTemp(users.filter((u) => u.hasEstablishment === false));
      }
    } else {
      setUsersTemp(users);
    }
    console.log(usersTemp, e.target.value);
  }
  function HandleHabilitarUs(userId) {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios.put(
      `${SERVER_URL}/users/updateStatus`,
      { userId },
      {
        headers: headers,
      }
    );
    window.location.reload();
  }
  return (
    <div>
      <table className="ml-36 mt-10 table-auto border-collapse border border-slate-500 text-white">
        <thead className="bg-slate-600">
          <tr>
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
              Apellido
              <div>
                <input
                  className="text-black"
                  id="lastName"
                  type="text"
                  onChange={(e) => handleSearch(e)}
                ></input>
              </div>
            </th>
            <th className="border border-slate-600 px-10">Email</th>
            <th className="border border-slate-600 px-10">Telefono</th>
            <th className="border border-slate-600 px-10">
              Posee Establecimiento
              <select
                className="text-black border-2 rounded-md"
                onChange={(e) => handleFilter(e)}
              >
                <option value="all">Todos</option>
                <option value="true">Con establecimiento</option>
                <option value="false">Sin establecimiento</option>
              </select>
            </th>
            <th className="border border-slate-600 px-10">
              Habilitar/Deshabilitar
            </th>
          </tr>
        </thead>
        <tbody className="text-center text-white">
          {usersTemp?.map((u) => (
            <tr key={u.id}>
              <td className="border border-slate-700">{u.name}</td>
              <td className="border border-slate-700">{u.lastName}</td>
              <td className="border border-slate-700">{u.email}</td>
              <td className="border border-slate-700">{u.phone}</td>
              <td className="border border-slate-700">
                {u.hasEstablishment ? "si" : "no"}
              </td>
              <td className="border border-slate-700">
                <label
                  className="cursor-pointer"
                  onClick={() => HandleHabilitarUs(u.id)}
                >
                  {u.isActive ? "Habilitado" : "Deshabilitado"}
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
