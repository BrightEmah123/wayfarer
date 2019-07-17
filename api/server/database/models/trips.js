/* eslint-disable linebreak-style */
import bcrypt from 'bcrypt';
import client from '../helpers/connection';
import generate from '../helpers/generate';

export default {
  createTrip: ({
    tripid,
    busid,
    origin,
    destination,
    tripDate,
    fare,
  }) => client.query({
    text: 'INSERT INTO trips(tripid, busid, origin, destination, tripDate, fare) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    values: [generate.generateId(), generate.generateId(), origin, destination, tripDate, fare],
  }),
};
