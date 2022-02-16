import React, { useEffect, useState } from "react";

function UsersTable({ users }) {
  const [usersTemp, setUsersTemp] = useState(users);

  useEffect(() => {}, [usersTemp]);

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
  return (
    <div>
      <table className="ml-36 mt-10 table-auto border-collapse border border-slate-500 text-white">
        <thead className="bg-slate-600">
          <tr>
            <th className="border border-slate-600 px-10">Nombre</th>
            <th className="border border-slate-600 px-10">Apellido</th>
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
                <input type="checkbox"></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
