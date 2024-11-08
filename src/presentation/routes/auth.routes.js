const express = require('express');
const validationUserDataHandler = require('../../application/middlewares/validation-user-data.handler');
const AuthController = require('../controllers/auth.controller');
const errorHandler = require('../../application/middlewares/error.handler');

const router = express.Router();

router.post('/register', validationUserDataHandler, AuthController.register);
router.post('/login', AuthController.login);
router.use(errorHandler);
module.exports = router;
