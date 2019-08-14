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
  {
    // Seeded 2nd User Login
    email: 'janed@generic.com',
    password: 'AWERNfghb865v5zS3xIf6Rjz4D',
  },
  {
    // Seeded 3rd User Login
    email: 'jarc@generic.com',
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
    origin,
    destination,
    tripDate: '08/08/2027',
    fare,
  },
  {
    // Origin was not entered
    destination,
    tripDate: '08/08/2027',
    fare,
  },
  {
    // Origin must be 2 to 50 characters
    origin: 'a',
    destination,
    tripDate: '08/08/2027',
    fare,
  },
  {
    // No destination
    origin,
    tripDate: '08/08/2027',
    fare,
  },
  {
    // Destination must be 2 to 50 characters
    origin,
    destination: 'b',
    tripDate: '08/08/2027',
    fare,
  },
  {
    // No trip-Date
    origin,
    destination,
    fare,
  },
  {
    // Trip Year is not current or greater than current year
    origin,
    destination,
    tripDate: '08/08/1997',
    fare,
  },
  {
    // Trip Month is not current or greater than current month
    origin,
    destination,
    tripDate: '02/08/2019',
    fare,
  },
  {
    // Invalid Trip-Date format
    origin,
    destination,
    tripDate: '11th August 2019',
    fare,
  },
  {
    // No fare
    origin,
    destination,
    tripDate: '09/09/2019',
  },
  {
    // Fare must be a number
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
    tripid: 1,
  },
  {
    // Cancelled Trip
    tripid: 2,
  },
  {
    // Trip id does not exist
    tripid: 9999,
  },
  {
    // user id was not entered
  },
  {
    // trip id is not a number
    tripid: 'aa',
  },
];

export default {
  User, InvalidAccess, Trip, adminSignin, bookTrip,
};
