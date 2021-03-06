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
    // Month => mnth
    const mnth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // Date-Check
    const checkYear = () => {
      const year = {
        year: 'numeric',
      };
      const currentYear = new Date().toLocaleString('en-us', year);
      return Number(currentYear);
    };
    const checkMonth = () => {
      const month = {
        month: 'numeric',
      };
      const currentMonth = new Date().toLocaleString('en-us', month);
      return Number(currentMonth);
    };
    const slicedYear = () => {
      if (req.body.tripDate.length === 10) {
        const sizeTen = req.body.tripDate.slice(6);
        return Number(sizeTen);
      }
    };
    const slicedMonth = () => {
      if (req.body.tripDate.length === 10) {
        const sizeTen = req.body.tripDate.slice(0, 2);
        return Number(sizeTen);
      }
    };
    //   Email
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
    if (checkYear() > slicedYear()) {
      return res.status(400).send({
        status: 400,
        error: `The Year for the trip must be year ${checkYear()} and above`,
      });
    }
    if (checkMonth() > slicedMonth()) {
      return res.status(400).send({
        status: 400,
        error: `The Month for the trip must be ${mnth[checkMonth() - 1]} or above`,
      });
    }
    if (/^([0][1-9]|[1][0-2])[./-]([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0-9]{4}|[0-9]{2})$/.test(req.body.tripDate) === false) {
      return res.status(400).send({
        status: 400,
        error: 'Trip-Date must either be in the mm/dd/yyyy or mm.dd.yyyy or mm-dd-yyyy format',
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

  /**
   * @description validates cancel trip
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static patchTripValidation(req, res, next) {
    if (/[A-Za-z]/.test(req.params.tripid)) {
      return res.status(400).send({
        status: 400,
        error: 'Trip Id must be a number',
      });
    }
    if (/\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\-|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/.test(req.params.tripid)) {
      return res.status(400).send({
        status: 400,
        error: 'Trip Id should not contain special characters or negative values',
      });
    }
    next();
  }
}
export default tripValidation;
