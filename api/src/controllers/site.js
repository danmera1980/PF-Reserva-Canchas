const {Establishment, Site} = require('../db');

const createSite = async function (establishmentID, {name, country, city, street, streetNumber, latitude, longitude}){

    let establishmentDB = await Establishment.findOne({
        where : {id: establishmentID}
    })

    let siteCreated = await Site.create({
        name,
        country,
        city,
        street,
        streetNumber,
        latitude,
        longitude
    })

    establishmentDB.addSite(siteCreated);

}

module.exports = {createSite}