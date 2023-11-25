const authRepository = require('../repositories/authenticationRepository');

async function getOldUser(email){
    return authRepository.getOldUser(email);
}

async function addUser(user){
    return await authRepository.addUser(user);
}

async function getCurrentUser(token){
    return await authRepository.getCurrentUser(token);
}

async function updateToken(email, token){
    await authRepository.updateToken(email, token);
}


module.exports = {
    getOldUser,
    addUser,
    getCurrentUser,
    updateToken
}