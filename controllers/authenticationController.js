const authService = require('../services/authenticationService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerPost(req, res){

    try{
    const {first_name, last_name, email, password} = req.body;

    if(!(email && password && first_name && last_name)){
        res.status(400).send('Wszystkie dane muszą być wypełnione.');
    }

    const oldUser = await authService.getOldUser(email);

    if(oldUser){
        return res.status(409).send("Użytkownik o podanym email już istnieje.");
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await authService.addUser({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
        salt: salt
    });

    res.redirect('/');

    }catch(err){
        console.log(err);
    }
    
}


async function loginPost(req, res){

    try{
    const {email, password } = req.body;
    if(!(email && password)){
        res.status(400).send('Wszystkie dane muszą być wypełnione.');
    }

    const user = await authService.getOldUser(email);

    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );
        await authService.updateToken(email, token);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res.redirect('/stronaglowna');
    }

    res.status(400).send("Niepoprawne dane logowania.");

    }catch(err){
        console.log(err);
    }

    
}

async function registerGet(req, res){
    res.render('register',{title: "Rejestracja"});
}

async function loginGet(req, res){
    res.render('login', {title: "Logowanie"});
}

module.exports = {
    registerPost,
    registerGet,
    loginPost,
    loginGet
}