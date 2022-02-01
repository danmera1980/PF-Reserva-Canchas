const { Court, Site} = require ('../db');

let courtDB = ()=> {
    return  Court.findAll()
}
let siteDB = ()=> {
    return  Site.findAll()
}

const getCards = async (req,res)=>{

    const allCourts = await courtDB();
    const allSites = await siteDB();
   
    var infoCard=[]

    for (let i = 0; i < allCourts.length; i++) {
        for (let j = 0; j < allSites.length; j++) {
             
                if (allCourts[i].siteName===allSites[j].name){
                var infoCardIn={name:allCourts[i].name, siteName:allSites[j].name, city:allSites[j].city,shiftLength:allCourts[i].shiftLength,
                    price:allCourts[i].price, street:allSites[j].street, streetNumber:allSites[j].streetNumber}
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