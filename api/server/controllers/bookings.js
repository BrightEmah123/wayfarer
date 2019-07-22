/* eslint-disable linebreak-style */
import '@babel/polyfill';
import bookings from '../database/models/bookings';
import trips from '../database/models/trips';
import users from '../database/models/users';
import Authenticate from '../middlewares/Authentication';

class bookController {
  /**
     * @description User books a trip
     * @param {*} req
     * @param {*} res
     */
  static async bookTrip(req, res) {
    const { tripid, userid } = req.body;
    try {
      const findId = await trips.findTripsUsersId(tripid, userid);
      const result = findId.rows[0];
      if (!result) {
        return res.status(409).json({
          status: 409,
          error: 'Id not found',
        });
      }
      const status = await users.findByAdminStatus();
      const checkStatus = status.rows[0];
      if (checkStatus.isadmin && result.isadmin === true) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized to book trips',
        });
      }
      await bookings.bookTrip(req.body);
      const bookData = await bookings.findBookings(userid, tripid);
      const data = bookData.rows[0];
      return res.status(201).json({
        status: 201,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}
export default bookController;
