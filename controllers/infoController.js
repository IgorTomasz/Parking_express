const moment = require('moment');
const service = require('../services/infoService');

function getIndex(req, res, next) {
    res.render('index', {title: 'Strona główna'});
  }


async function getInfo (req, res) {

    //sprawdzenie tokena jwt
    const id = req.params.id;
    const prom = await service.GetData(id);

    
    res.send('<p>Imię i nazwisko: '+prom.imie + ' ' + prom.nazwisko+'</p><p>Telefon: '+prom.numer_telefonu+'</p><p>Następna płatność: ' + 
    moment(new Date(prom.data_nastepnej_platnosci)).format('DD-MM-YYYY') +
    `</p><button onclick=\"openPopup(${id})\">Więcej</button>`);
  }

async function getMoreInfo (req, res) {
    const id = req.params.id;
    let prom = await service.GetData(id);

    res.send('Imię i nazwisko: '+prom.imie + ' ' + prom.nazwisko+'</br> Telefon: '+prom.numer_telefonu+'<br>Poprzednia płatność: ' + 
    moment(new Date(prom.data_ostatniej_platnosci)).format('DD-MM-YYYY') + '<br> Następna płatność: '+moment(new Date(prom.data_nastepnej_platnosci)).format('DD-MM-YYYY'));
    //sprawdzenie tokena jwt
  }

module.exports = {
    getIndex,
    getInfo,
    getMoreInfo
}