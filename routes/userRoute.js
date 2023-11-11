const express = require('express');
const { registerUser } = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);

module.exports = userRoutes;
