const { DB_HOST } = process.env;

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const createPreference = async (req, res, next) => {
  let { userId, courtId, courtName, price, startTime, endTime } =
    req.body[0];

  console.log(req.body)

  console.log('startTime',startTime)
  console.log('typeof startTime',typeof startTime)

  startTimeDate = new Date(startTime);
  console.log('startTimeDate',startTimeDate)
  endTimeDate = new Date(endTime);
  const day = startTimeDate.toLocaleDateString().split("/").join("-");

  console.log('day', day)
  console.log('typeof day',typeof day)

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

  const bookingId = Math.floor(1000 + Math.random() * 9000);
  // Crea un objeto de preferencia
  let preference = {
    items: [{ title: courtName + ": " + date, unit_price: price, quantity: 1 }],
    external_reference: bookingId.toString(),
    payment_methods: {
      excluded_payment_types: [{ id: "atm" }, { id: "ticket" }],
      installments: 1, //Cantidad máximo de cuotas
    },
    back_urls: {
      success: `http://${DB_HOST}:3001/booking/new/${userId}/${courtId}/${price}/${startTime}/${endTime}`,
      failure: `http://${DB_HOST}:3000/`, //corregir para que redireccione al componente donde elije horario
      pending: `http://${DB_HOST}:3000/`, //corregir para que redireccione al componente donde elije horario
    },
    auto_return: "approved",
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

module.exports = { createPreference };
