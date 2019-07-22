/* eslint-disable linebreak-style */
import { Router } from 'express';
import tripValidation from '../middlewares/tripValidation';
import tripController from '../controllers/trip';

const tripRoute = Router();

tripRoute.post('/', tripValidation.postTripValidation, tripController.createTrip);
tripRoute.get('/', tripController.getTrips);


export default tripRoute;
