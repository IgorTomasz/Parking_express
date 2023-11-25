const DbModels = require('../models/DbModels');

async function userQuery(id){
  users_data = await DbModels.Person.findAll();
  return users_data;
}

async function saveData(id, newData){
  await DbModels.Person.update({ imie: newData.imie, nazwisko: newData.nazwisko, numer_telefonu: newData.telefon},{
    where:{
      id: id
    }
  });
}

module.exports = {
    userQuery,
    saveData
  };