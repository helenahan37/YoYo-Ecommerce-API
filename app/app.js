require('dotenv').config();
const express = require('express');
const { globalErrorHandler, notFound } = require('../middlewares/globalErrorHandler');

const app = express();

// pass incoming request to express.json()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

const userRoutes = require('../routes/userRoute');
const productRoutes = require('../routes/productRoute');
const categoryRoutes = require('../routes/categoryRoute');

// routes
app.use('/users/', userRoutes);
app.use('/products/', productRoutes);
app.use('/categories/', categoryRoutes);

app.use(notFound);
// global error handler
app.use(globalErrorHandler);

module.exports = app;
