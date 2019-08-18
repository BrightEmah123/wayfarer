/* eslint-disable linebreak-style */
import { Router } from 'express';
import tripValidation from '../middlewares/tripValidation';
import tripController from '../controllers/trip';
import Authorization from '../middlewares/Authorization';

const tripRoute = Router();

tripRoute.post('/', Authorization.verifyAdmin, tripValidation.postTripValidation, tripController.createTrip);
tripRoute.get('/', Authorization.verifyUser, tripController.getTrips);


export default tripRoute;
