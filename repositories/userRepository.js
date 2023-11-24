const Person = require('../models/Person');

async function userQuery(id){
  users_data = await Person.findAll();
  return users_data;
}

async function saveData(id, newData){
  await Person.update({ imie: newData.imie, nazwisko: newData.nazwisko, numer_telefonu: newData.telefon},{
    where:{
      id: id
    }
  });
}

module.exports = {
    userQuery,
    saveData
  };