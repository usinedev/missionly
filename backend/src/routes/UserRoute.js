const UserController = require('../controllers/UserController')
const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.get('/', UserController.getUsers)

router.get('/:id', UserController.getById)

router.get('/:name', UserController.getByName)

router.post('/:id/update', 
    authMiddleware.authenticate, 
    UserController.update)


module.exports = router