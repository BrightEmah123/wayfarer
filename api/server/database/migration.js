/* eslint-disable linebreak-style */
const users = ` CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  isadmin BOOLEAN DEFAULT false 
);`;

const trips = `CREATE TABLE IF NOT EXISTS trips (
  tripid SERIAL NOT NULL PRIMARY KEY,
  busId SERIAL NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  tripDate TIMESTAMP NOT NULL,
  fare DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'active'
)`;

const createTables = `
  ${users}${trips}
`;

export default createTables;
