require('dotenv').config();
const express = require('express');
const { globalErrorHandler } = require('../middlewares/globalErrorHandler');

const app = express();

// pass incoming request to express.json()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

const userRoutes = require('../routes/userRoute');

// routes
app.use('/', userRoutes);

// global error handler
app.use(globalErrorHandler);

module.exports = app;
