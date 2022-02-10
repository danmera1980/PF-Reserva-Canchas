const { Court, Site, Establishment} = require ('../db');

const findBySport = async (req, res) => { 
    const {sport} = req.query
    try {
      var establishments = await Establishment.findAll({
        include:{
          model: Site,
          as: 'sites',
          include:{
            model: Court,
            as: 'courts',
          }
        },
        where:{
          '$sites.courts.sport$': sport
        }
      })
      res.send(establishments)
    } catch (e) {
      console.log(e)
      res.send(e)
    }
  }

module.exports= { findBySport }