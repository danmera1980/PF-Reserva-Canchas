import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { SERVER_URL } from "../../redux/actions/actionNames";

function EstablishmentBookings({establishmentDetail}) {
  const [courts, setCourts] = useState(null);
  // setCourts(establishmentDetail.map(e => e.courts.map(e => e.id)))
  // console.log(establishmentDetail)


  // useEffect(() => {
  //   axios.get(`${SERVER_URL}/:courtId`)
  // })

  return <div>
      <h1>Reservas</h1>
  </div>;
}

export default EstablishmentBookings;
