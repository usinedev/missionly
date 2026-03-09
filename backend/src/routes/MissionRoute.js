const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware.js')
const missionController = require('../controllers/MissionController.js')

router.get('/user/:id', missionController.getUserMissions)

router.get('/:id', missionController.getById)

router.get('/tags', missionController.getByTags)

router.get('/:name', missionController.getByName)

router.post('/create', missionController.create)

router.post('/:id/update', missionController.update)

router.delete('/:id/delete', authMiddleware.authenticate, authMiddleware.adminAccess, missionController.delete)

module.exports = router

