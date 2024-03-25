import express from 'express';
import controllers from '../controllers';

const { loginController } = controllers;

const loginRoute = express.Router();

loginRoute.post('/', loginController.login);

export default loginRoute;
