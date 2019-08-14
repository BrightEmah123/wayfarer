/* eslint-disable linebreak-style */
import { Router } from 'express';
import bookValidation from '../middlewares/bookValidation';
import bookController from '../controllers/bookings';
import Authorization from '../middlewares/Authorization';

const bookRoute = Router();

bookRoute.post('/', Authorization.verifyUser, bookValidation.postBookValidation, bookController.bookTrip);
bookRoute.get('/', Authorization.verifyUser, bookController.getBookings);

export default bookRoute;
