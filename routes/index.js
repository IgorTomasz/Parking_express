var express = require('express');
var router = express.Router();
const infoController = require('../controllers/infoController')



/* GET home page. */
router.get('/',  infoController.getIndex);

router.get('/showIdOver/:id', infoController.getInfo);

router.get('/showMoreInfo/:id', infoController.getMoreInfo);


module.exports = router;
