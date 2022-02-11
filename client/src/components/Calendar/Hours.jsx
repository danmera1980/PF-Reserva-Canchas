import React from "react";

const Hours = () => {
    var horas = Array.from(Array(24).keys())
    return (
        <div className="drop-shadow-md">
            <div className=" text-white bg-[#009a17] h-[78px] ">HORARIOS</div>
            <div className="grid grid-rows-6 gap-4 grid-flow-col bg-white p-4 h-[283px]">
                {horas.map((h)=> (
                    <span key={h} className="inline-block align-baseline hover:bg-[#009a17] hover:text-white text-center w-16 items-center rounded-2xl">
                        {h}:00
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Hours;
