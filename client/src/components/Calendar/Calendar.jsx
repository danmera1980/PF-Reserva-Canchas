import React, {useState} from "react";
import  {DtCalendar}  from 'react-calendar-datetime-picker';
import 'react-calendar-datetime-picker/dist/index.css';
import { SERVER_URL } from "../../redux/actions/actionNames";
import axios from "axios";
import Hours from "./Hours"

const Calendario = ({courtId, selectedBooking, currentDateTime}) => {
    const [date, setDate] = useState(null)
    const [scheduledTime, setScheduledTime] = useState([])

    const getDate = (date) => {
      if(date){
        setDate(date)
        axios
        .get(`${SERVER_URL}/booking/availability/${courtId}?date=${date?.year}-${date?.month}-${date?.day}`)
        .then((res) => {
          setScheduledTime(res.data[0]);
        });
      }
    }

    return (
      <div className="grid-flow-col lg:flex place-content-center gap-2 mt-1">
        <DtCalendar
          onChange={getDate}
          minDate={currentDateTime}
      />
      {date? 
        <Hours
          selectedDate={date}
          disabledTime={scheduledTime}
          selectedBooking={selectedBooking}
          minTime={currentDateTime.hour}
        /> 
      : null}
      </div>

    )
  }
  
  
  export default Calendario
  