const { Court, Site} = require ('../db');
// cambiar nombre de sede cuando sepa el nombre de la tabla de sede

const postCourt = async (req,res,next) => {
    const {name, description, shiftLength, price, image, sport, siteName} = req.body;

    let siteDB = await Site.findOne({
      where: { name: siteName}
    })   

    let courtDB = await Court.findOne({
      where : {
        name : name,
        sport: sport,
        siteName: siteName
      }
    })
    console.log(courtDB);

  try {

    
    
    if(!courtDB){
      let courtCreated = await Court.create({
      
        name,
        description,
        shiftLength, 
        price,
        image,
        sport,
        
      })
  
  
    await siteDB.addCourt(courtCreated);
  
    res.send('court created')
  }
  else{
    res.status(404).send('court already exist')
  }
    
    
  } catch (e) {
   next(e) 
  }
   
}
module.exports= { postCourt }