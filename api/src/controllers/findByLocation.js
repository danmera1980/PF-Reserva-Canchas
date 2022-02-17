const { Court, Site, Establishment, Op} = require ('../db');

const findByLocation = async (req, res) => { 
  
    var {latitude, longitude, sport, zoom } = req.query
    // lat: 0.273323
    // lng: 0.150562
    // const amplLat =  0.273323 
    // const amplLng =  0.150562 
    const amplLat =  0.573323 
    const amplLng =  0.550562 

    try {
      var establishments = await Establishment.findAll({
        include:{
          model: Site,
          as: 'sites',
          include:{
            model: Court,
            as: 'courts'
          }
        },
        
        where:{
          [Op.and]: [
            {'$sites.latitude$': {[Op.lte]: parseFloat(latitude) + amplLat }},
            {'$sites.latitude$': {[Op.gte]: parseFloat(latitude) - amplLat}},
            {'$sites.longitude$': {[Op.lte]: parseFloat(longitude) + amplLng }},
            {'$sites.longitude$': {[Op.gte]: parseFloat(longitude) - amplLng }},
            sport.length?{'$sites.courts.sport$':  sport }:null
           ]
          // {'$sites.courts.sport$': {[Op.like]:'%' + sport + '%'}}
          // '$sites.latitude$': {[Op.lte]: latitude},
          // '$sites.longitude$': { [Op.gt]: longitude}
        }
      })
      res.send(establishments)
    } catch (e) {
      console.log(e)
      res.send(e)
    }
}

module.exports= { findByLocation }