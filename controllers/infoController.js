const moment = require('moment');
const service = require('../services/infoService');
const authService = require('../services/authenticationService');

async function getIndex(req, res, next) {
    const currentUser = await authService.getCurrentUser(req.cookies.access_token);
    const names = currentUser.first_name + ' ' + currentUser.last_name;
    res.render('index', {title: 'Strona główna', names: names});
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

    res.send('<p>Imię i nazwisko: '+prom.first_name + ' ' + prom.last_name+'</p><p>Telefon: '+prom.phone+'</p><p>Następna płatność: ' + 
    moment(new Date(prom.last_payment)).format('DD-MM-YYYY') + '<p> Następna płatność: '+moment(new Date(prom.next_payment)).format('DD-MM-YYYY')+'</p>');
    //sprawdzenie tokena jwt
  }

module.exports = {
    getIndex,
    getInfo,
    getMoreInfo
}