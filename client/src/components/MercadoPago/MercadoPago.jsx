import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import ReactLoading from 'react-loading';
const {SERVER_URL} = require('../../redux/actions/actionNames.js')



export default function MercadoPago(){

  const PUBLIC_KEY = 'TEST-6df9d926-e5fa-465e-9d9d-78207d113a0f';

  const [datos, setDatos] = useState("") // preferenceId

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
    axios
    .post("http://localhost:3001/mercadopago", input)
    .then((data)=>{
      setDatos({id:data})
      console.info('Contenido de data:', data.data)
    })
    .catch(err => console.error(err)) 
  },[])
  console.log('soy datos',datos)

  // SDK VERSION 1
  // useEffect(()=>{

  //   if(datos!==""){
  //     const script = document.createElement('script'); //Crea un elemento html script
    
  //     const attr_data_preference = document.createAttribute('data-preference-id') //Crea un nodo atribute
  //     attr_data_preference.value = datos.id  //Le asigna como valor el id que devuelve MP
    
  //     //Agrega atributos al elemento script
  //     script.src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";  
  //     script.setAttributeNode(attr_data_preference)  
    
  //     console.log(datos)
      
  //     //Agrega el script como nodo hijo del elemento form
  //     document.getElementById('form1').appendChild(script)
  //     return () =>{
  //       //Elimina el script como nodo hijo del elemento form
  //       document.getElementById('form1').removeChild(script);
  //     }
  //   }
    
  //  },[datos])


  // SDK VERSION 2
  useEffect(()=>{

    if(datos!==""){
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
            id: datos.id.data
          },
          render: {
            container: '.cho-container',
            label: 'Pagar Reserva',
          },
          openMode: 'modal',
        })
      });

    }
   },[datos])

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
        {!datos &&
          <div className="loading"><ReactLoading type="spin" color="#159D74" height={50} width={50} className="spin" /> </div>
        }
      </div>
    </div>
)
}

