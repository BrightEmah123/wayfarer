/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import bcrypt from 'bcrypt';
import client from '../helpers/connection';
import generate from '../helpers/generate';

export default {
  createEntity: ({
    id,
    firstname,
    lastname,
    email,
    password,
  }) => client.query({
    text: 'INSERT INTO users(id, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [generate.generateId(), firstname, lastname, email, bcrypt.hashSync(password, 10)],
  }),
  findByEmail: email => client.query({
    text: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
    values: [email],
  }),
};
