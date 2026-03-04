const authController = require('../controllers/AuthController')
const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

console.log(typeof authMiddleware.authenticate)
console.log(typeof authController.login)

router.post('/register', authController.register)

router.post('/login', 
    // authMiddleware.authenticate, 
    authController.login)

router.get('/profile/:id', 
    // authMiddleware.authenticate, 
    authController.getProfile)

router.post('/logout', authController.logout)

module.exports = router