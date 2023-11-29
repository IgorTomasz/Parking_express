const userService = require('../services/userService');
const infoService = require('../services/infoService');
const authService = require('../services/authenticationService');
const moment = require('moment');

async function getUsers(req, res){
    const page = req.params.page-1;
    const users = await userService.getUsersData(page);
    const count = await userService.countUsers();
    const pages = Math.round(count/15);
    let response = '';
    let pagesButtons = '';

    const currentUser = await authService.getCurrentUser(req.cookies.access_token);
    const names = '<a href=\"/users/ustawienia\">'+currentUser.first_name + ' ' + currentUser.last_name+'</a>';

    
    for(let i = 0; i<users.length;i++){
        
        response += `<tr onclick=\"showIdOver(${users[i].id})\">
                        <td>${users[i].parking_spot}</td>
                        <td>${users[i].first_name === null ? "" : users[i].first_name}</td>
                        <td>${users[i].last_name === null ? "" : users[i].last_name}</td>
                        <td>${users[i].phone === null ? "" : users[i].phone}</td>
                        <td>${users[i].last_payment === null ? "" : moment(new Date(users[i].last_payment)).format('DD-MM-YYYY')}</td>
                        <td>${users[i].next_payment === null ? "" : moment(new Date(users[i].next_payment)).format('DD-MM-YYYY')}</td>
                    </tr>`;
        
    }

    for(let i = 1; i<=pages; i++){
        pagesButtons += `<a href=\"/users/${i}\">${i}</a>`
    }
    res.render('users',{title: 'Najemcy', userTable: response, names: names, pages: pagesButtons} );

}

async function getSettings(req, res){
    const currentUser = await authService.getCurrentUser(req.cookies.access_token);
    const names = '<a href=\"/ustawienia\">'+currentUser.first_name + ' ' + currentUser.last_name+'</a>';

    res.render('userSettings', {title: 'Ustawienia', names:names});

}

async function saveData(req, res){
    let id = req.params.id;

    const newData = {
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        telefon: req.body.nr_tel
    }

    await userService.saveData(id, newData);

    // const users = await userService.getUsersData();
    // let response = '';
    // for(let i = 0; i<users.length;i++){
        
    //     response += `<tr onclick=\"showIdOver(${users[i].id})\">
    //                     <td>${users[i].id}</td>
    //                     <td>${users[i].first_name}</td>
    //                     <td>${users[i].last_name}</td>
    //                     <td>${users[i].phone}</td>
    //                     <td>${users[i].parking_spot}</td>
    //                     <td>${users[i].last_payment}</td>
    //                     <td>${users[i].next_payment}</td>
    //                 </tr>`;
        
    // }

    res.redirect('/users')
    //getUsers(res,req);

    //dać informacje, że dane zostały zapisane
}

async function getMoreUserInfo (req, res) {
    const id = req.params.id;
    let prom = await infoService.GetData(id);
  
    res.send(`<form id=\"popup-form\" method=\"post\" action=\"/users/saveData/${id}\"><p>Imię: <input type=\"text\" name=\"imie\" value=\"`+prom.first_name + '\"></p> '+
    '<p>Nazwisko: <input type=\"text\" name=\"nazwisko\" value=\"' + prom.last_name+'\"></p>'+
    '<p>Telefon: <input type=\"number\" name=\"nr_tel\" value=\"'+prom.phone+'\" maxlength=9></p>'+
    '<p>Następna płatność: ' + 
    moment(new Date(prom.last_payment)).format('DD-MM-YYYY') + '</p>' +
    '<p> Następna płatność: '+moment(new Date(prom.next_payment)).format('DD-MM-YYYY')+'</p>'+
    '<button type=\"submit\">Zapisz</button>'+
    '</form>');
    //sprawdzenie tokena jwt
  }

module.exports = {
    getUsers,
    getMoreUserInfo,
    saveData,
    getSettings
}