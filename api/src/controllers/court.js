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

const findBySport = async (req, res) => { 
  const {sport} = req.query.sport
  try {
    const results = await Court.findAll({
      where:{
        sport: sport
      }
    })
    res.send(results)
  } catch (e) {
    console.log(e)
  }
}


const sortByPrice = async (req, res) => {
  const range = req.query.range 

  const courts = await Court.findAll()

  if(range === 'max'){
    
  }

}
module.exports= { postCourt, findBySport }