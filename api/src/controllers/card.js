const { Court, Site, Establishment} = require ('../db');
const dataBaseJson = require('../TempData/dataBase.json')
let courtDB = ()=> {
    return  Court.findAll()
}
let siteDB = ()=> {
    return  Site.findAll()
}
let establishmentDB = ()=> {
    return  Establishment.findAll()
}


const getCard = async (req,res)=>{


//     const allCourts = await courtDB();
//     const allSites = await siteDB();
//    const allEstablishments=await establishmentDB();
//     var infoCard=[]

//     for (let i = 0; i < allCourts.length; i++) {
//         for (let j = 0; j < allSites.length; j++) {
//         for (let k = 0; k < allEstablishments.length; k++) {
//             if (allCourts[i].siteId===allSites[j].id && allEstablishments[k].id===allSites[j].establishmentId){
//                 var infoCardIn={
//                     name:allCourts[i].name,
//                     sport:allCourts[i].sport,
//                     siteName:allSites[j].name,
//                     city:allSites[j].city,
//                     shiftLength:allCourts[i].shiftLength,
//                     price:allCourts[i].price, 
//                     image:allCourts[i].image[0], 
//                     street:allSites[j].street, 
//                     streetNumber:allSites[j].streetNumber,
//                     establishment:allEstablishments[k].name
//                 }
//             }
            
//         }
             
            
//             infoCard=[...infoCard,infoCardIn]
    
//         }
    // }
   
    try {

       res.status(200).send(infoCard)    
        
    } catch (e) {
        console.log(e)
    }   
};

const getCards = async ( req ,res) => {
    try {
        // var establishments = await Establishment.findAll({
        //     include:{
        //       model: Site,
        //       as: 'sites',
        //       include:{
        //         model: Court,
         // court.id
        // court.images,
        // court.name,
        // court.price,
        // court,sport,
        // site.name,
        // site.address,
        // site.latitude,
        // site.longitude,
        // establishment.name

        //         as: 'courts'
        //       }
        //     }
        //   })
        // res.send(establishments)
        // console.log(dataBaseJson.user)
        const allEstab = dataBaseJson.user.filter(element=> element.establishment)
        console.log(allEstab)
        res.send(allEstab)

    } catch (error) {
        console.log(error)
    }
}

module.exports= { getCards }