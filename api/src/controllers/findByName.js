const {Establishment, Site, Court} = require('../db');


const findByName = async ( req ,res) => {
    const name= req.query.name
    try {
        var establishments = await Establishment.findAll({
            where:{name: name},
            include:{
              model: Site,
              as: 'sites',
              include:{
                model: Court,
                as: 'courts',
              }
            }
          })
          res.send(establishments)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {findByName}