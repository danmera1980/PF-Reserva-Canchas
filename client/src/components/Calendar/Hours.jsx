import React from "react";

const Hours = () => {
    var horas = Array.from(Array(24).keys())
    return (
        horas.map((h)=> (
            <div className="bg-white inline-table">
            <div className="box-border container grid grid-cols-4 grid-rows-6 gap-3">
                <div className="box-border h-10 w-14 p-4 border-4 flex justify-center items-center">
                    <ul>
                        {h}:00
                    </ul>
                </div>
            </div>
            </div>
        ))
    )
}

export default Hours;
