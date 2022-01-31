const { Court} = require ('../db');
// cambiar nombre de sede cuando sepa el nombre de la tabla de sede

const postCourt = async (req,res,next) => {
    const {name, description, shiftLength, price, image, sport, sede} = req.body;
    console.log();
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

      }  
    )
//     let sedesDb = await Sedes.findAll({
//       where: { name: sede}
//   })   

//   const court = await Court.findOne({
//     where: {
//       name: name,
//     },
//   });

//   await court.addSede(sedesDb)

  res.send('cancha creada')
    
  } catch (e) {
   next(e) 
  }
   
}
module.exports= { postCourt }