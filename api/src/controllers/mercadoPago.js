const {Order} = require('../db');
const mercadopago = require ('mercadopago');
const {DB_HOST} = process.env
const {ACCESS_TOKEN } = process.env
mercadopago.configure({
    access_token: ACCESS_TOKEN
  });


const createOrder = async (req, res) => {
    /* aquí crea tu orden en la DB para el usuario logeado */

  const  { userId, courtId, description, price, siteId, timeStart} = req.body  

    const order = await Order.create({price: price}); // <--- pseudo-código

    console.log(order)
  
    // Ahora le decimos a MP que cree la "preferencia". Asume que "order" tiene datos del producto
    mercadopago.preferences.create({
      external_reference: order.dataValues.id.toString(),
    //   notification_url: `${DB_HOST}/api/mercadopago/ipn`,
      items: [
        {
          title: 'Reserva',
          unit_price: order.dataValues.price,
          quantity: 1,
        }
      ]
    }).then((preference) => {
      res.json({ preferenceId: preference.id });
    });
}



module.exports= { createOrder };