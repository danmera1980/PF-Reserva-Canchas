const axios = require('axios');
const {Establishment, Site} = require('../db');
const { createSite } = require('./site');


const getEstablishmentsFromDB = async(req,res,next)=>{
  
    // const searchBarName = req.query.name
    const {responsableId} = req.params
    console.log(responsableId)
    console.log(typeof responsableId)
   
    try {

        let establishmentDB = await Establishment.findAll()

        if(searchBarName){
            establishmentDB = establishmentDB.filter(establishment => establishment.name.toLowerCase().includes(searchBarName));
        }

        if(responsableId){

            establishmentDB = establishmentDB.filter(establishment => establishment.responsableId === responsableId);
            console.log(establishmentDB)
            establishmentDB = establishmentDB.map(establishment => {
                return{
                    id: establishment.id,
                    name: establishment.name
                }
            })
            return res.send(establishmentDB);
        }

        establishmentDB = establishmentDB.map(establishment => {
            return{
                id: establishment.id,
                name: establishment.name,
                logoImage: establishment.logoImage,
                rating: establishment.rating,
                timeActiveFrom: establishment.timeActiveFrom,
                timeActiveTo: establishment.timeActiveTo,
                responsableId: establishment.responsableId,
            }
        })
        res.send(establishmentDB) ;
        
        
    } catch (error) {
        console.log(error)
    }

   
}

const getEstablishmentsName = async ( req ,res) => {
    const name= req.query.name
    console.log(name);
    try {
        const establishments = await Establishment.findAll({
            include:{
                model:Site,
                as: "sites",
                attributes: ['id','name','country','city', 'street','streetNumber','latitude','longitude']}
        })
        const results = establishments.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        res.send(results)    
    } catch (error) {
        console.log(error)
    }
}


const createEstablishment = async (req, res, next)=>{

    const {id,name,logoImage,rating, timeActiveFrom, timeActiveTo, responsableId} = req.body

    // creo el establecimiento

    let establishmentDB = await Establishment.findOne({
        where : {id: id}
    })

    try {
        if(!establishmentDB){
            let establishmentCreated = await Establishment.create({
                id,
                name,
                logoImage,
                rating,
                timeActiveFrom,
                timeActiveTo,
                responsableId
            })

            res.send('establishment created')
        }
        else{
            res.status(404).send('establishment already exist')
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
    

}

module.exports = {getEstablishmentsFromDB, createEstablishment, getEstablishmentsName}