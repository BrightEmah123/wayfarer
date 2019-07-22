/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import bcrypt from 'bcrypt';
import client from '../helpers/connection';
import generate from '../helpers/generate';

export default {
  createEntity: ({
    firstname,
    lastname,
    email,
    password,
  }) => client.query({
    text: 'INSERT INTO users(firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [firstname, lastname, email, bcrypt.hashSync(password, 10)],
  }),
  findByAdminStatus: () => client.query({
    text: 'SELECT * FROM users WHERE isadmin = true',
    values: [],
  }),
  findById: userid => client.query({
    text: 'SELECT * FROM users WHERE userid = $1 LIMIT 1',
    values: [userid],
  }),
  findByEmail: email => client.query({
    text: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
    values: [email],
  }),
};
