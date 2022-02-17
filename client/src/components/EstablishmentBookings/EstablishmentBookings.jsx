import axios from "axios";
import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { SERVER_URL } from "../../redux/actions/actionNames";

function EstablishmentBookings({establishmentDetail}) {
  const [courts, setCourts] = useState(null);
  // setCourts(establishmentDetail.map(e => e.courts.map(e => e.id)))
  console.log(establishmentDetail)
  var currentDate = Date.now()


  // useEffect(() => {
  //   axios.get(`${SERVER_URL}/:courtId`)
  // })

  return <div>
      <h1>Reservas</h1>
      <div>
        {/* <Paper>
          <Scheduler
            data={{establishmentDetail}}
          />
          <ViewState 
            currentDate={currentDate}
          />
          <DayView
            startDayHour={9}
            endDayHour={14}
          />
        </Paper> */}
      </div>

  </div>;
}

export default EstablishmentBookings;
