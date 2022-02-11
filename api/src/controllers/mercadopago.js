const {Order} = require('../db');
const {DB_HOST} = process.env


// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN
});

// const createPreference = async (req, res, next) => {

//     const { userId, courtId, courtName, courtPrice, timeActiveTo, date, status} = req.body[0]

//     // Crea un objeto de preferencia
//     let preference = {
//         items: [{title: courtName+' '+date+' '+timeActiveTo, unit_price:courtPrice, quantity:1  }],
//         external_reference : courtName+' '+date+' '+timeActiveTo,
//         payment_methods: {
//         excluded_payment_types: [
//             {id: "atm"},
//             {id: "ticket"}
//         ],
//         installments: 1  //Cantidad máximo de cuotas
//         },
//         back_urls: {
//             success: `http://${DB_HOST}:3001/mercadopago/pagos/${userId}/${courtId}`,
//             failure: `http://${DB_HOST}:3000/payment`, //corregir para que redireccione al componente donde elije horario
//             pending: `http://${DB_HOST}:3000/payment`, //corregir para que redireccione al componente donde elije horario
//         },
//         auto_return: 'approved',
//         binary_mode: true
//     };

//     mercadopago.preferences.create(preference)

//     .then(function(response){
    
//     //Este valor reemplazará el string"<%= global.id %>" en tu HTML
//         global.id = response.body.id;
//         res.send(global.id);
//     })
//     .catch(function(error){
//         console.log(error);
//     })
// }

const createPreference = async (req, res, next) => {

  let {userId, courtId, courtName, price, startTime, endTime, status} = req.body[0]

  console.log('creando la preferencia, aca esta lo q recibo por body',req.body)
  startTime = new Date(startTime)
  endTime = new Date(endTime)
  const day = startTime.toLocaleDateString().split('/').join('-')
console.log('hora de inicio y de final', startTime,endTime)

  const date =day+', '+startTime.getHours()+':'+startTime.getMinutes()+'-'+endTime.getHours()+':'+endTime.getMinutes()

  const bookingId = Math.floor(1000 + Math.random() * 9000)
//   startTime = startTime.toString()
//   endTime = endTime.toString()
//   console.log('hora de inicio y de final', startTime,endTime)
  // Crea un objeto de preferencia
  let preference = {
      items: [{title: courtName+': '+date, unit_price: price, quantity:1  }],
      external_reference : bookingId.toString(),
      payment_methods: {
      excluded_payment_types: [
          {id: "atm"},
          {id: "ticket"}
      ],
      installments: 1  //Cantidad máximo de cuotas
      },
      back_urls: {
          success: `http://${DB_HOST}:3001/booking/new/${userId}/${courtId}/${price}/`,
          failure: `http://${DB_HOST}:3000/establishmentProfile`, //corregir para que redireccione al componente donde elije horario
          pending: `http://${DB_HOST}:3000/`, //corregir para que redireccione al componente donde elije horario
      },
      auto_return: 'approved',
      binary_mode: true
  };

  mercadopago.preferences.create(preference)

  .then(function(response){
  
  //Este valor reemplazará el string"<%= global.id %>" en tu HTML
      global.id = response.body.id;
      res.send(global.id);
  })
  .catch(function(error){
      console.log(error);
  })
}

// const createOrder = (req, res)=>{
//     console.info("EN LA RUTA PAGOS ", req)
//     const {userId, courtId} = req.params;
//     const payment_id= req.query.payment_id;
//     const payment_status= req.query.status;
//     const external_reference = req.query.external_reference;
//     const merchant_order_id= req.query.merchant_order_id;
//     console.log("EXTERNAL REFERENCE ", external_reference);

//     Order.create({
//       courtId:courtId,
//       userId: userId,
//       status: 'completed',
//       payment_id: payment_id,
//       payment_status:payment_status,
//       merchant_order_id:merchant_order_id
//     })
//     .then((order) => {
//       console.log(order)
//       console.info('redirect success')
//       return res.redirect(`http://${DB_HOST}:3000/profile`)
//     })
//     .catch(err =>{
//       console.error('error al buscar', err)
//       // return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
//       return res.redirect(`http://${DB_HOST}:3000/payment`)
//     })
// }

module.exports = {createPreference}