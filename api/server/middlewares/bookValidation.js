/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
class bookValidation {
  /**
     * @description Validates a post request for booking
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static postBookValidation(req, res, next) {
    // tripid
    if (!req.body.tripid) {
      return res.status(400).send({
        status: 400,
        error: 'TridId is required',
      });
    }
    if (/[A-Za-z]/.test(req.body.tripid)) {
      return res.status(400).send({
        status: 400,
        error: 'TridId must be a number',
      });
    }
    next();
  }

  /**
   * @description Validates get request for bookings
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static getBookValidation(req, res, next) {
    if (!req.query.userid) {
      return res.status(400).send({
        status: 400,
        error: 'User id is required',
      });
    }
    if (/[A-Za-z]/.test(req.query.userid)) {
      return res.status(400).send({
        status: 400,
        error: 'User id must be a number',
      });
    }
    next();
  }
}
export default bookValidation;
