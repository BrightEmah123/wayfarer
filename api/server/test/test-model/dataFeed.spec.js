/* eslint-disable linebreak-style */
import faker from 'faker';

const firstname = faker.name.firstName();
const lastname = faker.name.lastName();
const email = faker.internet.email();
const password = faker.internet.password();

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
];
const InvalidAccess = [
  {
    // Email already exists
    firstname,
    lastname,
    email: 'afeefie@gmail.com',
    password,
  },
  {
    // Incorrect Credentials
    email: 'bolas@gmail.com',
    password: 'cmofdqwarddviop',
  },
  {
    // Invalid mail or password
    email: 'boals@gmail.com',
    password: 'cmaofdqwrddviop',
  },
];

export default { User, InvalidAccess };
