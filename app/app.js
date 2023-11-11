require('dotenv').config();

const express = require('express');
const app = express();

//pass incoming request to express.json()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

const userRoutes = require('../routes/userRoute');

app.use((req, res, next) => {
	next();
});

//routes
app.use('/users/', userRoutes);

module.exports = app;
