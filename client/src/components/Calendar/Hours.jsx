import React from "react";

const Hours = () => {
    var horas = Array.from(Array(24).keys())
    return (
        horas.map((h)=> (
            <div>
                {h}:00
            </div>
        ))
    )
}

export default Hours;
