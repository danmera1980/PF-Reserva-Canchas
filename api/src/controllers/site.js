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

const findByLocation = () =>{
    const {location} = req.query.location
    try {
      const results = await Headquarter.findAll({
        where:{
          city: location
        }
      })
      res.send(results)
    } catch (e) {
      console.log(e)
    }
}

module.exports = {createHeadquarter, findByLocation}