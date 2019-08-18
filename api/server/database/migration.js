/* eslint-disable linebreak-style */
const users = ` CREATE TABLE IF NOT EXISTS users (
  userid SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  isadmin BOOLEAN DEFAULT false 
);`;

const trips = `CREATE TABLE IF NOT EXISTS trips (
  tripid SERIAL PRIMARY KEY,
  busid SERIAL NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  tripdate TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fare DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'active'
);`;

const bookings = `CREATE TABLE IF NOT EXISTS bookings (
  bookingid SERIAL PRIMARY KEY,
  userid INTEGER NOT NULL,
  tripid INTEGER NOT NULL,
  createdon TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  seatnumber INTEGER NOT NULL,
  FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE,
  FOREIGN KEY (tripid) REFERENCES trips(tripid) ON DELETE CASCADE
);
`;

const createTables = `
  ${users}${trips}${bookings}
`;

export default createTables;
