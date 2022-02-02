const {Establishment, Site} = require('../db');

const createSite = async (req, res, next)=>{

    const {establishmentId, name, country, city, street, streetNumber, latitude, longitude} = req.body

    let establishmentDB = await Establishment.findOne({
        where : {id: establishmentId}
    })

    let siteDB = await Site.findOne({
        where: {
            name: name,
            establishmentId: establishmentId
        }
    })

    try {
        if(!siteDB){
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
            
            res.send('site created')
        }
        else{
            res.status(404).send('site already exist')
        }    
    } catch (error) {
        next(error)
    }
    
}

const findByLocation = async (req, res) =>{
    const {location} = req.query.location
    try {
      const results = await Site.findAll({
        where:{
          city: location
        }
      })
      res.send(results)
    } catch (e) {
      console.log(e)
    }
}

module.exports = {createSite, findByLocation}
