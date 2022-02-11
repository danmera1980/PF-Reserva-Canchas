const { date } = require("joi");
const { User, Booking, Court } = require("../db");
const {DB_HOST} = process.env

const getAllBookings = async (req, res, next) => {
  try {
    const all = await Booking.findAll({
      where: {
        startTime: "2022-02-13T19:00:00.000Z",

      }
    })

    res.status(200).json(all)
  } catch (e) {
    next(e);
  }
};

// const newBooking = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     let { infoBooking } = req.body;

//     infoBooking.userId = userId;
//     // si horario de inicio y cancha coinciden con alguno creado dar error
//     // console.log(infoBooking.startTime)
//     // const itsNotAvailable = await Booking.findOne({
//     //   where: {
//     //     startTime: infoBooking.startTime,
//     //     courtId: infoBooking.courtId
//     //   } 
//     // });
//     // console.log(itsNotAvailable);
//     // if (itsNotAvailable) {
//     //   res.status(409).send("Conflict - There is a previous booking scheduled");
//     // // 
//     // "startTime": "2022-02-13T18:30:00.000Z",
//     // "endTime": "2022-02-13T19:00:00.000Z",
//     // "description": "aca van las aclaraciones q quiera hacer el user",
//     // "courtId": 1,
//     // "finalAmount": 50

//     const newBooking = await Booking.create(infoBooking);
//     console.log(newBooking.startTime.getHours());
//     res.status(200).json(newBooking);
//   } catch (e) {
//     next(e);
//   }
// };

const newBooking = async (req, res, next) => {

    console.info("EN LA RUTA PAGOS ", req)

    const userId = req.params.userId;    
    const courtId = req.params.courtId
    const price = req.params.price
    // const startTime = req.query.startTime
    // const endTime = req.query.endTime
    const payment_id= req.query.payment_id;
    const payment_status= req.query.status;
    const external_reference = req.query.external_reference;
    const merchant_order_id= req.query.merchant_order_id;
    console.log("EXTERNAL REFERENCE ", external_reference);

    Booking.create({
      courtId: courtId,
      userId: userId,
      status: 'completed',
      finalAmount : price,
      // startTime : startTime,
      // endTime : endTime,
      payment_id: payment_id,
      payment_status: payment_status,
      merchant_order_id: merchant_order_id
    })
    .then((booking) => {
      console.log(booking)
      console.info('redirect success')
      return res.redirect(`http://${DB_HOST}:3000/profile`)
    })
    .catch(err =>{
      console.error('error al buscar', err)
      return res.redirect(`http://${DB_HOST}:3000/payment`)
    })

};


const getCourtAvailability = async (req, res, next) => {
  try {
    /*
    buscar el horarios apertura y cierre del establ
    la duracion del turno del court
    dividir las horas abiertas por la duracion de los turno y me da cuantos slots son
     y ahi recien armar de cada uno con start and finish time and isAvailable
     buscar por id de cancha las reservas y a los slot que esten ocupados ponerles el available en false
**ver de trabajar con minutos ver de traducir de minutos a  horas

     y devolver una lista de cada uno
    
    
    */
    res.status(200).json("funciona la ruta!!");
  } catch (e) {
    next(e);
  }
};
module.exports = {
  getAllBookings,
  newBooking,
  getCourtAvailability
};
