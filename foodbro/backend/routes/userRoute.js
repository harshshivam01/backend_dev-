const express = require('express');
const {registerUser, loginUser, getAllUsers, getAllRestaurants} = require('../controllers/userCont');
const { checkAuth } = require("../middlewares/auth");

const userRouter = express.Router();

// Public routes (no authentication required)
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Protected routes (authentication required)
userRouter.get('/', checkAuth, getAllUsers);
userRouter.get('/restaurants',  getAllRestaurants);

module.exports = userRouter;


