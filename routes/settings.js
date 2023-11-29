
let express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.verifyToken, authMiddleware.checkRole(["admin","client"]), userController.getSettings)

module.exports = router;