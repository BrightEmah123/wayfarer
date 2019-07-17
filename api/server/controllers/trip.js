/* eslint-disable linebreak-style */
import '@babel/polyfill';
import trips from '../database/models/trips';
import users from '../database/models/users';

class tripController {
  /**
     * @description creates a trip
     * @param {object} req request object
     * @param {object} res response object
     * @returns {object} JON response
     */
  static async createTrip(req, res) {
    const {
      email, origin, destination, tripDate, fare,
    } = req.body;
    try {
      const checkStatus = await users.findByAdminStatus();
      const list = await users.findByEmail(email);
      const listResult = list.rows[0];
      const result = checkStatus.rows[0];
      if (!listResult) {
        return res.status(409).json({
          status: 409,
          error: 'Email does not exist',
        });
      }
      if (result.isadmin === listResult.isadmin) {
        const tripData = await trips.createTrip(req.body);
        const data = tripData.rows[0];
        return res.status(201).json({
          status: 201,
          data: {
            ...data,
          },
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized to create trips',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default tripController;
