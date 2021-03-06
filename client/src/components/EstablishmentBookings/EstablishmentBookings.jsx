import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Room from "@mui/icons-material/Room";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled, alpha } from "@mui/material/styles";
import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  grey,
  lightBlue,
  lightGreen,
  lime,
} from "@mui/material/colors";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
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

function EstablishmentBookings({ establishmentDetail }) {
  const [bookings, setBookings] = useState(null);
  const [newBooking, setNewBooking] = useState("");

  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6
  var firstDayMonth = new Date(curr.getFullYear(), curr.getMonth(), 1);
  var lastDayMonth = new Date(curr.getFullYear(), curr.getMonth() + 1);

  var firstDay = new Date(curr.setDate(first)).toUTCString();
  var lastDay = new Date(curr.setDate(last)).toUTCString();

  var startDayHour = establishmentDetail?.timeActiveFrom.substring(0, 2);
  var endDayHour = establishmentDetail?.timeActiveTo.substring(0, 2);

  useEffect(() => {
    if (establishmentDetail) {
      axios
        .get(
          `${SERVER_URL}/booking/byEstabId/${establishmentDetail?.id}?dateFrom=${firstDayMonth}&dateTo=${lastDayMonth}`
        )
        .then((res) =>
          setBookings(() => {
            return res.data.map((b) => {
              return {
                id: b.id,
                courtId: b.courtId,
                courtName: b.courtName,
                title:
                  b.siteName +
                  " - " +
                  b.courtName +
                  " - " +
                  b.userName +
                  " " +
                  b.userLastName +
                  " ref: " +
                  b.external_reference,
                startDate: b.startTime,
                endDate: b.endTime,
                location: b.courtName,
              };
            });
          })
        );
    }

    if (newBooking) {
      Swal.fire({
        title: "Reseva Creada",
        text: "C??digo de reserva: " + newBooking,
      });
      setNewBooking("");
    }
  }, [establishmentDetail, newBooking]);

  console.log(bookings);

  let colors = [
    amber,
    blue,
    blueGrey,
    brown,
    cyan,
    deepOrange,
    deepPurple,
    green,
    indigo,
    grey,
    lightBlue,
    lightGreen,
    lime,
  ];

  let locations_short = [
    ...new Map(bookings?.map((b) => [b.courtId, b.courtId])).values(),
  ];
  let locations = [
    ...new Map(bookings?.map((b) => [b.courtId, b.courtName])).values(),
  ];
  let resourcesData = [];

  console.log(locations_short, locations, bookings);

  for (let i = 0; i < locations?.length; i++) {
    resourcesData.push({
      id: locations_short[i],
      text: locations[i],
      color: colors[i],
    });
  }

  const LOCATIONS = locations;
  const LOCATIONS_SHORT = locations_short;
  const resources = [
    {
      fieldName: "courtId",
      title: "Canchas",
      instances: resourcesData,
    },
  ];

  const PREFIX = "Demo";
  // #FOLD_BLOCK
  const classes = {
    icon: `${PREFIX}-icon`,
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
    todayCell: `${PREFIX}-todayCell`,
    today: `${PREFIX}-today`,
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
    ({ theme }) => ({
      [`&.${classes.todayCell}`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.14),
        },
        "&:focus": {
          backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
      },
      [`&.${classes.weekendCell}`]: {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        "&:hover": {
          backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        },
        "&:focus": {
          backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        },
      },
    })
  );
  // #FOLD_BLOCK
  const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(
    ({ theme }) => ({
      [`&.${classes.today}`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
      },
      [`&.${classes.weekend}`]: {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
      },
    })
  );
  // #FOLD_BLOCK
  const StyledDiv = styled("div")(({ theme }) => ({
    [`& .${classes.icon}`]: {
      margin: theme.spacing(2, 0),
      marginRight: theme.spacing(2),
    },
    [`& .${classes.header}`]: {
      overflow: "hidden",
      paddingTop: theme.spacing(0.5),
    },
    [`& .${classes.textField}`]: {
      width: "100%",
    },
    [`& .${classes.content}`]: {
      padding: theme.spacing(2),
      paddingTop: 0,
    },
    [`& .${classes.closeButton}`]: {
      float: "right",
    },
    [`& .${classes.picker}`]: {
      marginRight: theme.spacing(2),
      "&:last-child": {
        marginRight: 0,
      },
      width: "50%",
    },
    [`& .${classes.wrapper}`]: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(1, 0),
    },
    [`& .${classes.buttonGroup}`]: {
      display: "flex",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 2),
    },
    [`& .${classes.button}`]: {
      marginLeft: theme.spacing(2),
    },
  }));

  const StyledGrid = styled(Grid)(() => ({
    [`&.${classes.textCenter}`]: {
      textAlign: "center",
    },
  }));

  const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
    [`&.${classes.icon}`]: {
      color: palette.action.active,
    },
  }));

  const TimeTableCell = (props) => {
    const { startDate } = props;
    const date = new Date(startDate);

    if (date.getDate() === new Date().getDate()) {
      return (
        <StyledWeekViewTimeTableCell {...props} className={classes.todayCell} />
      );
    }
    if (date.getDay() === 0 || date.getDay() === 6) {
      return (
        <StyledWeekViewTimeTableCell
          {...props}
          className={classes.weekendCell}
        />
      );
    }
    return <StyledWeekViewTimeTableCell {...props} />;
  };

  const DayScaleCell = (props) => {
    const { startDate, today } = props;

    if (today) {
      return (
        <StyledWeekViewDayScaleCell {...props} className={classes.today} />
      );
    }
    if (startDate.getDay() === 0 || startDate.getDay() === 6) {
      return (
        <StyledWeekViewDayScaleCell {...props} className={classes.weekend} />
      );
    }
    return <StyledWeekViewDayScaleCell {...props} />;
  };

  const commitChanges = ({ added, changed, deleted }) => {
    console.log(added);

    let body = {
      courtId: added.courtId,
      details: added.title,
      dateFrom: added.startDate.toISOString(),
      dateTo: added.endDate.toISOString(),
      finalAmount: 0,
    };

    if (added) {
      axios
        .post(`${SERVER_URL}/booking/add`, body)
        .then((res) => setNewBooking(res.data));
    }

    console.log(newBooking);
  };

  return (
    <Paper>
      {bookings !== null && bookings ? (
        <Scheduler data={bookings} height={700}>
          <ViewState />
          <EditingState
            onCommitChanges={commitChanges}
            // addedAppointment={addedAppointment}
            // onAddedAppointmentChange={changeAddedAppointment}
            // appointmentChanges={appointmentChanges}
            // onAppointmentChangesChange={changeAppointmentChanges}
            // editingAppointment={editingAppointment}
            // onEditingAppointmentChange={changeEditingAppointment}
          />
          <IntegratedEditing />
          <WeekView
            startDayHour={6}
            endDayHour={24}
            startDate={firstDay}
            endDate={lastDay}
            cellDuration="60"
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />
          <DayView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
            cellDuration="60"
          />

          <Appointments />
          <Resources data={resources} />
          <AppointmentTooltip showCloseButton showOpenButton />
          <AppointmentForm>
            {/* <AppointmentForm.label 
                text="Precio"
                type="title"
              />
              <AppointmentForm.TextEditor 
                placeholder="custom field"
              /> */}
          </AppointmentForm>
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
        </Scheduler>
      ) : null}
    </Paper>
  );
}

export default EstablishmentBookings;
