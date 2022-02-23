import React, { useState } from "react";
import { useEffect } from "react";

const Hours = ({selectedDate, disabledTime, selectedBooking, minTime}) => {
    const [hours, setHours] = useState([])

    useEffect(()=> {
        setHours([])
        for (let i = 0; i < 24; i++) { 
            disabledTime?.find(t => (parseInt(t.startTime.split(":")[0])===i && t.isAvailable===true))?
            setHours(prevHours => [
                ...prevHours,
                {
                    hour: i,
                    disabled: false,
                    selected: false
                }
            ])
            :
            setHours(prevHours => [
                ...prevHours,
                {
                    hour: i,
                    disabled: true,
                    selected: false
                }
            ])
        }
    },[disabledTime])


    const handleClick = (date, time) => {
        selectedBooking({
            startTime: [date.year,date.month-1,date.day,time], 
            endTime: new Date(date.year,date.month-1,date.day,time+1,"00","00"),
        })

        for (let i = 0; i < hours.length; i++) {
            if(i === time){
                setHours(hours => {
                    return [
                        ...hours.slice(0, i), 
                        hours[i]= {hour: i, disabled: false, selected: true},
                        ...hours.slice(i+1)
                    ]
                })  
            } else {
                if(hours[i].disabled===false){
                    setHours(hours => {
                        return [
                            ...hours.slice(0, i), 
                            hours[i]= {hour: i, disabled: false, selected: false},
                            ...hours.slice(i+1)
                        ]
                    })
                } else {
                    setHours(hours => {
                        return [
                            ...hours.slice(0, i), 
                            hours[i]= {hour: i, disabled: true, selected: false},
                            ...hours.slice(i+1)
                        ]
                    })
                }
            }
        }
    }

    return (
        <div className="rounded drop-shadow-md">
            <div className="grid place-content-center text-white bg-[#009a17] h-[76px]">
                <h1 className="inline-block align-middle">HORARIOS</h1>
                <span>{selectedDate.day}/{selectedDate.month}/{selectedDate.year}</span>
            </div>
            <div className="grid grid-rows-6 gap-4 grid-flow-col bg-white p-4 h-[283px] content-center">
                {hours?.map((h)=> (
                    <span 
                        key={h.hour} 
                        className={`${h.selected?"bg-[#03bf1f] text-white":"text-gray-700"} flex items-center justify-center align-baseline ${h.disabled?"pointer-events-none text-gray-700 text-opacity-25":"hover:bg-[#03bf1f] hover:text-white"} text-center w-16 items-center rounded-2xl cursor-pointer`}
                        onClick={() => handleClick(selectedDate, h.hour)}
                    >
                        {h.hour}:00
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Hours;
