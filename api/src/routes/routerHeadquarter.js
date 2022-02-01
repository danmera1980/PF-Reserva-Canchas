const { Router } = require('express');
const router = Router();
const {Establishment, Headquarter} = require('../db');
const {createHeadquarter} = require('../controllers/headquarter')

router.post('/', async(req, res)=>{
    let = {
        establishmentID,
        name,
        country,
        city,
        street,
        streetNumber,
        latitude,
        longitude
    } = req.body;

    // con esto revisaría si el establecimiento que estoy asignando como responsable existe en la DB.
    // En realidad deberíamos ver cómo traer el ID de un establecimiento del usuario que tiene la sesión abierta.
    // podría ser con un select en el front
    let establishmentExist = await Establishment.findOne({
        where : {id: establishmentID}
    })

    if(establishmentExist){
        try {
            createHeadquarter(establishmentID, {name, country, city, street, streetNumber, latitude, longitude})
            res.status(200).send('headquarter succesfully created')  
        } catch (error) {
            res.status(404).send('headquarter cannot be created')
        }
    }
    else{
        res.status(404).send('this user cannot create headquarter for this establishment')
    }
    
})

module.exports = router