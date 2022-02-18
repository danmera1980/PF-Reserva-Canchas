import axios from "axios";
import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import { teal, orange, red } from "@mui/material/colors";
import { ViewState } from "@devexpress/dx-react-scheduler";
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
  TodayButton,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { SERVER_URL } from "../../redux/actions/actionNames";

const appointments = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2022, 2, 16, 9, 35),
    endDate: new Date(2022, 2, 16, 11, 30),
    id: 0,
    location: "Room 1",
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2022, 2, 16, 12, 11),
    endDate: new Date(2022, 2, 16, 13, 0),
    id: 1,
    location: "Room 1",
  },
];

function EstablishmentBookings({ establishmentDetail }) {
  console.log(establishmentDetail);
  const [data, setData] = useState([]);
  const [bookings, setBookings] = useState(null);

  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstDay = new Date(curr.setDate(first)).toUTCString();
  var lastDay = new Date(curr.setDate(last)).toUTCString();

  var startDayHour = establishmentDetail?.timeActiveFrom.substring(0,2)
  var endDayHour = establishmentDetail?.timeActiveTo.substring(0,2)

  console.log(startDayHour, endDayHour )

  useEffect(() => {
    if (establishmentDetail) {
      axios
        .get(
          `${SERVER_URL}/booking/byEstab/${establishmentDetail?.id}?dateFrom=${firstDay}&dateTo=${lastDay}`
        )
        .then((res) => setBookings(res.data));
    }
  }, [establishmentDetail]);

  console.log(bookings);
  const resources = [
    {
      fieldName: "location",
    },
  ];

  const PREFIX = "Sites";
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
  const StyledAppointmentsAppointmentContent = styled(
    Appointments.AppointmentContent
  )(() => ({
    [`& .${classes.title}`]: {
      fontWeight: "bold",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    [`& .${classes.textContainer}`]: {
      lineHeight: 1,
      whiteSpace: "pre-wrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "100%",
    },
    [`& .${classes.time}`]: {
      display: "inline-block",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    [`& .${classes.text}`]: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    [`& .${classes.container}`]: {
      width: "100%",
    },
  }));
  // #FOLD_BLOCK
  const StyledTextField = styled(TextField)(({ theme: { spacing } }) => ({
    [`&.${classes.textField}`]: {
      width: "75px",
      marginLeft: spacing(1),
      marginTop: 0,
      marginBottom: 0,
      height: spacing(4.875),
    },
  }));
  // #FOLD_BLOCK
  const StyledButtonGroup = styled(ButtonGroup)(
    ({ theme: { spacing, palette } }) => ({
      [`&.${classes.locationSelector}`]: {
        marginLeft: spacing(1),
        height: spacing(4.875),
      },
      [`& .${classes.longButtonText}`]: {
        "@media (max-width: 800px)": {
          display: "none",
        },
      },
      [`& .${classes.shortButtonText}`]: {
        "@media (min-width: 800px)": {
          display: "none",
        },
      },
      [`& .${classes.button}`]: {
        paddingLeft: spacing(1),
        paddingRight: spacing(1),
        width: spacing(10),
        "@media (max-width: 800px)": {
          width: spacing(2),
          fontSize: "0.75rem",
        },
      },
      [`& .${classes.selectedButton}`]: {
        background: palette.primary[400],
        color: palette.primary[50],
        "&:hover": {
          backgroundColor: palette.primary[500],
        },
        border: `1px solid ${palette.primary[400]}!important`,
        borderLeft: `1px solid ${palette.primary[50]}!important`,
        "&:first-of-type": {
          borderLeft: `1px solid ${palette.primary[50]}!important`,
        },
      },
    })
  );
  // #FOLD_BLOCK
  const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
    [`&.${classes.flexibleSpace}`]: {
      margin: "0 auto 0 0",
      display: "flex",
      alignItems: "center",
    },
  }));
  // #FOLD_BLOCK
  const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(
    ({ theme: { palette } }) => ({
      [`&.${classes.weekendCell}`]: {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
        "&:hover": {
          backgroundColor: alpha(palette.action.disabledBackground, 0.04),
        },
        "&:focus": {
          backgroundColor: alpha(palette.action.disabledBackground, 0.04),
        },
      },
    })
  );
  // #FOLD_BLOCK
  const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(
    ({ theme: { palette } }) => ({
      [`&.${classes.weekEnd}`]: {
        backgroundColor: alpha(palette.action.disabledBackground, 0.06),
      },
    })
  );

  return (
    <Paper>
      {establishmentDetail!==null && establishmentDetail?
        <Scheduler data={data} height={700}>
          <ViewState/>
          <WeekView
            startDayHour={6}
            endDayHour={24}
            startDate={firstDay}
            endDate={lastDay}
          />
          <DayView 
            startDayHour={startDayHour}
            endDayHour={endDayHour}
          />

          <Appointments />
          <AppointmentTooltip showCloseButton showOpenButton />
          <AppointmentForm readOnly />
          <Toolbar/>
          <DateNavigator/>
          <TodayButton />
          <ViewSwitcher/>
        </Scheduler>
      :
        null
      }
    </Paper>
  );
}

export default EstablishmentBookings;
