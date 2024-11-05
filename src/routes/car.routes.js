const express = require('express')
const CarController = require('../controllers/car.controller')
const checkDuplicatePlate = require('../middlewares/check-duplicate-plate.handler');

const errorHandler = require('../middlewares/error.handler')

const router = express.Router()

router.post('/', checkDuplicatePlate, CarController.create)
router.use(errorHandler);

module.exports = router;