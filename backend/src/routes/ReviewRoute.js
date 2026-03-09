const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware.js')
const ReviewController = require('../controllers/ReviewController.js')

router.get('/user/:id', ReviewController.getUserReviews)

router.post('/create', ReviewController.create)

router.post('/:id/update', ReviewController.update)

router.delete('/:id/delete', authMiddleware.authenticate, authMiddleware.adminAccess, ReviewController.delete)

module.exports = router

