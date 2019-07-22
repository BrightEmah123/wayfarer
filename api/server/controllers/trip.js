/* eslint-disable linebreak-style */
import '@babel/polyfill';
import trips from '../database/models/trips';
import users from '../database/models/users';

class tripController {
  /**
     * @description creates a trip
     * @param {object} req request object
     * @param {object} res response object
     * @returns {object} JSON response
     */
  static async createTrip(req, res) {
    const {
      userid, origin, destination, tripDate, fare,
    } = req.body;
    try {
      const checkStatus = await users.findByAdminStatus();
      const list = await users.findById(userid);
      const listResult = list.rows[0];
      const result = checkStatus.rows[0];
      if (!listResult) {
        return res.status(409).json({
          status: 409,
          error: 'Id does not exist',
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

  /**
   * @description get all trips
   * @param {*} req
   * @param {*} res
   * @returns {object} JSON response
   */
  static async getTrips(req, res) {
    const { origin, destination } = req.query;
    if (origin && destination) {
      const record = await trips.findByorigin(req.query);
      const data = record.rows[0];
      res.status(200).json({
        status: 200,
        data,
      });
      return;
    }
    const records = await trips.findFromTrip();
    const data = records.rows;
    res.status(200).json({
      status: 200,
      data,
    });
  }
}
export default tripController;
