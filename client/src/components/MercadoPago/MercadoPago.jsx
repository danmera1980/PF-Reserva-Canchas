import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
const {SERVER_URL} = require('../../redux/actions/actionNames.js')




export default function MercadoPago(){

  const PUBLIC_KEY = 'TEST-6df9d926-e5fa-465e-9d9d-78207d113a0f';

  const userId = useSelector(state => state.users.userDetails.id)
  const [preferenceId, setPreferenceId] = useState("") // preferenceId

  const input = [{
    userId : userId,
    courtId : 3,
    courtName: 'Cancha 3', 
    courtPrice: 180,
    timeActiveTo: '16:00',
    date: '03-04-2022',
    status : 'created'
  }]

  useEffect(()=>{
    axios
    .post("http://localhost:3001/mercadopago", input)
    .then((data)=>{
      // setPreferenceId({id:data})
      setPreferenceId(data.data)
      console.info('Contenido de data:', data.data)
    })
    .catch(err => console.error(err)) 
  },[])
  

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
            label: 'Pagar Reserva',
          },
          openMode: 'modal',
        })
      });

    }
   },[preferenceId])

   return(
    <div>
      <form id='form1'>
        <h4>Checkout</h4>
        <div > Detalle de la reserva 
                  <ul>
                    <li>{input[0].courtName}</li>
                    <li>{'$' + input[0].courtPrice}</li> 
                    <li>{input[0].date+''+input[0].timeActiveTo}</li>
                  </ul>
        </div>   
      </form>
      <div className="cho-container">
        {!preferenceId &&
          <div className="loading"><ReactLoading type="spin" color="#159D74" height={50} width={50} className="spin" /> </div>
        }
      </div>
    </div>
)
}

