const axios = require("axios");
const {User} = require('../db');


const getAllUsers = async (req, res, next) => {
    try {
        
    } 
    catch (e) {
        next(e)
    }
};


const getUserByID = async (req, res, next) => {
    try {
        
    } catch (e) {
        next(e)
    }
};

module.exports = {
    getAllUsers,
    getUserByID
}
