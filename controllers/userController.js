const dotenv = require('dotenv');
dotenv.config();

//import user model
const { User } = require('../models/UserModel');

// register a new user
const registerUser = async (req, res) => {
	const { fullname, email, password } = req.body;

	//check if user exist
	const userExist = await User.findOne({ email });
	if (userExist) {
		return res.status(400).json({
			status: 'fail',
			message: 'User already exist',
		});
	}

	//if user does not exist, create a new user
	const user = await User.create({
		fullname,
		email,
		password,
	});

	res.status(201).json({
		status: 'success',
		message: 'User Registered Successfully',
		data: user,
	});
};
module.exports = {
	registerUser,
};
