const jwt = require("jsonwebtoken");
const authService = require('../services/authenticationService');


const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;


  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const checkRole = (roles) => async (req, res, next) => {
  const token = req.cookies.access_token;

  //retrieve employee info from DB
  const employee = await authService.getCurrentUser(token);

    if(!roles.includes(employee.role)){
      return res.status(401).send("Nie masz uprawnień do edytowania danych.");
    }else{
      return next();
    }
};


module.exports = {
  verifyToken,
  checkRole
}