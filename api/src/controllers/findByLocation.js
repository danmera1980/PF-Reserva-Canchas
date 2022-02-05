const { Court, Site, Establishment} = require ('../db');

const findByLocation = async (req, res) => { 
    const {location} = req.query
    console.log(location)

    try {
          var courts = await Court.findAll({
            attributes: { exclude: ['createdAt','updatedAt'] }
          })
        for(var i = 0; i<courts.length ; i++){
            var site = await Site.findOne({
                where: { id: courts[i].siteId},
                attributes: ['name', 'id', 'establishmentId','street', 'streetNumber', 'city']
              })
            courts[i]= {...courts[i].dataValues, site}
        }
        for(var i=0; i<courts.length ; i++){
            var establishment = await Establishment.findOne({
                where: { id: courts[i].site.establishmentId},
                attributes: ['name', 'id', 'timeActiveFrom', 'timeActiveTo']
            })
            courts[i]= {...courts[i], establishment}
        }
    
    const results = courts.filter(el => el.site.city.toLowerCase().includes(location.toLowerCase()))
    
    res.send(results)

    } catch (e) {
      console.log(e)
      res.send(e)
    }
}

module.exports= { findByLocation }