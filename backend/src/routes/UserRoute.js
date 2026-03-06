const UserController = require('../controllers/UserController')
const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()


router.get('/:id', 
    // authMiddleware.authenticate, 
    UserController.getProfile)

router.post('/:id/update', 
    authMiddleware.authenticate, 
    UserController.update)

module.exports = router