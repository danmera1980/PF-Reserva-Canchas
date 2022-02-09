import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
const {SERVER_URL} = require('../../redux/actions/actionNames.js')
const FORM_ID = 'payment-form';


export default function MercadoPago() {

  const order = {
    userId: 9,
    courtId: 1,
    description: 'cancha de futbol 5. césped sintético',
    price: 150,
    siteId: "a16eca65-df54-4ac5-8e4d-fa41e652abba",
    timeStart: '16:00'
  }  

  //const { id } = useParams(); // id de producto
  const id = order.courtId
  
  const [preferenceId, setPreferenceId] = useState('2345');

  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    axios.post(`${SERVER_URL}/mercadopago/orders`, order ).then((response) => {
      setPreferenceId(response.preferenceId);
    });
  }, [id]);

  // useEffect(() => {
  //   if (preferenceId) {
  //     // con el preferenceId en mano, inyectamos el script de mercadoPago
  //     const script = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src =
  //       'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
  //     script.setAttribute('data-preference-id', preferenceId);
  //     const form = document.getElementById(FORM_ID);
  //     form.appendChild(script);
  //   }
  // }, [preferenceId]);

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';

      // SDK MercadoPago.js V2
      script.src = "https://sdk.mercadopago.com/js/v2";


      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);




  return (
    <form id={FORM_ID} method="GET" />
  );
}