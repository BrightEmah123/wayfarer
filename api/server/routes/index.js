/* eslint-disable linebreak-style */
import express from 'express';
import authRoute from './auth';
import tripRoute from './trip';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/trips', tripRoute);


export default router;
