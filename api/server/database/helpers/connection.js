/* eslint-disable linebreak-style */
import { Client } from 'pg';
import debug from 'debug';

const Debug = debug('dev');

const client = new Client({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'hunter2',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  ssl: process.env.SSL || false,
});

client.connect();

export default client;
