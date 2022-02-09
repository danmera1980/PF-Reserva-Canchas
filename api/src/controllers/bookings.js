const { User } = require("../db");

const getAllBookings = async (req, res, next) => {
    try {
     
      res.status(200).json('funciona la ruta!!');
    } catch (e) {
      next(e);
    }
  };
  
  const newBooking = async (req, res, next) => {
    try {
     const id = req.user.id

     console.log(id)

     
      res.status(200).json('toma una reserva wacho!');
    } catch (e) {
      next(e);
    }
  };
module.exports = {
    getAllBookings,
    newBooking,
    
    };
  