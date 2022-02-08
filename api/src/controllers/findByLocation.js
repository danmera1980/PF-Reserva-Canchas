const { Court, Site, Establishment, Op} = require ('../db');

const findByLocation = async (req, res) => { 
    const {location} = req.query

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
          '$sites.latitude$': {
            [Op.lte]: location
          },
        }
      })
      res.send(establishments)
    } catch (e) {
      console.log(e)
      res.send(e)
    }
}

module.exports= { findByLocation }