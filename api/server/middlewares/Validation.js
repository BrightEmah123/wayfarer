/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
class Validation {
  /**
     * validates signup body
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static signupValidation(req, res, next) {
    // FirstName
    if (!req.body.firstname) {
      return res.status(400).send({
        status: 400,
        error: "User's first name is required",
      });
    }
    if (/\d/.test(req.body.firstname)) {
      return res.status(400).send({
        status: 400,
        error: "User's first name shouldn't be alphanumeric or numeric",
      });
    }
    if (!req.body.firstname.trim()) {
      return res.status(400).send({
        status: 400,
        error: "User's first name shouldn't be empty",
      });
    }
    if (req.body.firstname.trim().length < 2 || req.body.firstname.trim().length > 20) {
      return res.status(400).send({
        status: 400,
        error: "User's first name should be between 2 and 20",
      });
    }
    if (/\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/.test(req.body.firstname)) {
      return res.status(400).send({
        status: 400,
        error: "User's first name should not contain special characters",
      });
    }
    // LAST-NAME
    if (!req.body.lastname) {
      return res.status(400).send({
        status: 400,
        error: "User's last name is required",
      });
    }
    if (/\d/.test(req.body.lastname)) {
      return res.status(400).send({
        status: 400,
        error: "User's last name shouldn't be alphanumeric or numeric",
      });
    }
    if (!req.body.lastname.trim()) {
      return res.status(400).send({
        status: 400,
        error: "User's last name shouldn't be empty",
      });
    }
    if (req.body.lastname.trim().length < 2 || req.body.lastname.trim().length > 20) {
      return res.status(400).send({
        status: 400,
        error: "User's last name should be between 2 and 20",
      });
    }
    if (/\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/.test(req.body.lastname)) {
      return res.status(400).send({
        status: 400,
        error: "User's last name should not contain special characters",
      });
    }

    // EMAIL
    if (!req.body.email) {
      return res.status(400).send({
        status: 400,
        error: "User's email address is required",
      });
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) === false) {
      return res.status(400).send({
        status: 400,
        error: "User's email address is incorrect",
      });
    }

    // PASSWORD
    if (!req.body.password) {
      return res.status(400).send({
        status: 400,
        error: "User's password is required",
      });
    }
    if (req.body.password.trim().length < 6) {
      return res.status(400).send({
        status: 400,
        error: "User's password should be up to 6 characters",
      });
    }
    next();
  }

  /**
     * validates signin body
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static signinValidation(req, res, next) {
    // Email
    if (!req.body.email) {
      return res.status(400).send({
        status: 400,
        error: "User's email is required",
      });
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) === false) {
      return res.status(400).send({
        status: 400,
        error: "User's email address is incorrect",
      });
    }

    // Password
    if (!req.body.password) {
      return res.status(400).send({
        status: 400,
        error: "User's password is required",
      });
    }
    next();
  }
}
export default Validation;
