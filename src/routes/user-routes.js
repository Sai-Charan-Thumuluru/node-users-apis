import express from 'express';
// import { signUp, login, logout } from '../controllers/user-controller.js';
import signUp from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
// userRouter.post('/login', login);
// userRouter.post('/logout', logout);

export default userRouter;