import React, {useState} from "react"
import  {DtCalendar}  from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'
import Hours from "./Hours"

const Calendario = () => {
    const [date, setDate] = useState(null)
    // console.log(date)
    const disabledDates = [
      {
        year: 2022,
        month: 2,
        day: 23
      },
      {
        year: 2022,
        month: 6,
        day: 16
      },
      {
        year: 2022,
        month: 2,
        day: 12
      }
    ]
    const scheduledTime = [
      {
        year: 2022,
        month: 2,
        day: 18,
        times: [
          10,
          13,
          14,
          17,
          18
        ]
      },
      {
        year: 2022,
        month: 2,
        day: 19,
        times:[
          9,
          10,
          12,
          13,
          18,
          19,
          20
        ]
      }
    ]

    const getSchedule = (schedule) => {
      return schedule.find(s => (s.year === date?.year && s.month === date?.month && s.day === date?.day))
    }
   
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
        /> 
      : null}
      </div>

    )
  }
  
  
  export default Calendario
  