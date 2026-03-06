const authController = require('../controllers/AuthController')
const express = require('express')
const router = express.Router()


router.post('/register', authController.register)

router.post('/login', authController.login)


router.post('/logout', authController.logout)


module.exports = router