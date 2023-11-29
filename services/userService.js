const userRepository = require('../repositories/userRepository');

async function getUsersData(page){
    const users = await userRepository.userQuery(page);
    
    let usersArray = [];
    for(let i = 0; i<users.length; i++){
        usersArray.push(users[i].dataValues);
    }

    return usersArray;
}

async function saveData(id, newData){
    await userRepository.saveData(id, newData);
}

async function countUsers(){
    return await userRepository.countUsers();
}


module.exports = {
    getUsersData,
    saveData,
    countUsers
}