
const { Order} = require('../db.js');
const router = require('express').Router();
const {DB_HOST} = process.ev

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN
});


//Ruta que genera la URL de MercadoPago
router.post("/", async (req, res, next) => {

    const { userId, courtId, courtName, courtPrice, timeActiveTo, date, status} = req.body[0]

    // Crea un objeto de preferencia
    let preference = {
        items: [{title: courtName+' '+date+' '+timeActiveTo, unit_price:courtPrice, quantity:1  }],
        external_reference : courtName+' '+date+' '+timeActiveTo,
        payment_methods: {
        excluded_payment_types: [
            {id: "atm"},
            {id: "ticket"}
        ],
        installments: 3  //Cantidad máximo de cuotas
        },
        back_urls: {
            success: `http://${DB_HOST}:3001/mercadopago/pagos/${userId}/${courtId}`,
            failure: `http://${DB_HOST}:3000/payment`,
            pending: `http://${DB_HOST}:3000/payment`,
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
}) 


//Ruta que recibe la información del pago
router.get("/pagos/:userId/:courtId", (req, res)=>{
    console.info("EN LA RUTA PAGOS ", req)
    const {userId, courtId} = req.params;
    const payment_id= req.query.payment_id;
    const payment_status= req.query.status;
    const external_reference = req.query.external_reference;
    const merchant_order_id= req.query.merchant_order_id;
    console.log("EXTERNAL REFERENCE ", external_reference);

    Order.create({
      courtId:courtId,
      userId: userId,
      status: 'completed',
      payment_id: payment_id,
      payment_status:payment_status,
      merchant_order_id:merchant_order_id
    })
    .then((order) => {
      console.log(order)
      console.info('redirect success')
      return res.redirect(`http://${DB_HOST}:3000/profile`)
    })
    .catch(err =>{
      console.error('error al buscar', err)
      // return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
      return res.redirect(`http://${DB_HOST}:3000/payment`)
    })



    //WANDA Aquí edito el status de mi orden
    // Order.findByPk(external_reference)
    // .then((order) => {
    //     order.payment_id= payment_id
    //     order.payment_status= payment_status
    //     order.merchant_order_id = merchant_order_id
    //     order.status = "completed"
    //     console.info('Salvando order')
    //     order.save()
    //     .then((_) => {
    //     console.info('redirect success')
        
    //     return res.redirect("http://localhost:3000")
    //     })
    //     .catch((err) =>{
    //     console.error('error al salvar', err)
    //     return res.redirect(`http://localhost:3000/?error=${err}&where=al+salvar`)
    //     })
    // })
    // .catch(err =>{
    //     console.error('error al buscar', err)
    //     return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
    // })

    //proceso los datos del pago 
    //redirijo de nuevo a react con mensaje de exito, falla o pendiente
})


//Busco información de una orden de pago
router.get("/pagos/:id", (req, res)=>{
  const mp = new mercadopago(ACCESS_TOKEN)
  const id = req.params.id
 // console.info("Buscando el id", id)
  mp.get(`/v1/payments/search`, {'status': 'pending'}) //{"external_reference":id})
  .then(resultado  => {
    console.info('resultado', resultado)
    res.jsonp({"resultado": resultado})
  })
  .catch(err => {
    console.error('No se consulto:', err)
    res.json({
      error: err
    })
  })
})

module.exports = router;