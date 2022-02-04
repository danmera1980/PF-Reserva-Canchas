const axios = require('axios');
const { UserRefreshClient } = require('google-auth-library');
const {Establishment, Site, User} = require('../db');
const { createSite } = require('./site');


const getEstablishmentsFromDB = async(req,res,next)=>{
  
    // const searchBarName = req.query.name
    const {responsableId} = req.params
    
   
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

    const {id,name,logoImage, timeActiveFrom, timeActiveTo, userId} = req.body


    
    let user = await User.findOne({
        where: { id: userId}
    })
    if (user){console.log('soy usuario',user)}

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
                timeActiveFrom,
                timeActiveTo
            })

          await establishmentCreated.addUser(user);
        
          await User.update(
            {hasEstablishment:true,
            isAdmin:true         },  
            { where:{id:userId} })

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
const addUsertoEstablishment = async (req, res, next)=>{

    const {email} = req.body
    const { establishmentId} = req.params
    
    let user = await User.findOne({
        where: { email: email,
                 hasEstablishment:false }
    })
    
    // creo el establecimiento
    let establishmentDB = await Establishment.findOne({
        where : {id: establishmentId}
    })

    try {
        if(!user){
            res.status(400).send('user does not exist or has already an establishment')
        }
        else if(establishmentDB){

          await establishmentDB.addUser(user);

          await User.update(
            {hasEstablishment:true},  
            { where:{email:email} }) 

            res.send('user added')
        }
        else{
            res.status(404).send('user can not be added')
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
    
}



module.exports = {getEstablishmentsFromDB, createEstablishment, getEstablishmentsName, addUsertoEstablishment}