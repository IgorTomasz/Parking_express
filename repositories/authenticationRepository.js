const { where } = require('sequelize');
const DbModels = require('../models/DbModels');

async function getOldUser(email){
    return DbModels.userSchema.findOne({
        where:{
            email: email
        }
    });
}


async function getCurrentUser(token){
    return await DbModels.userSchema.findOne({
        where: {
            token: token
        }
    });
}

async function updateToken(email, token){
    await DbModels.userSchema.update({
        token: token
    },
    {where:{
        email: email
    }});
}


async function addUser(user){
    return await DbModels.userSchema.create({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        salt: user.salt
    });
}

module.exports = {
    getOldUser,
    addUser,
    getCurrentUser,
    updateToken
}