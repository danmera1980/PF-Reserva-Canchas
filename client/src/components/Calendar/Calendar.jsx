import React, {useEffect, useState} from "react";
import  {DtCalendar}  from 'react-calendar-datetime-picker';
import 'react-calendar-datetime-picker/dist/index.css';
import { SERVER_URL } from "../../redux/actions/actionNames";
import axios from "axios";
import Hours from "./Hours"

const Calendario = ({disabledDates, scheduledTime, selectedBooking}) => {
    const [date, setDate] = useState(null)
    // console.log(date)
    

    const getSchedule = (schedule) => {
      return schedule.find(s => (s.year === date?.year && s.month === date?.month && s.day === date?.day))
    }
   
    useEffect(() => {
      axios
        .get(`${SERVER_URL}/booking/availability/9?date=2022-01-16`)
        .then((res) => {
          // setUserDetails(res.data);
        });
    }, []);

    return (
      <div className="flex">
        <DtCalendar
          onChange={setDate}
          disabledDates={disabledDates}
      />
      {date? 
        <Hours
          currentDate={date}
          disabledTime={getSchedule(scheduledTime)}
          selectedBooking={selectedBooking}
        /> 
      : null}
      </div>

    )
  }
  
  
  export default Calendario
  