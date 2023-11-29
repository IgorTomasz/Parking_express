var express = require('express');
var router = express.Router();
const infoController = require('../controllers/infoController')
const authController = require('../controllers/authenticationController');
const authMiddleware = require('../middleware/auth');

router.get('/rejestracja', authMiddleware.verifyToken, authMiddleware.checkRole(["admin"]), authController.registerGet);

router.post('/rejestracja', authMiddleware.verifyToken, authMiddleware.checkRole(["admin"]), authController.registerPost);

router.post('/', authController.loginPost);

router.get('/', authController.loginGet);

/* GET home page. */
router.get('/getParking/:side', authMiddleware.verifyToken, authMiddleware.checkRole(["admin","client"]), infoController.getParkingSide);

router.get('/stronaglowna', authMiddleware.verifyToken, authMiddleware.checkRole(["admin","client"]), infoController.getIndex);

router.get('/showIdOver/:id', authMiddleware.verifyToken, authMiddleware.checkRole(["admin","client"]), infoController.getInfo);

router.get('/showMoreInfo/:id', authMiddleware.verifyToken, authMiddleware.checkRole(["admin","client"]), infoController.getMoreInfo);


module.exports = router;
