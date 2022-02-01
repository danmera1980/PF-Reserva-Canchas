const { Court, Site} = require ('../db');
// cambiar nombre de sede cuando sepa el nombre de la tabla de sede

const postCourt = async (req,res,next) => {
    const {name, description, shiftLength, price, image, sport, siteName} = req.body;
    console.log();

    let siteDB = await Site.findOne({
      where: { name: siteName}
    })   


  try {

    let courtCreated = await Court.findOrCreate({
      where:{
        name,
        description, 
        shiftLength, 
        price,
        image,
        sport,
      }
    })


  siteDB.addCourt(courtCreated);

  res.send('cancha creada')
    
  } catch (e) {
   next(e) 
  }
   
}
module.exports= { postCourt }