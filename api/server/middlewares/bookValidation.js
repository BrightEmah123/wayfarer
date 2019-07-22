/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
class bookValidation {
  /**
     * Validates a post request for booking
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
    // userid
    if (!req.body.userid) {
      return res.status(400).send({
        status: 400,
        error: 'Userid is required',
      });
    }
    if (/[A-Za-z]/.test(req.body.userid)) {
      return res.status(400).send({
        status: 400,
        error: 'UserId must be a number',
      });
    }
    next();
  }
}
export default bookValidation;
