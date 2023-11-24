const Person = require('../models/Person');

async function infoQuery(id){
  person_data = await Person.findAll({
    where:{
      miejsce_parkingowe: id
    }
  })



  return person_data[0].dataValues;
}


module.exports = {
    infoQuery,
  };