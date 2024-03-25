import express from 'express';
import controllers from '../controllers';

const { userController } = controllers;

const userRoute = express.Router();

// userRoute.post('/', userController.createuser);
userRoute.get('/', userController.getAllUsers);

export default userRoute;
