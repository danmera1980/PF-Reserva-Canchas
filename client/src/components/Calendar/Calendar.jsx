import React, {useState} from "react"
import  {DtCalendar}  from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'
import Hours from "./Hours"

const Calendario = () => {
    const [date, setDate] = useState(null)
    console.log(date)
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
        times: {
          0: 10,
          1: 13,
          2: 14,
          3: 17,
          4: 18
        }
      },
      {
        year: 2022,
        month: 2,
        day: 19,
        times: {
          0: "9:00",
          1: 10,
          2: 12,
          3: 13,
          4: 18,
          5: 19,
          6: 20
        }
      }
    ]
   
    return (
      <div className="flex">
        <DtCalendar
          onChange={setDate}
          disabledDates={disabledDates}
      />
      {date? 
        <Hours
          currentDate={date}
          disabledTime={scheduledTime}
        /> 
      : null}
      </div>

    )
  }
  
  
  export default Calendario
  