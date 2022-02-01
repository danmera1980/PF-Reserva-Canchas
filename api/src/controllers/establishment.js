const axios = require('axios');
const {Establishment, Headquarter} = require('../db');
const { createHeadquarter } = require('./headquarter');


const getEstablishmentsFromDB = async(searchBarName)=>{

    let establishmentDB = await Establishment.findAll({
        include: {
            model: Headquarter,
            attributes: ['name'],
            through:{
                attributes:[],
            }
        }
    })
    if(searchBarName!==''){
        establishmentDB = establishmentDB.filter(establishment => establishment.name.toLowerCase().includes(searchBarName));
    }

    establishmentDB = establishmentDB.map(establishment => {
        return{
            id: establishment.id,
            name: establishment.name,
            logoImage: establishment.logoImage,
            rating: establishment.rating,
            timeActiveFrom: establishment.timeActiveFrom,
            timeActiveTo: establishment.timeActiveTo,
            responsable_id: establishment.responsable_id,
            headquarters: establishment.headquarters
        }
    })

    return establishmentDB;
}


const createEstablishment = async function(id,name,logoImage,rating, timeActiveFrom, timeActiveTo, responsable_id, headquarters){

    // creo el establecimiento
    let establishmentCreated = await Establishment.create({
        id,
        name,
        logoImage,
        rating,
        timeActiveFrom,
        timeActiveTo,
        responsable_id
    })

    // headquarters va a ser un array de objetos.
    if(headquarters.length>0){
        headquarters.forEach(h => {
            createHeadquarter(id, h)
        })
    }

}

module.exports = {getEstablishmentsFromDB, createEstablishment}