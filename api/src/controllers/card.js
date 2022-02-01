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
    const allEstablishments = establishmentDB();
    const infoCourts=allCourts.map(el=>{return {name:el.name, price:el.price}})
    const infoSites=allSites.map(el=>{return {siteName:el.name,city:el.city, street:el.street, streetNumber:el.streetNumber}})
    var infoCard=[]

    for (let i = 0; i < allCourts.length; i++) {
        for (let j = 0; i < allSites.length; i++) {
             
                if (allCourts[i].siteName===allSites[j].name){
                    infoCard=[...infoCard,[ {name:allCourts[i].name, siteName:allSites[j].name, city:allSites[j].city,shiftLength:allCourts[i].shiftLength,
                    price:allCourts[i].price, street:allSites[j].street, streetNumber:allSites[j].streetNumber}]]   
            }
            
        
        }
        
    }
    //  if(allCourts.map(el=>el.siteName)===allSites.map(el=>el.name)){
    //   var definitivo=infoCourts.concat(infoSites)
    // }
    console.log(infoCard)
    try {

     
        const cards = allCourts.map(el=>{return {name:el.name, price:el.price}})

       res.status(200).send(infoCard)    
        
    } catch (e) {
        console.log(e)
    }   
};

module.exports= { getCards }