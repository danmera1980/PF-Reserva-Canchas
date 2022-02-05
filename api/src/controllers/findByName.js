const {Establishment, Site, Court} = require('../db');


const findByName = async ( req ,res) => {
    const name= req.query.name
    console.log(name);
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
        const results = courts.filter(el => el.establishment.name.toLowerCase().includes(name.toLowerCase()))
        res.send(results)    
    } catch (error) {
        console.log(error)
    }
}

module.exports = {findByName}