const axios = require('axios');
const {Establishment, Site} = require('../db');
const { createSite } = require('./site');


const getEstablishmentsFromDB = async(searchBarName)=>{

    let establishmentDB = await Establishment.findAll({
        include: {
            model: Site,
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
            sites: establishment.sites
        }
    })

    return establishmentDB;
}


const createEstablishment = async function(id,name,logoImage,rating, timeActiveFrom, timeActiveTo, responsable_id, sites){

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

    // sites va a ser un array de objetos.
    if(sites.length>0){
        sites.forEach(h => {
            createSite(id, h)
        })
    }

}

module.exports = {getEstablishmentsFromDB, createEstablishment}