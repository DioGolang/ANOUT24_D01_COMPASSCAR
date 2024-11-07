const express = require('express')
const UserController = require('../controllers/user.controller')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router()

module.exports = router;