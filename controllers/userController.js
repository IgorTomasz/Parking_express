const userService = require('../services/userService');
const infoService = require('../services/infoService');
const moment = require('moment');

async function getUsers(req, res){
    const users = await userService.getUsersData();
    let response = '';

    
    for(let i = 0; i<users.length;i++){
        
        response += `<tr onclick=\"showIdOver(${users[i].id})\">
                        <td>${users[i].id}</td>
                        <td>${users[i].imie}</td>
                        <td>${users[i].nazwisko}</td>
                        <td>${users[i].numer_telefonu}</td>
                        <td>${users[i].miejsce_parkingowe}</td>
                        <td>${users[i].data_ostatniej_platnosci}</td>
                        <td>${users[i].data_nastepnej_platnosci}</td>
                    </tr>`;
        
    }
    res.render('users',{title: 'Najemcy', userTable: response} );

}

async function saveData(req, res){
    let id = req.params.id;

    const newData = {
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        telefon: req.body.nr_tel
    }

    await userService.saveData(id, newData);

    const users = await userService.getUsersData();
    let response = '';
    for(let i = 0; i<users.length;i++){
        
        response += `<tr onclick=\"showIdOver(${users[i].id})\">
                        <td>${users[i].id}</td>
                        <td>${users[i].imie}</td>
                        <td>${users[i].nazwisko}</td>
                        <td>${users[i].numer_telefonu}</td>
                        <td>${users[i].miejsce_parkingowe}</td>
                        <td>${users[i].data_ostatniej_platnosci}</td>
                        <td>${users[i].data_nastepnej_platnosci}</td>
                    </tr>`;
        
    }

    res.redirect('/users');

    //dać informacje, że dane zostały zapisane
}

async function getMoreUserInfo (req, res) {
    const id = req.params.id;
    let prom = await infoService.GetData(id);
  
    res.send(`<form id=\"popup-form\" method=\"post\" action=\"/users/saveData/${id}\"><p>Imię: <input type=\"text\" name=\"imie\" value=\"`+prom.imie + '\"></p> '+
    '<p>Nazwisko: <input type=\"text\" name=\"nazwisko\" value=\"' + prom.nazwisko+'\"></p>'+
    '<p>Telefon: <input type=\"number\" name=\"nr_tel\" value=\"'+prom.numer_telefonu+'\" maxlength=9></p>'+
    '<p>Następna płatność: ' + 
    moment(new Date(prom.data_nastepnej_platnosci)).format('DD-MM-YYYY') + '</p>' +
    '<p> Następna płatność: '+moment(new Date(prom.data_nastepnej_platnosci)).format('DD-MM-YYYY')+'</p>'+
    '<button type=\"submit\">Zapisz</button>'+
    '</form>');
    //sprawdzenie tokena jwt
  }

module.exports = {
    getUsers,
    getMoreUserInfo,
    saveData
}