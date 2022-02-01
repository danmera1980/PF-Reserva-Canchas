const { Court, Headquarter} = require ('../db');
// cambiar nombre de sede cuando sepa el nombre de la tabla de sede

const postCourt = async (req,res,next) => {
    const {name, description, shiftLength, price, image, sport, headquarterName} = req.body;
    console.log();

    let sedeDB = await Headquarter.findOne({
      where: { name: headquarterName}
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


  sedeDB.addCourt(courtCreated);

  res.send('cancha creada')
    
  } catch (e) {
   next(e) 
  }
   
}
module.exports= { postCourt }