/* eslint-disable linebreak-style */
import bcrypt from 'bcrypt';
import client from '../helpers/connection';
import generate from '../helpers/generate';

const queryText = `
  SELECT u.firstname, u.lastname, u.email, tr.busid, tr.tripdate, b.bookingid, b.userid, b.tripid, b.seatnumber 
    FROM users u, trips tr, bookings b 
      WHERE u.userid = $1 AND tr.tripid = $2 AND b.userid = u.userid 
        AND b.bookingid = (SELECT max(bookingid) FROM bookings);
`;
export default {
  bookTrip: ({
    userid,
    tripid,
    seatnumber,
  }) => client.query({
    text: 'INSERT INTO bookings(userid, tripid, seatnumber) VALUES ($1, $2, $3) RETURNING *',
    values: [userid, tripid, generate.generateId()],
  }),
  findBookings: (userid, tripid) => client.query({
    text: queryText,
    values: [userid, tripid],
  }),
};
