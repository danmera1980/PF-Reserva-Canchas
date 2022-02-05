import React from "react";

function Toggle() {
  return (
    <div className="w-28 h-12 rounded-[200px] border-2 overflow-hidden relative bg-[url('https://leerzaam.com/wp-content/uploads/2021/03/10526.jpg')] bg-center bg-cover shadow-lg shadow-white">
        <input type="checkbox" className="peer transition-all hidden"/>
        <label className="absolute z-10 w-[2.1rem] h-[2.1rem] mt-[5px] ml-[7px] rounded-[50%] bg-white cursor-pointer peer-checked:translate-x-10 transition-all"></label>
    </div>
  );
}

export default Toggle;
