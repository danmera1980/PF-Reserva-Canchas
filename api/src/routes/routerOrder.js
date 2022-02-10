const router = require('express').Router();
const { Order , Order_detail, Court } = require('../db');

router.post('/', (req, res, next) => {
    console.log('req.body', req.body[0])
    const {  userId, courtId, courtName, courtPrice, timeActiveTo, date, status} = req.body[0]

    console.log('soy status',status)

    Order.create({
        userId: userId,
        status: status
    })
    .then(response => {
        (
            Court.findByPk(courtId)
              .then(cancha =>{
                const orderId = response.dataValues.id //nos da el id de order
                
                return Order_detail.create({
                    orderId: orderId,
                    name: cancha.name,
                    courtId: cancha.id,
                    quantity: 1,
                    price: cancha.price
                })
              })
                // .then(secondResponse => { //nos da el arreglo creado
                //     const cant = secondResponse.dataValues.quantity
                //     const prodId = secondResponse.dataValues.courtId
                //     Court.decrement(
                //         {stock: cant},
                //         { where: { id: prodId } }
                //     )
                // })
        )
        .then(order_detail => res.send(order_detail))
        .catch(err => next(err))
    })
});


router.get('/detalle/:id', (req, res, next) => {
    const id = req.params.id

    Order.findOne({
        where: {
          id: id,
        },
        include: {
            model: Order_detail,
            where: { orderId: id }
        }
    })
    .then(obj => {
        res.send(obj)
    })
    .catch(next)
});



module.exports = router;