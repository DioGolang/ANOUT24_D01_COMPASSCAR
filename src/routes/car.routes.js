const express = require('express')
const CarController = require('../controllers/car.controller')
const CarItemController = require('../controllers/car-item.controller')
const checkDuplicatePlateHandler = require('../middlewares/check-duplicate-plate.handler');
const carNotFoundHandler = require('../middlewares/car-not-found.handler')
const carUpdateHandler = require('../middlewares/car-update.handler')

const errorHandler = require('../middlewares/error.handler')

const router = express.Router()

/**
 * @swagger
 * paths:
 *   /api/v1/cars:
 *     get:
 *       summary: Get all cars
 *       description: Retrieve a list of all cars in the system.
 *       parameters:
 *         - in: query
 *           name: brand
 *           schema:
 *             type: string
 *           description: The brand of the car.
 *           example: Toyota
 *         - in: query
 *           name: model
 *           schema:
 *             type: string
 *           description: The model of the car.
 *           example: Corolla
 *         - in: query
 *           name: year
 *           schema:
 *             type: integer
 *           description: The year the car was manufactured.
 *           example: 2020
 *           minimum: 1900
 *           maximum: 2023
 *         - in: query
 *           name: plate
 *           schema:
 *             type: string
 *           description: The license plate number of the car.
 *           example: ABC-1D01
 *       responses:
 *         200:
 *           description: Successfully retrieved the list of cars
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Car'
 *         404:
 *           description: No cars found
 *         500:
 *           description: Internal Server Error
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the car.
 *         brand:
 *           type: string
 *           description: The brand of the car.
 *         model:
 *           type: string
 *           description: The model of the car.
 *         year:
 *           type: integer
 *           description: The year the car was manufactured.
 *         plate:
 *           type: string
 *           description: The license plate number of the car.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the car was created.
 *       required:
 *         - id
 *         - brand
 *         - model
 *         - year
 *         - plate
 *         - created_at
 *       example:
 *         id: 1
 *         brand: "Toyota"
 *         model: "Corolla"
 *         year: 2020
 *         plate: "ABC-1234"
 *         created_at: "2023-01-01T00:00:00Z"
 */
router.get('/', CarController.getAll)
router.get('/:id', carNotFoundHandler, CarController.getById)
router.post('/', checkDuplicatePlateHandler, CarController.create)
router.patch('/:id', [carNotFoundHandler, checkDuplicatePlateHandler, carUpdateHandler], CarController.update)
router.delete('/:id', carNotFoundHandler, CarController.delete)
router.post('/:id/items', carNotFoundHandler,  CarItemController.create)
router.use(errorHandler);
module.exports = router;
