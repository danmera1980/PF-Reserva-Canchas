import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import axios from 'axios';
const {SERVER_URL} = require('../../redux/actions/actionNames.js')

export default function CreateOrder(){

    const input = [{
        userId : 7,
        courtId : 1,
        courtName: 'Cancha 3', 
        courtPrice: 150,
        timeActiveTo: '16:00',
        date: '03-04-2022',
        status : 'created'
    }]

    useEffect(()=>{
        const orderId = axios.post(`${SERVER_URL}/order`, input).then(response => response.data.orderId).then(id => console.log(id))
    },[])
    
    

    return(
        <Link to='/mercadopago'>Ir a mercadopago.js</Link>
    )
    
}