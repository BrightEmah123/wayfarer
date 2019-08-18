/* eslint-disable linebreak-style */
import client from '../helpers/connection';
import generate from '../helpers/generate';

const queryText = `
  SELECT u.firstname, u.lastname, u.email, tr.busid, tr.tripdate, tr.origin, tr.destination, b.bookingid, b.userid, b.tripid, b.seatnumber 
    FROM users u, trips tr, bookings b 
      WHERE u.userid = $1 AND tr.tripid = $2 AND b.userid = u.userid 
        AND b.bookingid = (SELECT max(bookingid) FROM bookings);
`;

const bookQuery = `
  SELECT b.bookingid, b.userid, tr.tripid, tr.busid, tr.tripdate, b.seatnumber, u.firstname, u.lastname, u.email 
    FROM users u,bookings b, trips tr 
      WHERE b.userid = $1 AND b.tripid = tr.tripid 
        AND b.userid = u.userid;
`;

const adminQuery = `
  SELECT b.bookingid, b.userid, b.tripid, tr.busid, tr.tripdate, tr.origin, tr.destination, b.seatnumber, u.firstname, u.lastname, u.email 
    FROM users u, bookings b, trips tr 
      WHERE b.tripid=tr.tripid AND u.userid=b.userid;
`;

export default {
  bookATrip: (userid, tripid, seatnumber) => client.query({
    text: 'INSERT INTO bookings(userid, tripid, seatnumber) VALUES ($1, $2, $3) RETURNING *',
    values: [userid, tripid, generate.generateId()],
  }),
  findBookings: (userid, tripid) => client.query({
    text: queryText,
    values: [userid, tripid],
  }),
  findAllBookings: userid => client.query({
    text: bookQuery,
    values: [userid],
  }),
  findAllBookingsAdmin: () => client.query({
    text: adminQuery,
    values: [],
  }),
  getBookings: bookingid => client.query({
    text: 'SELECT * FROM bookings WHERE bookingid = $1',
    values: [bookingid],
  }),
  sortBookings: (bookingid, userid) => client.query({
    text: 'SELECT * FROM bookings WHERE bookingid = $1 AND userid = $2',
    values: [bookingid, userid],
  }),
  deleteByBookingId: (bookingid, userid) => client.query({
    text: 'DELETE FROM bookings WHERE bookingid = $1 AND userid = $2',
    values: [bookingid, userid],
  }),
};
