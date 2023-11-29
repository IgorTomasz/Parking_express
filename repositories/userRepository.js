const DbModels = require('../models/DbModels');

async function userQuery(page){
  users_data = await DbModels.Person.findAll({
    offset: page*15,
    limit: 15,
  });
  return users_data;
}

async function countUsers(){
  return await DbModels.Person.count();
}

async function saveData(id, newData){
  await DbModels.Person.update({ first_name: newData.imie, last_name: newData.nazwisko, phone: newData.telefon},{
    where:{
      id: id
    }
  });
}

module.exports = {
    userQuery,
    saveData,
    countUsers
  };