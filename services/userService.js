const userRepository = require('../repositories/userRepository');

async function getUsersData(){
    const users = await userRepository.userQuery();
    
    let usersArray = [];
    for(let i = 0; i<users.length; i++){
        usersArray.push(users[i].dataValues);
    }

    return usersArray;
}

async function saveData(id, newData){
    await userRepository.saveData(id, newData);
}


module.exports = {
    getUsersData,
    saveData
}