const express = require('express');
const CarController = require('../controllers/car.controller');
const CarItemController = require('../controllers/car-item.controller');
const checkDuplicatePlateHandler = require('../../application/middlewares/check-duplicate-plate.handler');
const carNotFoundHandler = require('../../application/middlewares/car-not-found.handler');
const carUpdateHandler = require('../../application/middlewares/car-update.handler');

const errorHandler = require('../../application/middlewares/error.handler');
const authenticateTokenHandler = require('../../application/middlewares/auth.middleware');

const router = express.Router();

router.get('/', CarController.getAll);
router.get('/:id', carNotFoundHandler, CarController.getById);
router.post('/', [authenticateTokenHandler, checkDuplicatePlateHandler], CarController.create);
router.patch('/:id', [carNotFoundHandler, checkDuplicatePlateHandler, carUpdateHandler], CarController.update);
router.delete('/:id', carNotFoundHandler, CarController.delete);
router.post('/:id/items', carNotFoundHandler, CarItemController.create);
router.use(errorHandler);
module.exports = router;
