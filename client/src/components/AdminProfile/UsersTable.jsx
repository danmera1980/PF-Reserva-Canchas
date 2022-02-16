import React from "react";

function UsersTable({ users }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Posee Establecimiento</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr>
              <td>{u.name}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.hasEstablishment ? "si" : "no"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
