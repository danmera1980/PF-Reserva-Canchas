import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../redux/actions/actionNames";
import { useSelector } from "react-redux";
import Toggle from "react-toggle";
import "./css-toggle.scss";

function UsersTable() {
  const [users, setUsers] = useState(null);
  const userToken = useSelector((state) => state.register.userToken);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios.get(`${SERVER_URL}/users`, { headers: headers }).then((res) => {
      setUsers(res.data);
    });
  }, [userToken]);

  function handleSearch(input) {
    switch (input.target.id) {
      case "name":
        if (input.target.value !== "") {
          setUsers(() => {
            return users.filter((item) =>
              item.name.toLowerCase().includes(input.target.value.toLowerCase())
            );
          });
        } else {
          setUsers(users);
        }
        break;
      case "lastName":
        if (input.target.value !== "") {
          setUsers(() => {
            return users.filter((item) =>
              item.lastName
                .toLowerCase()
                .includes(input.target.value.toLowerCase())
            );
          });
        } else {
          setUsers(users);
        }
        break;
      default:
        setUsers(users);
        break;
    }
  }

  function handleFilter(e) {
    if (e.target.value !== "all") {
      console.log(e.target.value);
      if (e.target.value === "true") {
        setUsers(users.filter((u) => u.hasEstablishment === true));
      } else {
        setUsers(users.filter((u) => u.hasEstablishment === false));
      }
    } else {
      setUsers(users);
    }
    console.log(users, e.target.value);
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
  }
  return (
    <div className="flex justify-center -ml-20 sm:w-full">
      <table className="ml-36 mt-10 table-auto border-collapse border border-slate-500 text-white overflow-y-auto">
        <thead className="bg-slate-600">
          <tr>
            <th className="border border-slate-600 px-10">
              Nombre
              <div>
                <input
                  className="text-black rounded"
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
                  className="text-black rounded"
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
          {users?.map((u) => (
            <tr key={u.id}>
              <td className="border border-slate-700">{u.name}</td>
              <td className="border border-slate-700">{u.lastName}</td>
              <td className="border border-slate-700">{u.email}</td>
              <td className="border border-slate-700">{u.phone}</td>
              <td className="border border-slate-700">
                {u.hasEstablishment ? "si" : "no"}
              </td>
              <td className="border border-slate-700">
                <div>
                  <Toggle
                    onClick={() => HandleHabilitarUs(u.id)}
                    defaultChecked={u.isActive}
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

export default UsersTable;
