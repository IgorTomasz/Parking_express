let express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');


/* GET users listing. */
router.get('/', authMiddleware, userController.getUsers);

router.get('/getMoreUserInfo/:id', authMiddleware, userController.getMoreUserInfo);

router.post('/saveData/:id', authMiddleware, userController.saveData);

module.exports = router;
