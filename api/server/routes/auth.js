/* eslint-disable linebreak-style */
import { Router } from 'express';
import Validation from '../middlewares/Validation';
import authController from '../controllers/auth';

const authRoute = Router();

authRoute.post('/signup', Validation.signupValidation, authController.signup);

export default authRoute;
