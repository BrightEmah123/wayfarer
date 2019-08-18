/* eslint-disable linebreak-style */
import '@babel/polyfill';
import trips from '../database/models/trips';
import users from '../database/models/users';

class tripController {
  /**
     * @description admin creates a trip
     * @param {object} req request object
     * @param {object} res response object
     * @returns {object} JSON response
     */
  static async createTrip(req, res) {
    const status = req.user;
    const {
      origin, destination, tripDate, fare,
    } = req.body;
    try {
      if (status) {
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
    try {
      if (origin) {
        const originRecords = await trips.filterByorigin(origin);
        const originData = originRecords.rows;
        if (!originData[0]) {
          res.status(401).json({
            status: 401,
            error: 'Origin not found',
          });
          return;
        }
        res.status(200).json({
          status: 200,
          data: originData,
        });
        return;
      }
      if (destination) {
        const destRecords = await trips.filterBydestination(destination);
        const destData = destRecords.rows;
        if (!destData[0]) {
          res.status(401).json({
            status: 401,
            error: 'Destination not found',
          });
          return;
        }
        res.status(200).json({
          status: 200,
          data: destData,
        });
        return;
      }
      const records = await trips.findFromTrip();
      const data = records.rows;
      if (records) {
        res.status(200).json({
          status: 200,
          data,
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * @description Cancel all trips
   * @param {*} req
   * @param {*} res
   * @returns {object} JSON response
   */
  static async cancelTrips(req, res) {
    const adminStatus = req.user;
    const { tripid } = req.params;
    const id = Number(tripid);
    const status = 'cancelled';
    try {
      const findTrips = await trips.findByTripId(id);
      const getAllTrips = findTrips.rows[0];
      if (!getAllTrips) {
        res.status(404).json({
          status: 404,
          error: 'Tripid does not exist',
        });
        return;
      }
      const checkTrips = await trips.findCancelledTrips(status, id);
      const data = checkTrips.rows;
      if (data[0]) {
        res.status(401).json({
          status: 401,
          error: 'This Trip has been cancelled already',
        });
        return;
      }
      if (adminStatus) {
        await trips.cancelATrip(status, id);
        res.status(200).json({
          status: 200,
          message: 'Trip cancelled successfully',
        });
        return;
      }
      res.status(401).json({
        status: 401,
        error: 'Unauthorized to cancel trips',
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}
export default tripController;
