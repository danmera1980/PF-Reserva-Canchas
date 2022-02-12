const { date } = require("joi");
const {Booking} = require("../db");
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

const newBooking = async (req, res, next) => {

  console.log(' soy req.params',req.params)

  const userId = req.params.userId;    
  const courtId = req.params.courtId
  const price = req.params.price
  const startTime = new Date(req.params.startTime)
  const endTime = new Date(req.params.endTime)
  const payment_id= req.query.payment_id;
  const payment_status= req.query.status;
  const external_reference = req.query.external_reference;
  const merchant_order_id= req.query.merchant_order_id;
  
  Booking.create({
    courtId: courtId,
    userId: userId,
    status: 'completed',
    finalAmount : price,
    startTime : startTime,
    endTime : endTime,
    payment_id: payment_id,
    payment_status: payment_status,
    merchant_order_id: merchant_order_id,
    external_reference: external_reference
  })
  .then((booking) => {
    console.log(booking)
    console.info('redirect success')
    return res.redirect(`http://${DB_HOST}:3000/profile`)
  })
  .catch(err =>{
    console.log('error al buscar', err)
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
