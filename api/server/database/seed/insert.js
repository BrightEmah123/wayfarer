/* eslint-disable linebreak-style */
import debug from 'debug';
import generate from '../helpers/generate';
import client from '../helpers/connection';

const Debug = debug('dev');

const insert = `
    INSERT INTO users(id, firstname, lastname, email, password, isadmin)
    SELECT * FROM (SELECT ${generate.generateId()},'Admin', 'Wayfarer', 'admin@wayfarer.com', 'RyE74wmzS3xIf6Rjz4D', true) AS tmp
    WHERE NOT EXISTS (
        SELECT firstname FROM users WHERE firstname = 'Admin'
    ) LIMIT 1;
    
    INSERT INTO users(id, firstname, lastname, email, password, isadmin)
    SELECT * FROM (SELECT ${generate.generateId()},'John', 'Doe', 'jd@generic.com', 'AWERNfghb865v5zS3xIf6Rjz4D', false) AS tmp
    WHERE NOT EXISTS (
        SELECT firstname FROM users WHERE firstname = 'John'
    ) LIMIT 1;
`;
client.query(insert, (error) => {
  Debug('Rows Inserted');
  Debug('error: ', error);
  client.end();
});
