import React, { useState } from "react";
import Toggle from "react-toggle";
import "./css-toggle.scss";

function Toggle1() {
  const [usersState, setUsersState] = useState(false);

  const toggler = () => {
    usersState ? setUsersState(false) : setUsersState(true);
  };
  return (
    <div>
      <Toggle />
    </div>
  );
}

export default Toggle1;
