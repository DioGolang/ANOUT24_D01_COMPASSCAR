const express = require('express')
const CarController = require('../controllers/car.controller')
const CarItemController = require('../controllers/car-item.controller')
const checkDuplicatePlateHandler = require('../middlewares/check-duplicate-plate.handler');
const carNotFoundHandler = require('../middlewares/car-not-found.handler')

const errorHandler = require('../middlewares/error.handler')

const router = express.Router()

router.get('/', CarController.getAll)
router.get('/:id', carNotFoundHandler, CarController.getById)
router.post('/', checkDuplicatePlateHandler, CarController.create)
router.post('/:id/items', carNotFoundHandler,  CarItemController.create)
router.use(errorHandler);
module.exports = router;