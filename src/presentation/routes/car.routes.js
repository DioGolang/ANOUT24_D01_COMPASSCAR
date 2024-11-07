const express = require('express')
const CarController = require('../controllers/car.controller')
const CarItemController = require('../controllers/car-item.controller')
const checkDuplicatePlateHandler = require('../../middlewares/check-duplicate-plate.handler');
const carNotFoundHandler = require('../../middlewares/car-not-found.handler')
const carUpdateHandler = require('../../middlewares/car-update.handler')

const errorHandler = require('../../middlewares/error.handler')

const router = express.Router()

router.get('/', CarController.getAll)
router.get('/:id', carNotFoundHandler, CarController.getById)
router.post('/', checkDuplicatePlateHandler, CarController.create)
router.patch('/:id', [carNotFoundHandler, checkDuplicatePlateHandler, carUpdateHandler], CarController.update)
router.delete('/:id', carNotFoundHandler, CarController.delete)
router.post('/:id/items', carNotFoundHandler,  CarItemController.create)
router.use(errorHandler);
module.exports = router;
