/* eslint-disable linebreak-style */
import client from '../helpers/connection';

export default {
  createTrip: ({
    origin,
    destination,
    tripDate,
    fare,
  }) => client.query({
    text: 'INSERT INTO trips(origin, destination, tripDate, fare) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [origin, destination, tripDate, fare],
  }),
  findByoriginAnddestination: (origin, destination) => client.query({
    text: 'SELECT * FROM trips WHERE origin=$1 AND destination=$2',
    values: [origin, destination],
  }),
  filterByorigin: origin => client.query({
    text: 'SELECT * FROM trips WHERE origin=$1',
    values: [origin],
  }),
  filterBydestination: destination => client.query({
    text: 'SELECT * FROM trips WHERE destination=$1',
    values: [destination],
  }),
  findByTripId: tripid => client.query({
    text: 'SELECT * FROM trips WHERE tripid=$1 LIMIT 1',
    values: [tripid],
  }),
  findFromTrip: () => client.query({
    text: 'SELECT * FROM trips',
    values: [],
  }),
  cancelATrip: (status, tripid) => client.query({
    text: 'UPDATE trips SET status = $1 WHERE tripid = $2;',
    values: [status, tripid],
  }),
  findCancelledTrips: (status, tripid) => client.query({
    text: 'SELECT * FROM trips WHERE status = $1 AND tripid = $2',
    values: [status, tripid],
  }),
};
