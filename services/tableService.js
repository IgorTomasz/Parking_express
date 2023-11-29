const tableRepository = require('../repositories/tableRepository');

async function getTable(name){
    return await tableRepository.getTable(name);
}

module.exports = {
    getTable
}