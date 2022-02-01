const {Establishment, Headquarter} = require('../db');

const createHeadquarter = async function (establishmentID, {name, country, city, street, streetNumber, latitude, longitude}){

    let establishmentDB = await Establishment.findOne({
        where : {id: establishmentID}
    })

    let headquarterCreated = await Headquarter.create({
        name,
        country,
        city,
        street,
        streetNumber,
        latitude,
        longitude
    })

    establishmentDB.addHeadquarter(headquarterCreated);

}

module.exports = {createHeadquarter}