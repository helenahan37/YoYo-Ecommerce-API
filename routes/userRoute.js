const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const checkLogin = require('../middlewares/checkLogin');
const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/profile', checkLogin, getUserProfile);

module.exports = userRoutes;
