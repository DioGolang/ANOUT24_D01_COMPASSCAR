const express = require('express')
const CarController = require('../controllers/car.controller')
const router = express.Router()

router.post('/', CarController.create)

module.exports = router;