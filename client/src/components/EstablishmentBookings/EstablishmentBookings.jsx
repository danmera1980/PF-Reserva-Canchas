import axios from "axios";
import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { teal, orange, red } from '@mui/material/colors';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  ViewSwitcher,
  Resources
} from '@devexpress/dx-react-scheduler-material-ui';
import { SERVER_URL } from "../../redux/actions/actionNames";

function EstablishmentBookings({establishmentDetail}) {
  const [courts, setCourts] = useState(null);
  // setCourts(establishmentDetail.map(e => e.courts.map(e => e.id)))
  console.log("Info de reservas ", establishmentDetail)
  var currentDate = Date.now()
  const LOCATIONS = establishmentDetail?.sites.map(s => {
    if(s.courts.length) return s.courts.map(c => {
      return c.name
    })
  });
  const LOCATIONS_SHORT = [];
  const resources = [{
    fieldName: 'location'
  }]

  console.log(LOCATIONS)


  // useEffect(() => {
  //   axios.get(`${SERVER_URL}/:courtId`)
  // })

  return <div>
      <h1>Reservas 1</h1>
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
