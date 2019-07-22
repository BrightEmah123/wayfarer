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
  findByorigin: (origin, destination) => client.query({
    text: 'SELECT * FROM trips WHERE origin=$1 AND destination=$2',
    values: [origin, destination],
  }),
  findByTripId: tripid => client.query({
    text: 'SELECT * FROM trips WHERE tripid=$1 LIMIT 1',
    values: [tripid],
  }),
  findFromTrip: () => client.query({
    text: 'SELECT * FROM trips',
    values: [],
  }),
  findTripsUsersId: (tripid, userid) => client.query({
    text: 'SELECT tr.tripid, u.userid, u.isadmin FROM trips tr, users u WHERE tripid = $1 AND userid = $2',
    values: [tripid, userid],
  }),
};
