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
        data: {
          ...data,
          token,
        },
      });
      return;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        res.status(409).json({
          status: 409,
          error: 'User with email already exist',
        });
        return;
      }
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
     * @description Login user
     * @param {object} req request object
     * @param {object} res response object
     * @returns {object} JON response
     */
  static async signin(req, res) {
    const { email } = req.body;
    const findUser = await users.findByEmail(email);
    const result = findUser.rows[0];
    if (!result) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid email or password',
      });
    }
    const password = Authenticate.comparePassword(req.body.password, result.password);
    const token = Authenticate.generateToken({ id: result.id, email: result.email });
    if (password) {
      delete result.password;
      return res.status(200).json({
        status: 200,
        data: {
          ...result,
          token,
        },
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Login credentials is Incorrect',
    });
  }
}

export default authController;
