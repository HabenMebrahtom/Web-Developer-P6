const express = require('express');
const userRouter = express.Router();
const auth = require('../middleware/auth')


const userControllers = require('../controllers/user');


userRouter.get('/profile', userControllers.getUserProfile)
userRouter.post('/signup', userControllers.registerUser);
userRouter.post('/login', auth, userControllers.loginUser);

module.exports = userRouter;