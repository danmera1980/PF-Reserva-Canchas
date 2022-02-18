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
  AppointmentTooltip,
  AppointmentForm,
  ViewSwitcher,
  Resources
} from '@devexpress/dx-react-scheduler-material-ui';
import { SERVER_URL } from "../../redux/actions/actionNames";

// router.get('/byEstab/:establishmentId', getBookingsByEstablishment)

const appointments = [
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2022, 2, 16, 9, 35),
    endDate: new Date(2022, 2, 16, 11, 30),
    id: 0,
    location: 'Room 1',
  }, {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2022, 2, 16, 12, 11),
    endDate: new Date(2022, 2, 16, 13, 0),
    id: 1,
    location: 'Room 1',
  }, {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2022, 2, 16, 14, 30),
    endDate: new Date(2022, 2, 16, 15, 35),
    id: 2,
    location: 'Room 2',
  }, {
    title: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date(2022, 2, 17, 10, 0),
    endDate: new Date(2022, 2, 17, 11, 0),
    id: 3,
    location: 'Room 2',
  }, {
    title: 'Final Budget Review',
    startDate: new Date(2022, 2, 17, 12, 0),
    endDate: new Date(2022, 2, 17, 13, 35),
    id: 4,
    location: 'Room 2',
  }, {
    title: 'New Brochures',
    startDate: new Date(2022, 2, 17, 14, 30),
    endDate: new Date(2022, 2, 17, 15, 45),
    id: 5,
    location: 'Room 2',
  }, {
    title: 'Install New Database',
    startDate: new Date(2022, 2, 18, 9, 45),
    endDate: new Date(2022, 2, 18, 11, 15),
    id: 6,
    location: 'Room 1',
  }, {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2022, 2, 18, 12, 0),
    endDate: new Date(2022, 2, 18, 14, 0),
    id: 7,
    location: 'Room 3',
  }, {
    title: 'Upgrade Personal Computers',
    startDate: new Date(2022, 2, 18, 15, 15),
    endDate: new Date(2022, 2, 18, 16, 30),
    id: 8,
    location: 'Room 3',
  }, {
    title: 'Customer Workshop',
    startDate: new Date(2022, 2, 19, 11, 0),
    endDate: new Date(2022, 2, 19, 12, 0),
    id: 9,
    location: 'Room 3',
  }, {
    title: 'Prepare 2015 Marketing Plan',
    startDate: new Date(2022, 2, 19, 11, 0),
    endDate: new Date(2022, 2, 19, 13, 30),
    id: 10,
    location: 'Room 1',
  },
]

function EstablishmentBookings({establishmentDetail}) {
  const [data, setData] = useState(appointments);
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

  const PREFIX = 'Sites';
  // #FOLD_BLOCK
  const classes = {
    flexibleSpace: `${PREFIX}-flexibleSpace`,
    textField: `${PREFIX}-textField`,
    locationSelector: `${PREFIX}-locationSelector`,
    button: `${PREFIX}-button`,
    selectedButton: `${PREFIX}-selectedButton`,
    longButtonText: `${PREFIX}-longButtonText`,
    shortButtonText: `${PREFIX}-shortButtonText`,
    title: `${PREFIX}-title`,
    textContainer: `${PREFIX}-textContainer`,
    time: `${PREFIX}-time`,
    text: `${PREFIX}-text`,
    container: `${PREFIX}-container`,
    weekendCell: `${PREFIX}-weekendCell`,
    weekEnd: `${PREFIX}-weekEnd`,
  };
  // #FOLD_BLOCK
  const StyledAppointmentsAppointmentContent = styled(Appointments.AppointmentContent)(() => ({
    [`& .${classes.title}`]: {
      fontWeight: 'bold',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    [`& .${classes.textContainer}`]: {
      lineHeight: 1,
      whiteSpace: 'pre-wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
    },
    [`& .${classes.time}`]: {
      display: 'inline-block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    [`& .${classes.text}`]: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    [`& .${classes.container}`]: {
      width: '100%',
    },
  }));
  // #FOLD_BLOCK
  const StyledTextField = styled(TextField)(({
    theme: { spacing },
  }) => ({
    [`&.${classes.textField}`]: {
      width: '75px',
      marginLeft: spacing(1),
      marginTop: 0,
      marginBottom: 0,
      height: spacing(4.875),
    },
  }));
  // #FOLD_BLOCK
  const StyledButtonGroup = styled(ButtonGroup)(({
    theme: { spacing, palette },
  }) => ({
    [`&.${classes.locationSelector}`]: {
      marginLeft: spacing(1),
      height: spacing(4.875),
    },
    [`& .${classes.longButtonText}`]: {
      '@media (max-width: 800px)': {
        display: 'none',
      },
    },
    [`& .${classes.shortButtonText}`]: {
      '@media (min-width: 800px)': {
        display: 'none',
      },
    },
    [`& .${classes.button}`]: {
      paddingLeft: spacing(1),
      paddingRight: spacing(1),
      width: spacing(10),
      '@media (max-width: 800px)': {
        width: spacing(2),
        fontSize: '0.75rem',
      },
    },
    [`& .${classes.selectedButton}`]: {
      background: palette.primary[400],
      color: palette.primary[50],
      '&:hover': {
        backgroundColor: palette.primary[500],
      },
      border: `1px solid ${palette.primary[400]}!important`,
      borderLeft: `1px solid ${palette.primary[50]}!important`,
      '&:first-of-type': {
        borderLeft: `1px solid ${palette.primary[50]}!important`,
      },
    },
  }));
  // #FOLD_BLOCK
  const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
    [`&.${classes.flexibleSpace}`]: {
      margin: '0 auto 0 0',
      display: 'flex',
      alignItems: 'center',
    },
  }));
  // #FOLD_BLOCK
  const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(({
    theme: { palette },
  }) => ({
    [`&.${classes.weekendCell}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      '&:hover': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
      '&:focus': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
    },
  }));
  // #FOLD_BLOCK
  const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(({
    theme: { palette },
  }) => ({
    [`&.${classes.weekEnd}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.06),
    },
  }));


  // useEffect(() => {
  //   axios.get(`${SERVER_URL}/:courtId`)
  // })

  // const AppointmentContent = ()

  return (
    <Paper>
      <Scheduler
        data={data}
        height={660}
      >
        <WeekView
          startDayHour={9}
          endDayHour={19}
        />

        <Appointments />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
        />
        <AppointmentForm
          readOnly
        />
      </Scheduler>
    </Paper>
  );
}

export default EstablishmentBookings;
