import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import useDarkMode from '../DarkModeToggle/darkModeToggle';

function Toggle() {
    const [darkMode, toggleDarkMode] = useDarkMode();
  return (
    <div className="w-28 h-12 rounded-[200px] border-2 overflow-hidden relative bg-[url('https://leerzaam.com/wp-content/uploads/2021/03/10526.jpg')] bg-center bg-cover shadow-sm shadow-white">
      <input
        type="checkbox"
        className="peer transition-all hidden"
        id="toggle"
      />
      <label
        htmlFor="toggle"
        className="absolute z-10 w-[2.1rem] h-[2.1rem] mt-[5px] ml-[7px] rounded-[50%] bg-white cursor-pointer peer-checked:translate-x-[3.7rem] transition-all duration-[0.5s]"
        onClick={() => toggleDarkMode()}
      ></label>
      <span className="absolute w-28 h-12 z-[9] left-0 bg-[url('https://cdn.shopify.com/s/files/1/2537/9622/products/011-sunny_1024x1024.jpg?v=1511127320')] bg-center bg-cover opacity-100 peer-checked:opacity-0 transition-all">
        {" "}
        <FontAwesomeIcon
          icon={faSun}
          size={"2x"}
          color={"white"}
          spin={true}
          className="absolute left-16 top-1 duration-[2s] shadow-xl"
        />{" "}
        </span>
        <FontAwesomeIcon
          icon={faMoon}
          size={"2x"}
          color={"white"}
          className="absolute left-1 top-11 shadow-xl duration-[1s] opacity-100 peer-checked:-translate-y-10"
        />
    </div>
  );
}

export default Toggle;
