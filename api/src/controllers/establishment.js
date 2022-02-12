const axios = require('axios');
const { UserRefreshClient } = require('google-auth-library');
const {Establishment, Site, User, Court} = require('../db');
const { createSite } = require('./site');

//Revisar si no esta repetida esta funcion
const getEstabIdByUserId = async (req,res, next) =>{

    const userId = req.user.id;
    
    if(userId){
        try {

            let user = await User.findOne({
                where:{id : userId}
            })
            console.log(user)
            res.send(user)

        } catch (error) {
            console.log(error)
        }
    }else{
        next();
    }
    
    
}
const getEstablishmentsFromDB = async(req,res,next)=>{
  
    const searchBarName = req.query.name
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
                    cuit: establishment.cuit,
                    name: establishment.name
                }
            })
            return res.send(establishmentDB);
        }

        establishmentDB = establishmentDB.map(establishment => {
            return{
                cuit: establishment.cuit,
                name: establishment.name,
                logoImage: establishment.logoImage,
                timeActiveFrom: establishment.timeActiveFrom,
                timeActiveTo: establishment.timeActiveTo,
                //responsableId: establishment.responsableId,
            }
        })
        res.send(establishmentDB) ;
        
        
    } catch (error) {
        console.log(error)
    }

   
}

const createEstablishment = async (req, res, next)=>{

    const userId = req.user.id;

    const {cuit,name,logoImage, timeActiveFrom, timeActiveTo} = req.body
    
    let user = await User.findOne({
        where: { 
            id: userId,
            hasEstablishment:false}
    })
    

    let establishmentDB = await Establishment.findOne({
        where : {cuit: cuit}
    })

    try {
        if(!user){
            res.status(400).send('user does not exist or has already an establishment')
        }
        else if(!establishmentDB){
            let establishmentCreated = await Establishment.create({
                cuit,
                name,
                logoImage,
                timeActiveFrom,
                timeActiveTo
            })

          await establishmentCreated.addUser(user);
        
          await User.update(
            {hasEstablishment:true},  
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
const addUserToEstablishment = async (req, res, next)=>{

    const {email,establishmentId } = req.body
    
    let user = await User.findOne({
        where: { email: email,
                 hasEstablishment:false }
    })
    
    let establishmentDB = await Establishment.findOne({
        where : {cuit: establishmentId}
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

const getEstablishmentId = async (req, res, next) => {
    const cuit = req.params.id

    try {
        const establishment = await Establishment.findOne({
            where:{
                cuit
            },
            include:{
                model: Site,
                as: 'sites',
                include:{
                  model: Court,
                  as: 'courts'
                }
              }
        })
        res.send(establishment)

    } catch (error) {
        console.log(error)
    }
}

const getEstablishmentByUser = async (req, res, next) => {
    const userId = req.user.id;
	let user = await User.findOne({
        where: { id: userId },
      });

  try {
    const establishment = await Establishment.findOne({
      where: {
        cuit: user.establishmentId,
      },
      include: {
        model: Site,
        as: "sites",
        include: {
          model: Court,
          as: "courts",
        },
      },
    });
    res.send(establishment);
  } catch (error) {
    console.log(error);
  }
};



module.exports = {
    getEstablishmentsFromDB,
    createEstablishment,
    addUserToEstablishment,
    getEstabIdByUserId,
    getEstablishmentId,
    getEstablishmentByUser
}
