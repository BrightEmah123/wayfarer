/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

class Authentication {
  /**
     * @description Generate access token
     */
  static generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '24h' });
  }

  /**
   * @description Verify access token
   */
  static verifyToken(token) {
    return jwt.verify(token, secret);
  }

  /**
   * @description Create password hash
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * @description Compare password
   */
  static comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
export default Authentication;
