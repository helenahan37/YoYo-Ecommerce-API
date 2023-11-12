const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const checkLogin = require('../middlewares/checkLogin');
const userRoutes = express.Router();

userRoutes.post('/register', registerUser).post('/login', loginUser).get('/profile', checkLogin, getUserProfile);

module.exports = userRoutes;
