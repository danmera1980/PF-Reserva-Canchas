const { User, Establishment, Site, Court, Booking, Op } = require("../db");
const { DB_HOST, TUCANCHAYAMAIL, TUCANCHAYAMAILPASS } = process.env;
const nodemailer = require("nodemailer");

const getAllBookings = async (req, res, next) => {
  try {
    const all = await Booking.findAll();

    res.status(200).json(all);
  } catch (e) {
    next(e);
  }
};

const newBooking = async (req, res, next) => {
  const userId = req.params.userId;
  const courtId = req.params.courtId;
  const price = req.params.price;
  const startTime = new Date(req.params.startTime);
  const endTime = new Date(req.params.endTime);
  const payment_id = req.query.payment_id;
  const payment_status = req.query.status;
  const external_reference = req.query.external_reference;
  const merchant_order_id = req.query.merchant_order_id;

  console.log(userId);

  /*
     ESTO ES IMPORTANTE PARA CREAR BIEN LA RESERVA CON EL FORMATO DATE EN LA BASE DE DATOS
     posiblemente les haya funcionado porque el string que tienen se los pase como debe ser pero no esta bueno mandarle asi y aca los meses se enumeran distinto es una cosa loca lo que van a tener que hacer es lo que sigue:
     
  CUANDO RECIBAN EL OBJETO QUE MANDA EL FRONT CON year, month, date, y startTime hay que separar si o si el estar time en hora y minutos con un split y crear la fecha asi:
  
  let startTime = new Date (year, month, date, hour, minute, 00)

  agreguen los ceros que son re importantes para la comparación de si hay canchas disponibles
  lo mismo para el endTime si les falla manden mensaje y vemos que onda eso si o si tiene que ser en el backend porque el servidor es el que hace eso
     
     */
  let code = randomString(8);

  Booking.create({
    courtId: courtId,
    userId: userId,
    status: "completed",
    finalAmount: price,
    startTime: startTime,
    endTime: endTime,
    payment_id: payment_id,
    payment_status: payment_status,
    merchant_order_id: merchant_order_id,
    external_reference: external_reference,
    code: code,
  })
    .then((booking) => {
      console.log(booking);
      console.info("redirect success");
      return res.redirect(`http://localhost:3000/profile`);
    })
    .catch((err) => {
      console.log("error al buscar", err);
      return res.redirect(`http://localhost:3000/payment`);
    });
};

//this code needs reviewing and modularizing (i know ill get to it when i get to it)
const getCourtAvailability = async (req, res, next) => {
  try {
    //     buscar el horarios apertura y cierre del establecimiento
    const courtId = req.params.id;
    const dateToCheck = req.query.date;
    const infoCourt = await Court.findOne({
      where: { id: courtId },
      include: [
        {
          model: Site,
          as: "site",
          attributes: ["id", "street", "streetNumber"],
          include: {
            model: Establishment,
            as: "establishment",
            attributes: ["timeActiveFrom", "timeActiveTo"],
          },
        },
      ],
    });

    let [activeFromHour, activeFromMin] =
      infoCourt.site.establishment.timeActiveFrom.split(":");
    let [activeToHour, activeToMin] =
      infoCourt.site.establishment.timeActiveTo.split(":");

    //calculo el largo del dia de trabajo en minutos de inicio y de fin
    activeTo = parseInt(activeToHour) * 60 + parseInt(activeToMin);
    activeFrom = parseInt(activeFromHour) * 60 - parseInt(activeFromMin);
    console.log(activeTo, "activeto");
    //     la duración del dia de trabajo del court en minutos
    let businessHoursInMinutes = activeTo - activeFrom;
    //     dividir las horas abiertas por la duración de los turno y me da cuantos slots son
    //2022-02-12 con esta fecha traer las reservas de esa cancha
    //traer el el dia completo de reservas de esa cancha
    let [year, month, day] = dateToCheck.split("-");
    let searchFromDate = new Date(year, month - 1, day);
    let searchToDate = new Date(year, month - 1, day, 23, 59);
    console.log(searchFromDate, searchToDate);
    const dayBookings = await Booking.findAll({
      where: {
        [Op.and]: [
          {
            courtId: infoCourt.id,
          },
          {
            startTime: {
              [Op.between]: [searchFromDate, searchToDate],
            },
          },
        ],
      },
    });
    console.log("reservas del dia", dayBookings);
    let slotsQuantity = businessHoursInMinutes / infoCourt.shiftLength;
    console.log("cantidad de turnos en el dia", slotsQuantity);
    let availability = [];

    // console.log(dayBookings)
    for (let i = 0; i < slotsQuantity; i++) {
      let startSlotMin = activeFrom + i * infoCourt.shiftLength;
      let endSlotMin = startSlotMin + infoCourt.shiftLength;

      let start = minutesToHour(startSlotMin);
      let end = minutesToHour(endSlotMin);
      let [stHour, stMin] = start.split(":");

      let compareDate = new Date(year, month - 1, day, stHour, stMin, 00);
      //console.log('comparo aca', (compareDate.getTime()) === dayBookings[0].startTime.getTime())

      let available = dayBookings.filter(
        (el) => el.startTime.getTime() === compareDate.getTime()
      );
      //calcular inicio fin crear fecha ver si esta disponible y  pushear el objeto con las 3 cosas
      // slots.push({})
      let isAvailable = available.length ? false : true;
      availability.push({
        date: {
          year,
          month,
          day,
        },
        startTime: start,
        endTime: end,
        isAvailable: isAvailable,
      });
    }

    res.status(200).json([dayBookings, availability]);
  } catch (e) {
    next(e);
  }
};

function minutesToHour(min) {
  let newMin = min % 60 ? min % 60 : "00";
  let newHour = (min - newMin) / 60;

  return newHour + ":" + newMin;
}
function randomString(length) {
  var result = Array(length)
    .fill(0)
    .map((x) => Math.random().toString(32).charAt(2))
    .join("");
  return result;
}

async function emailSender(userId, code) {
  const userData = await User.findOne({ where: { id: userId } });

  let contentHTML = `
  <h3>Hola, ${userData.name}!</h3>

  <p> Gracias por usar nuestro servicio de reservas. Acercate con tu codigo de reserva a la cancha</p>
  <h2>&#9917; ${code} &#9917;</h2>
  `;
  let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, // sin SSL
    auth: {
      user: TUCANCHAYAMAIL, // generated ethereal user
      pass: TUCANCHAYAMAILPASS, // generated ethereal password
    },
  });

  const response = await transporter.sendMail({
    from: "'Tu Cancha YA!' <tucanchaya@noresponse.com>",
    to: `${userData.email}`,
    subject: "Codigo de reserva",
    html: contentHTML,
  });

  console.log(response);
}
const prueba = async (req, res, next) => {
  let code = randomString(8);
  emailSender(1, code);
  res.send("funciona");
};
const courtBookings = async (req, res, next) => {
  const { courtId } = req.params;
  try {
    const courtBooking = await Court.findAll({
      where: { id: courtId },
    });

    res.send(courtBooking)
  } catch (error) {
    next(error);
  }
}
;

module.exports = {
  getAllBookings,
  newBooking,
  getCourtAvailability,
  courtBookings
};
