import React from "react";
import {Link} from "react-router-dom";



function EstablishmentProfile() {
    return (
        <div>
            <div>
                <Link to={"/site"}>
                    <button>Crear sede</button>
                </Link>
            </div>
            <div>
                <Link to={"/court"}>
                    <button>Crear cancha</button>
                </Link>
            </div>
        </div>
    )
}

export default EstablishmentProfile