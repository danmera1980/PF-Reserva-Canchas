import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
const {SERVER_URL} = require('../../redux/actions/actionNames.js')




export default function MercadoPago({booking}){

  const PUBLIC_KEY = 'TEST-6df9d926-e5fa-465e-9d9d-78207d113a0f';
  const [preferenceId, setPreferenceId] = useState("") // preferenceId



  /*
  chicos aca la info de la fecha mandenla como esta en el objeto que les pasa el back y en la ruta de crear el objeto les cuento como se hace para que se guarde bien la fecha sin tener problema con los time zones
  */
  const input = [booking]
  // [{
  //   userId: 1,
  //   courtId : 1,
  //   courtName: 'Cancha 6', 
  //   price: 250,
  //   startTime: "2022-02-22T15:30:00.000",
  //   endTime: "2022-02-22T16:30:00.000",
  //   status : 'created'
  // }]

  useEffect(()=>{
    axios
    .post(`${SERVER_URL}/mercadopago`, input)
    .then((data)=>{
      setPreferenceId(data.data)
    })
    .catch(err => console.error(err)) 
  },[])


  
  
  const [dateStart, hourStart] = input[0].startTime.split('T')
  const [dateEnd, hourEnd] = input[0].endTime.split('T')
 
  // SDK VERSION 2
  useEffect(()=>{

    if(preferenceId!==""){
      const script = document.createElement('script'); //Crea un elemento html script
      script.type = 'text/javascript';
      script.src="https://sdk.mercadopago.com/js/v2";  
      document.body.appendChild(script);
      
      script.addEventListener('load', () => {
        const mp = new window.MercadoPago(PUBLIC_KEY, {
          locale: 'es-AR'
        });
        const checkout = mp.checkout({
          preference: {
            id: preferenceId
          },
          render: {
            container: '.cho-container',
            label: 'Pagar',
          },
          openMode: 'modal',
        })
      });

    }
   },[preferenceId])

   return(
    <div>
      <h4 className="font-bold py-1 text-xl dark:text-white ">Detalle de la reserva</h4>
      <h2 className="font-bold py-1 text-l dark:text-white ">{input[0].courtName}</h2>
      {/* <h1 className="font-bold py-2  dark:text-white ">Fecha y Horario</h1>
      <h1 className="font-bold py-2  dark:text-white ">{hourStart.split('.',1)} a {hourEnd.split('.',1)} {dateStart}</h1> */}
      <h1 className="font-bold py-2  dark:text-white ">Total a pagar  {'$' + input[0].price}</h1>
      <div className="cho-container">
        {!preferenceId &&
          <div className="loading"><ReactLoading type="spin" color="#159D74" height={50} width={50} className="spin" /> </div>
        }
      </div>
    </div>
)
}

