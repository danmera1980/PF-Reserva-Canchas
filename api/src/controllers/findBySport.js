const { Court, Site, Establishment} = require ('../db');

const findBySport = async (req, res) => { 
    const {sport} = req.query

    try {
      var courts = await Establishment.findAll({
        include:{
          model: Site,
          as: 'sites',
          include:{
            model: Court,
            as: 'courts',
            where:{
              sport: sport
            }
          }
        }
      })
      res.send(courts)
    } catch (e) {
      console.log(e)
      res.send(e)
    }
  }

module.exports= { findBySport }