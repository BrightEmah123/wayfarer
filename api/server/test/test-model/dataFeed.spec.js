/* eslint-disable linebreak-style */
import faker from 'faker';

const firstname = faker.name.firstName();
const lastname = faker.name.lastName();
const email = faker.internet.email();
const password = faker.internet.password();
const origin = faker.address.state();
const destination = faker.address.state();
const fare = faker.finance.amount();

const User = [
  {
    // Register newUser
    firstname,
    lastname,
    email,
    password,
  },
  {
    // Omitted FirstName
    lastname,
    email,
    password,
  },
  {
    // Omitted LastName
    firstname,
    email,
    password,
  },
  {
    // Omitted Email
    firstname,
    lastname,
    password,
  },
  {
    // Omitted Password
    firstname,
    lastname,
    email,
  },
  {
    // Not-String firstName
    firstname: 111,
    lastname,
    email,
    password,
  },
  {
    // Not-String lastName
    firstname,
    lastname: 111,
    email,
    password,
  },
  {
    // Login User
    email,
    password,
  },
  {
    // Omitted-Mail Login User
    password,
  },
  {
    // Omitted-Password Login User
    email,
  },
  {
    // Seeded User Login
    email: 'jd@generic.com',
    password: 'AWERNfghb865v5zS3xIf6Rjz4D',
  },
];
const InvalidAccess = [
  {
    // Email already exists
    firstname,
    lastname,
    email: 'jd@generic.com',
    password,
  },
  {
    //  Incorrect Credentials
    email: 'jd@generic.com',
    password,
  },
  {
    // Invalid mail or password
    email: 'jada@generic.com',
    password: 'AWERgdhfjio0Nfghb865v5zS3xIf6Rjz4D',
  },
];

const Trip = [
  {
    // Create Trip
    userid: 1,
    origin,
    destination,
    tripDate: '11/2/1997',
    fare,
  },
  {
    // User not found
    userid: 1234567890,
    origin,
    destination,
    tripDate: '11/2/1997',
    fare,
  },
  {
    // User is not admin
    userid: 2,
    origin,
    destination,
    tripDate: '11/5/2003',
    fare,
  },
  {
    // No mail
    origin,
    destination,
    tripDate: '11/5/2003',
    fare,
  },
  {
    // Incorrect admin mail
    userid: 'aa',
    origin,
    destination,
    tripDate: '11/5/2003',
    fare,
  },
  {
    // No origin
    email: 'admin@wayfarer.com',
    destination,
    tripDate: '11/5/2003',
    fare,
  },
  {
    // Origin must be 2 to 50 characters
    email: 'admin@wayfarer.com',
    origin: 'a',
    destination,
    tripDate: '11/5/2003',
    fare,
  },
  {
    // No destination
    email: 'admin@wayfarer.com',
    origin,
    tripDate: '11/5/2003',
    fare,
  },
  {
    // Destination must be 2 to 50 characters
    email: 'admin@wayfarer.com',
    origin,
    destination: 'b',
    tripDate: '11/5/2003',
    fare,
  },
  {
    // No trip-Date
    email: 'admin@wayfarer.com',
    origin,
    destination,
    fare,
  },
  {
    // Invalid Trip-Date format
    email: 'admin@wayfarer.com',
    origin,
    destination,
    tripDate: '11th August 2003',
    fare,
  },
  {
    // No fare
    email: 'admin@wayfarer.com',
    origin,
    destination,
    tripDate: '11/08/2003',
  },
  {
    // Fare must be a number
    email: 'admin@wayfarer.com',
    origin,
    destination,
    tripDate: '11/08/2003',
    fare: 'alo',
  },
];
const adminSignin = [
  {
    email: 'admin@wayfarer.com',
    password: 'RyE74wmzS3xIf6Rjz4D',
  },
];
const bookTrip = [
  {
    // Book a Trip
    userid: 2,
    tripid: 1,
  },
  {
    // User is an admin
    userid: 1,
    tripid: 1,
  },
  {
    // User id does not exist
    userid: 1234567890,
    tripid: 1,
  },
  {
    // Trip id was not entered
    userid: 2,
  },
  {
    // User id was not entered
    tripid: 1,
  },
  {
    // Trip id is not a number
    userid: 2,
    tripid: 'abcdef',
  },
  {
    // User id is not a number
    userid: 'abcdef',
    tripid: 1,
  },
];

export default {
  User, InvalidAccess, Trip, adminSignin, bookTrip,
};
