const Person = require('../models/Person');

async function userQuery(id){
  users_data = await Person.findAll();
  return users_data;
}

module.exports = {
    userQuery
  };