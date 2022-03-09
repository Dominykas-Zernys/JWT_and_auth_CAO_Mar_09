const express = require('express');
const { registerUser, loginUser } = require('../controllers/usersController');
const validateUser = require('../middleware');

const userRouter = express.Router();

userRouter.post('/register', validateUser, registerUser);

userRouter.post('/login', validateUser, loginUser);

module.exports = userRouter;
