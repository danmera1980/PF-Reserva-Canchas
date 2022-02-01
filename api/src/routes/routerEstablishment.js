const { Router } = require('express');
const router = Router();
const {User} = require('../db');
const {getEstablishmentsFromDB, createEstablishment} = require('../controllers/establishment.js');

router.post('/', async(req, res)=>{
    let = {
        id,
        name,
        logoImage,
        rating,
        timeActiveFrom,
        timeActiveTo,
        responsable_id,
        sites
    } = req.body;

    // con esto revisaría si el usuario que estoy asignando como responsable existe en la DB.
    // En realidad deberíamos ver cómo traer el ID del usuario que tiene la sesión abierta
    // let userResponsable = await User.findOne({
    //     where : {id: responsable_id}
    // })

    // if(userResponsable){
        try {
            createEstablishment(id,name,logoImage,rating, timeActiveFrom, timeActiveTo, responsable_id, sites)
            res.status(200).send('establishment succesfully created')  
        } catch (error) {
            res.status(404).send('establishment cannot be created')
        }
    // }
    // else{
    //     res.status(404).send('this user cannot create establishment')
    // }
    





})



module.exports = router