const DbModels = require('../models/DbModels');

async function infoQuery(id){
  person_data = await DbModels.Person.findAll({
    where:{
      parking_spot: id
    }
  })



  return person_data[0].dataValues;
}


module.exports = {
    infoQuery,
  };