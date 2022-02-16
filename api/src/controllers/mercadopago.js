const { DB_HOST } = process.env;

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const createPreference = async (req, res, next) => {
  let { userId, courtId, courtName, price, startTime, endTime } = req.body[0];

  startTimeDate = new Date(startTime);
  endTimeDate = new Date(endTime);
  const day = startTimeDate.toLocaleDateString().split("/").join("-");

  const date =
    day +
    ", " +
    startTimeDate.getHours() +
    ":" +
    startTimeDate.getMinutes() +
    "-" +
    endTimeDate.getHours() +
    ":" +
    endTimeDate.getMinutes();

  const bookingId = Math.floor(1000 + Math.random() * 9000).toString();
  console.log('bookingId', bookingId)
  // Crea un objeto de preferencia
  let preference = {
    items: [{ title: courtName + ": " + date, unit_price: price, quantity: 1 }],
    external_reference: bookingId,
    payment_methods: {
      excluded_payment_types: [{ id: "atm" }, { id: "ticket" }],
      installments: 1, //Cantidad máximo de cuotas
    },
    back_urls: {
      success: `http://${DB_HOST}:3001/booking/new/${userId}/${courtId}/${price}/${startTime}/${endTime}`,
      // success: `http://${DB_HOST}:3000/profile`,
      failure: `http://${DB_HOST}:3000/`, //corregir para que redireccione al componente donde elije horario
      pending: `http://${DB_HOST}:3000/`, //corregir para que redireccione al componente donde elije horario
    },
    auto_return: "approved",
    // notification_url : `http://${DB_HOST}:3001/mercadopago/notification/${bookingId}`,
    notification_url : `https://hook.integromat.com/kvszyshluvxl2w24hi0c3j1homkfpmfa?startTime=${startTime}`,
    binary_mode: true,
  };

  mercadopago.preferences
    .create(preference)

    .then(function (response) {
      //Este valor reemplazará el string"<%= global.id %>" en tu HTML
      global.id = response.body.id;
      res.send(global.id);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const notification = async (req,res) => {
  try {
    console.log('req.query', req.query);

    const { 'data.id':ID_PAGO , type, topic, id } = req.query;

    if (type === 'payment') {
        console.log(`ES UN PAGO, LA ID ES ${ID_PAGO}`);

        let result = await axios.get(`https://api.mercadopago.com/v1/payments/${ID_PAGO}?access_token=${ACCESS_TOKEN}`);
        console.log(result)
        if (result.data.status == "approved") {
            console.log("APROBADO");
            // const orderID = result.data.order.id;
            // console.log("BUSCANDO ORDEN");
            // let resultOrden = await axios.get(`https://api.mercadopago.com/merchant_orders/${orderID}`);
            // const itemId = resultOrden.data.items[0].id;
            // console.log(`ÒRDEN : ${resultOrden.data.items[0]}`)
            // const update = await completarPago(itemId);
            
            // if(update.success) {
            //     console.log("SE actualizo correctamente");
            // }
        }
    }
    if (topic === 'merchant_order') {
        console.log(`ES UNA ORDEN, LA ID ES: ${id}`);
    }

  } catch (error) {
      console.log(error);
  }
  return res.sendStatus(201)
}

module.exports = { createPreference, notification };
