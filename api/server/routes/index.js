/* eslint-disable linebreak-style */
import express from 'express';
import authRoute from './auth';
import tripRoute from './trip';
import bookRoute from './bookings';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/trips', tripRoute);
router.use('/bookings', bookRoute);


export default router;
