const { date } = require("joi");
const { User, Establishment, Site, Court, Booking, Op } = require("../db");
const { Booking } = require("../db");
const { DB_HOST } = process.env;

const getAllBookings = async (req, res, next) => {
  try {
    const all = await Booking.findAll();

    res.status(200).json(all);
  } catch (e) {
    next(e);
  }
};

const newBooking = async (req, res, next) => {
  console.log(" soy req.params", req.params);

  const userId = req.params.userId;
  const courtId = req.params.courtId;
  const price = req.params.price;
  const startTime = new Date(req.params.startTime);
  const endTime = new Date(req.params.endTime);
  const payment_id = req.query.payment_id;
  const payment_status = req.query.status;
  const external_reference = req.query.external_reference;
  const merchant_order_id = req.query.merchant_order_id;

  /*
     ESTO ES IMPORTANTE PARA CREAR BIEN LA RESERVA CON EL FORMATO DATE EN LA BASE DE DATOS
     posiblemente les haya funcionado porque el string que tienen se los pase como debe ser pero no esta bueno mandarle asi y aca los meses se enumeran distinto es una cosa loca lo que van a tener que hacer es lo que sigue:
     
  CUANDO RECIBAN EL OBJETO QUE MANDA EL FRON CON year, month, date, y startTime hay que separar si o si el estar time en hora y minutos con un split y crear la fecha asi:
  
  let startTime = new Date (year, month, date, hour, minute, 00)

  agreguen los ceros que son re importantes para la comparacion de si hay canchas disponibles
  lo mismo para el endTime si les falla manden mensaje y vemos que onda eso si o si tiene que ser en el backen porque el servidor es el que hace eso
     
     */

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
  })
    .then((booking) => {
      console.log(booking);
      console.info("redirect success");
      return res.redirect(`http://${DB_HOST}:3000/profile`);
    })
    .catch((err) => {
      console.log("error al buscar", err);
      return res.redirect(`http://${DB_HOST}:3000/payment`);
    });
};

const getCourtAvailability = async (req, res, next) => {
  try {
    //     buscar el horarios apertura y cierre del establ
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
    //     la duracion del dia de trabajo del court en minutos
    let businessHoursInMinutes = activeTo - activeFrom;
    //     dividir las horas abiertas por la duracion de los turno y me da cuantos slots son
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
      //calcular inicio fin crear fecha ver si esta disponivble y  pushear el objeto con las 3 cosas
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
module.exports = {
  getAllBookings,
  newBooking,
  getCourtAvailability,
};
