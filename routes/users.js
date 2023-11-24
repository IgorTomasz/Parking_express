let express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');


/* GET users listing. */
router.get('/', userController.getUsers);

router.get('/getMoreUserInfo/:id', userController.getMoreUserInfo);

router.post('/saveData/:id', userController.saveData);

module.exports = router;
