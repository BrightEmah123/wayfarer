/* eslint-disable linebreak-style */
import debug from 'debug';
import client from '../helpers/connection';

const Debug = debug('dev');

const dropBookings = `
    DROP TABLE IF EXISTS bookings CASCADE; 
`;

const dropTrips = `
    DROP TABLE IF EXISTS trips CASCADE;
`;

const dropUsers = `
    DROP TABLE IF EXISTS users CASCADE;
`;


const dropTables = `${dropBookings}${dropTrips}${dropUsers}`;

client.query(dropTables, (error) => {
  Debug('Tables Dropped');
  Debug('error: ', error);
  client.end();
});
