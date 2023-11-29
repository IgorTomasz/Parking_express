let express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');


/* GET users listing. */
router.get('/:page', authMiddleware.verifyToken, authMiddleware.checkRole(["admin","client"]), userController.getUsers);

router.get('/getMoreUserInfo/:id', authMiddleware.verifyToken, authMiddleware.checkRole(["admin"]), userController.getMoreUserInfo);

router.post('/saveData/:id', authMiddleware.verifyToken, authMiddleware.checkRole(["admin"]), userController.saveData);


module.exports = router;
