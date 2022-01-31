const axios = require('axios');
const {Establishment, Headquarter} = require('../db');
const {API_KEY} = process.env

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


module.exports = {getEstablishmentsFromDB}