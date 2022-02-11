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
   
    return (
      <div className="flex">
        <DtCalendar
          onChange={setDate}
          disabledDates={disabledDates}
      />
      {date? <Hours/> : null}
      </div>

    )
  }
  
  
  export default Calendario
  