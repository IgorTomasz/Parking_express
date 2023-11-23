let express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');


/* GET users listing. */
router.get('/', userController.getUsers);

module.exports = router;