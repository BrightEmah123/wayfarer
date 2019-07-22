/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
class tripValidation {
  /**
     * validates trip creation by admin
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static postTripValidation(req, res, next) {
    //   Email
    if (!req.body.userid) {
      return res.status(400).send({
        status: 400,
        error: 'Id is required',
      });
    }
    if (/[A-Za-z]/.test(req.body.userid)) {
      return res.status(400).send({
        status: 400,
        error: 'Id must be a number',
      });
    }
    if (!req.body.origin) {
      return res.status(400).send({
        status: 400,
        error: 'Origin is required',
      });
    }
    if (req.body.origin.trim().length < 2 || req.body.origin.trim().length > 50) {
      return res.status(400).send({
        status: 400,
        error: 'Origin should be between 2 and 50 words',
      });
    }
    if (!req.body.destination) {
      return res.status(400).send({
        status: 400,
        error: 'Destination is required',
      });
    }
    if (req.body.destination.trim().length < 2 || req.body.destination.trim().length > 50) {
      return res.status(400).send({
        status: 400,
        error: 'Destination should be between 2 and 50 words',
      });
    }
    if (!req.body.tripDate) {
      return res.status(400).send({
        status: 400,
        error: 'Trip-Date is required',
      });
    }
    if (/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/.test(req.body.tripDate) === false) {
      return res.status(400).send({
        status: 400,
        error: 'Trip-Date must either be in the dd/mm/yy or dd.mm.yy or dd-mm-yy format',
      });
    }
    if (!req.body.fare) {
      return res.status(400).send({
        status: 400,
        error: 'Fare is required',
      });
    }
    if (/[A-Za-z]/.test(req.body.fare)) {
      return res.status(400).send({
        status: 400,
        error: 'Fare must be a number',
      });
    }
    next();
  }
}
export default tripValidation;
