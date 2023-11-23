const infoRepository = require('../repositories/infoRepository');

function GetData(id){
  return infoRepository.infoQuery(id);
}

module.exports = {
  GetData
};