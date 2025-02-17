import express from 'express';
// import { signUp, login, logout } from '../controllers/user-controller.js';
import signUp from '../controllers/user-controller.js';
import { userValidators, requestValidator } from '../middleware/request-validator.js';

const userRouter = express.Router();

userRouter.post('/signup', userValidators, requestValidator, signUp);
// userRouter.post('/login', login);
// userRouter.post('/logout', logout);

export default userRouter;