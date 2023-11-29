const moment = require('moment');
const service = require('../services/infoService');
const tableService = require('../services/tableService');
const authService = require('../services/authenticationService');


async function getIndex(req, res, next) {
    const currentUser = await authService.getCurrentUser(req.cookies.access_token);
    const names = '<a href=\"/ustawienia\">'+currentUser.first_name + ' ' + currentUser.last_name+'</a>';
    let table = await tableService.getTable("left");
    res.render('index', {title: 'Strona główna', names: names, table:table});
  }

async function getParkingSide(req,res){
  parking = req.params.side;
  console.log("Choosen side: "+parking);
  let table = await tableService.getTable(parking);

  res.send(table);
}
async function getInfo (req, res) {

    //sprawdzenie tokena jwt
    const id = req.params.id;
    const prom = await service.GetData(id);

    
    res.send('<p>Imię i nazwisko: '+prom.first_name + ' ' + prom.last_name+'</p><p>Telefon: '+prom.phone+'</p><p>Następna płatność: ' + 
    moment(new Date(prom.next_payment)).format('DD-MM-YYYY') +
    `</p><button onclick=\"openPopup(${id})\">Więcej</button>`);
  }

async function getMoreInfo (req, res) {
    const id = req.params.id;
    let prom = await service.GetData(id);

    res.send('<p>Imię i nazwisko: '+prom.first_name + ' ' + prom.last_name+'</p><p>Telefon: '+prom.phone+'</p><p>Poprzednia płatność: ' + 
    moment(new Date(prom.last_payment)).format('DD-MM-YYYY') + '<p> Następna płatność: '+moment(new Date(prom.next_payment)).format('DD-MM-YYYY')+'</p>');
    //sprawdzenie tokena jwt
  }

module.exports = {
    getIndex,
    getInfo,
    getMoreInfo,
    getParkingSide
}