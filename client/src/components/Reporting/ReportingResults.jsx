import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom'
import { SERVER_URL } from "../../redux/actions/actionNames";


export default function ReportingResults() {
    const location = useLocation()
    const {input} = location.state;
    const establishmentId = input.establishmentId;
    const dateFrom = input.dateFrom?input.dateFrom:"";
    const dateTo = input.dateTo?input.dateTo:"";
    const siteId = input.siteId?input.siteId:"";
    const sport = input.sport?input.sport:"";

    const [bookings, setBookings] = useState({})
    useEffect(()=>{
        axios.get(`${SERVER_URL}/booking/byEstab/${establishmentId}?dateFrom=${dateFrom}&dateTo=${dateTo}&siteId=${siteId}&sport=${sport}`)
        .then(response => setBookings(response.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="w-[20rem] overflow-x-auto sm:w-full my-5">
            {!bookings.length ? 
            (<span>No hay resultado</span>) 
            :
            (
            <div>
                <table className="w-full border-collapse border border-slate-500 bg-slate-200">
                    <thead className="bg-white">
                    <tr>
                        <th className="border border-slate-600 px-10">Cod. Reserva</th>
                        <th className="border border-slate-600 px-10">Fecha</th>
                        <th className="border border-slate-600 px-10">Sede</th>
                        <th className="border border-slate-600 px-10">Cancha</th>
                        <th className="border border-slate-600">Deporte</th>
                        <th className="border border-slate-600 px-5">Importe</th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                    {bookings.map((e) => (
                        <tr key={e.external_reference} className="hover:bg-black">
                            <td className="border border-slate-700 py-2">{e.external_reference}</td>
                            <td className="border border-slate-700 py-2">{e.day}</td>
                            <td className="border border-slate-700 py-2">{e.siteName}</td>
                            <td className="border border-slate-700 py-2">{e.courtName}</td>
                            <td className="border border-slate-700 py-2">{e.sport}</td>
                            <td className="border border-slate-700 py-2">{e.finalAmount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            )}
            <Link to={{pathname:'/establishmentprofile', state:{visualInit: 'reporting', establishmentId:establishmentId}}}>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">
                Volver
              </button>
            </Link>
        </div>
    )
}