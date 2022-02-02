const { Court, Site, Establishment} = require ('../db');

let courtDB = ()=> {
    return  Court.findAll()
}
let siteDB = ()=> {
    return  Site.findAll()
}
let establishmentDB = ()=> {
    return  Establishment.findAll()
}


const getCards = async (req,res)=>{


    const allCourts = await courtDB();
    const allSites = await siteDB();
   const allEstablishments=await establishmentDB();
    var infoCard=[]

    for (let i = 0; i < allCourts.length; i++) {
        for (let j = 0; j < allSites.length; j++) {
        for (let k = 0; k < allEstablishments.length; k++) {
            if (allCourts[i].siteId===allSites[j].id && allEstablishments[k].id===allSites[j].establishmentId){
                var infoCardIn={name:allCourts[i].name, siteName:allSites[j].name, city:allSites[j].city,shiftLength:allCourts[i].shiftLength,
                    price:allCourts[i].price, street:allSites[j].street, streetNumber:allSites[j].streetNumber, establishment:allEstablishments[k].name}
            }
            
        }
             
            
            infoCard=[...infoCard,infoCardIn]
    
        }
    }
   
    try {

       res.status(200).send(infoCard)    
        
    } catch (e) {
        console.log(e)
    }   
};

module.exports= { getCards }