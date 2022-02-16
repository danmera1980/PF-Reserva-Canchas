const { Router } = require("express");
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth')
const { getAllBookings, newBooking, getCourtAvailability, prueba } = require("../controllers/booking");

const router = Router();

router.get("/", getAllBookings);
router.get("/availability/:id", getCourtAvailability);
router.get("/prueba", prueba);

// tratar de ver esto con Dan
router.get('/new/:userId/:courtId/:price/:startTime/:endTime', newBooking)
module.exports = router;
