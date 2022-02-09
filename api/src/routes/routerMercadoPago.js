
const { Router } = require('express');
const router = Router();
const port = 3000;

const {createOrder} = require('../controllers/mercadoPago')




router.post('/orders', createOrder);

// app.get('/api/mercadopago/ipn', (req, res) => {
//   if (req.params.type === 'payment') { // hay otros, nos importa solo payment
//     const paymentId = req.params.data.id; // ID de payment en MercadoPago
    
//     // Documentación de pagos: https://www.mercadopago.cl/developers/es/reference/payments/_payments_search/get/
//     mercadopago.payments.get(paymentId).then((error, payment) => {
//       // Obtenemos los datos del pago desde MP
//       const orderId = payment.external_reference; // esto es el ID de la orden que especificamos en la linea 15
      
//       // buscamos en nuestra db la orden
//       db.orders.find(orderId).then((order) => {

//         if (order.totalPrice === payment.transaction_amount) { // para que no se nos hagan los vivos XD
//           order.status = payment.status; // hay muchos estados, revisa https://www.mercadopago.cl/developers/es/reference/payments/_payments_search/get/
          
//           // comprobamos que sea "approved" y que no hayamos entregado ya el pedido... recuerda que "order" es algo que
//           // debes implementar tu, que podría tener un cambpo "delivered" para saber si ya hiciste entrega o no del
//           // pedido
//           if (order.status === 'approved' && !order.delivered) {
//             deliverOrder(order); // función ficticia que debes implementar... es básicamente "entregar" el producto
//           }
//         }
        
//       });
//     });
//   }
// });


module.exports = router