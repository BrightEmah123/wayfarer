/* eslint-disable linebreak-style */
import '@babel/polyfill';
import bookings from '../database/models/bookings';
import trips from '../database/models/trips';

class bookController {
  /**
     * @description User books a trip
     * @param {*} req
     * @param {*} res
     */
  static async bookTrip(req, res) {
    const { userid } = req.user;
    const { tripid } = req.body;
    try {
      const findId = await trips.findByTripId(tripid);
      const result = findId.rows[0];
      if (!result) {
        res.status(409).json({
          status: 409,
          error: 'Trip does not exist',
        });
        return;
      }
      const cancelledTrip = result.status;
      if (cancelledTrip === 'cancelled') {
        res.status(400).json({
          status: 400,
          error: 'This Trip has been cancelled',
        });
        return;
      }
      await bookings.bookATrip(userid, tripid);
      const bookData = await bookings.findBookings(userid, tripid);
      const data = bookData.rows[0];
      res.status(201).json({
        status: 201,
        data,
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * @description User/Admin can get bookings
   * @param {*} req
   * @param {*} res
   */
  static async getBookings(req, res) {
    const { isadmin, userid } = req.user;
    try {
      if (isadmin) {
        const adminRecords = await bookings.findAllBookingsAdmin();
        const data = adminRecords.rows;
        res.status(200).json({
          status: 200,
          data,
        });
        return;
      }
      const userRecords = await bookings.findAllBookings(userid);
      const userData = userRecords.rows;
      if (!userData[0]) {
        res.status(404).json({
          status: 404,
          error: 'No bookings made by this user',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        data: userData,
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * @description Delete a booking
   * @param {*} req
   * @param {*} res
   */
  static async delBookings(req, res) {
    const { userid } = req.user;
    const { bookingid } = req.params;
    const id = Number(bookingid);
    try {
      const findbooks = await bookings.getBookings(id);
      const bookData = findbooks.rows[0];
      if (!bookData) {
        res.status(404).json({
          status: 404,
          error: 'Booking Id does not exist',
        });
        return;
      }
      const getBookings = await bookings.sortBookings(id, userid);
      const data = getBookings.rows;
      if (data[0]) {
        await bookings.deleteByBookingId(id, userid);
        res.status(200).json({
          status: 200,
          message: 'Bookings deleted successfully',
        });
        return;
      }
      res.status(401).json({
        status: 401,
        error: 'User Id does not match booking id',
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}
export default bookController;
