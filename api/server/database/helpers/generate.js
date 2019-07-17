/* eslint-disable linebreak-style */
import bcrypt from 'bcrypt';

class generator {
  /**
   * @description generate password
   */
  static generateId() {
    return Math.floor(Math.random() * (999 - 100 + 1));
  }

  /**
   * @description Create password hash
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }
}

export default generator;
