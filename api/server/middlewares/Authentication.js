/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

class Authentication {
  /**
     * @description Generate access token
     */
  static generateToken(payload) {
    return jwt.sign({ payload }, process.env.SECRET, { expiresIn: '5d' });
  }

  /**
   * @description Verify access token
   */
  static verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
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
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
export default Authentication;
