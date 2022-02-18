import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { SERVER_URL } from "../../redux/actions/actionNames";
import Swal from "sweetalert2";

export default function ReportingResults() {
    const location = useLocation()
    const {input} = location.state;
    const establishmentId = input.establishmentId;
    const dateFrom = input.dateFrom?input.dateFrom:"";
    const dateTo = input.dateTo?input.dateTo:"";
    const siteId = input.siteId?input.siteId:"";
    const sport = input.sport?input.sport:"";

    const [data, setData] = useState({})
    useEffect(()=>{
        axios.get(`${SERVER_URL}/booking/byEstab/${establishmentId}?dateFrom=${dateFrom}&dateTo=${dateTo}&siteId=${siteId}&sport=${sport}`)
        .then(response => setData(response.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    console.log(data)


    return (
        <div>
            
        </div>
    )
}