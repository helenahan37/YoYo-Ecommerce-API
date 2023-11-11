const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.post('/users/register', registerUser);
userRoutes.post('/users/login', loginUser);

module.exports = userRoutes;
