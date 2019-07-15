/* eslint-disable linebreak-style */
import '@babel/polyfill';
import users from '../database/models/users';
import Authenticate from '../middlewares/Authentication';


class authController {
  /**
     * @description Registers new user account
     * @param {object} req request object
     * @param {object} res response object
     * @returns {object} JON response
     */
  static async signup(req, res) {
    const {
      firstname, lastname, email, password, isadmin,
    } = req.body;
    try {
      const { rows } = await users.createEntity(req.body);
      const data = rows[0];
      delete data.password;
      const token = Authenticate.generateToken({ id: data.id, email: data.email });
      res.status(201).json({
        status: 200,
        token,
        data,
      });
      return;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        res.status(409).json({
          message: 'User with email already exist',
        });
        return;
      }
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default authController;
