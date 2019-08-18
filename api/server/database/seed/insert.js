/* eslint-disable linebreak-style */
import debug from 'debug';
import bcrypt from 'bcrypt';
import client from '../helpers/connection';

const Debug = debug('dev');

const adminPassword = bcrypt.hashSync('RyE74wmzS3xIf6Rjz4D', 10);
const userPassword = bcrypt.hashSync('AWERNfghb865v5zS3xIf6Rjz4D', 10);

const insert = `
    INSERT INTO users(firstname, lastname, email, password, isadmin)
    SELECT * FROM (SELECT 'Admin', 'Wayfarer', 'admin@wayfarer.com', '${adminPassword}', true) AS tmp
    WHERE NOT EXISTS (
        SELECT firstname FROM users WHERE firstname = 'Admin'
    ) LIMIT 1;
    
    INSERT INTO users(firstname, lastname, email, password, isadmin)
    SELECT * FROM (SELECT 'John', 'Doe', 'jd@generic.com', '${userPassword}', false) AS tmp
    WHERE NOT EXISTS (
        SELECT firstname FROM users WHERE firstname = 'John' AND lastname = 'Doe'
    ) LIMIT 1;

    INSERT INTO users(firstname, lastname, email, password, isadmin)
    SELECT * FROM (SELECT 'Jane', 'Doe', 'janed@generic.com', '${userPassword}', false) AS tmp
    WHERE NOT EXISTS (
        SELECT firstname FROM users WHERE firstname = 'Jane' AND lastname = 'Doe'
    ) LIMIT 1;

    INSERT INTO users(firstname, lastname, email, password, isadmin)
    SELECT * FROM (SELECT 'Joan', 'Arc', 'jarc@generic.com', '${userPassword}', false) AS tmp
    WHERE NOT EXISTS (
        SELECT firstname FROM users WHERE firstname = 'Joan' AND lastname = 'Arc'
    ) LIMIT 1;

    INSERT INTO trips(origin, destination, tripdate, fare, status)
    SELECT * FROM (SELECT 'rotterdam', 'sofia', TO_TIMESTAMP(1979-01-01), 350000 , 'active') AS tmp
    WHERE NOT EXISTS (
        SELECT tripid FROM trips WHERE tripid = 1
    ) LIMIT 1;

    INSERT INTO trips(origin, destination, tripdate, fare, status)
    SELECT * FROM (SELECT 'venice', 'berlin', TO_TIMESTAMP(2019-09-09), 350000 , 'cancelled') AS tmp
    WHERE NOT EXISTS (
        SELECT tripid FROM trips WHERE tripid = 2
    ) LIMIT 1;

    INSERT INTO trips(origin, destination, tripdate, fare, status)
    SELECT * FROM (SELECT 'munich', 'liverpool', TO_TIMESTAMP(2019-09-09), 350000 , 'active') AS tmp
    WHERE NOT EXISTS (
        SELECT tripid FROM trips WHERE tripid = 3
    ) LIMIT 1;

    INSERT INTO trips(origin, destination, tripdate, fare, status)
    SELECT * FROM (SELECT 'istanbul', 'dresden', TO_TIMESTAMP(2019-09-09), 350000 , 'active') AS tmp
    WHERE NOT EXISTS (
        SELECT tripid FROM trips WHERE tripid = 4
    ) LIMIT 1;

`;
client.query(insert, (error) => {
  Debug('Rows Inserted');
  Debug('error: ', error);
  client.end();
});
