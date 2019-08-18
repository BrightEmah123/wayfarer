/* eslint-disable linebreak-style */
import Authentication from './Authentication';

/**
 * @description Authenticates User
 */
class Authorization {
  /**
 * @description Verifies if user is an admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
  static async verifyAdmin(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      res.status(403).send({
        status: 403,
        error: 'Not Authorized',
      });
      return;
    }
    const decoded = Authentication.verifyToken(token);
    const checkStatus = decoded.isadmin;
    if (!checkStatus) {
      res.status(401).send({
        status: 401,
        error: 'Only Admin can access this route',
      });
      return;
    }
    req.user = decoded;
    next();
  }

  /**
   * @description Verifies if user is authenticated
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async verifyUser(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      res.status(403).send({
        success: false,
        message: 'Not Authorized',
      });
      return;
    }

    const decoded = Authentication.verifyToken(token);
    if (!decoded) {
      res.status(401).send({
        success: false,
        message: 'Invalid token',
      });
      return;
    }
    req.user = decoded;
    next();
  }
}
export default Authorization;
