const authController = require('../controllers/AuthController')
const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware.js')

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/logout', authController.logout)

router.post('/refresh', authController.refresh)

module.exports = router



