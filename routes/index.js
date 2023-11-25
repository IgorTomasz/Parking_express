var express = require('express');
var router = express.Router();
const infoController = require('../controllers/infoController')
const authController = require('../controllers/authenticationController');
const authMiddleware = require('../middleware/auth');

router.get('/rejestracja', authController.registerGet);

router.post('/rejestracja', authController.registerPost);

router.post('/logowanie', authController.loginPost);

router.get('/logowanie', authController.loginGet);

/* GET home page. */
router.get('/stronaglowna', authMiddleware, infoController.getIndex);

router.get('/showIdOver/:id', authMiddleware, infoController.getInfo);

router.get('/showMoreInfo/:id', authMiddleware, infoController.getMoreInfo);


module.exports = router;
