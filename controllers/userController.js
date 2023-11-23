const userService = require('../services/userService');

async function getUsers(req, res){
    const users = await userService.getUsersData();
    let response = '';
    for(let i = 0; i<users.length;i++){
        
        response += `<tr>
                        <td>${users[i].id}</td>
                        <td>${users[i].imie}</td>
                        <td>${users[i].nazwisko}</td>
                        <td>${users[i].numer_telefonu}</td>
                        <td>${users[i].miejsce_parkingowe}</td>
                        <td>${users[i].data_ostatniej_platnosci}</td>
                        <td>${users[i].data_nastepnej_platnosci}</td>
                    </tr>`;
        
    }
    res.render('users',{title: 'Najemcy', userTable: response});

}

module.exports = {
    getUsers
}