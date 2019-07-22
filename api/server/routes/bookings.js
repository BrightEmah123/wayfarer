/* eslint-disable linebreak-style */
import { Router } from 'express';
import bookValidation from '../middlewares/bookValidation';
import bookController from '../controllers/bookings';

const bookRoute = Router();

bookRoute.post('/', bookValidation.postBookValidation, bookController.bookTrip);

export default bookRoute;
