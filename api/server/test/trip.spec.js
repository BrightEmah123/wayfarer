/* eslint-disable linebreak-style */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import dataFeed from './test-model/dataFeed.spec';

chai.use(chaiHttp);

const { expect } = chai;
const tripURI = '/api/v1/trips';
const loginURL = '/api/v1/auth';
let currentToken;

describe('Trip Creation Test', () => {
  describe('POST api/v1/trips', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURL}/signin`)
        .send(dataFeed.adminSignin[0])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data}`;
          done();
        });
    });
    it('Should successfully create a trip and return a 201 status', (done) => {
      chai.request(app)
        .post(`${tripURI}/`)
        .send(dataFeed.Trip[0])
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.data).to.have.property('tripid');
          expect(res.body.data).to.have.property('busid');
          expect(res.body.data).to.have.property('origin');
          expect(res.body.data).to.have.property('destination');
          expect(res.body.data).to.have.property('tripdate');
          expect(res.body.data).to.have.property('fare');
          expect(res.body.data).to.have.property('status');
          done(err);
        });
    });
    it('Should return a 409 error if email does not exist', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[1])
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 401 error if user is not an admin', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[2])
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the email was not entered', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[3])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the email is incorrect', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[4])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if origin was not entered', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[5])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if origin entered was not between 2 or 50 characters', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[6])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the destination was not entered', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[7])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the destination entered was not between 2 to 50 characters', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[8])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the trip data was not entered', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[9])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the trip data was not the recommended format', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[10])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the fare was not entered', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[11])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the fare was not a number', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[12])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
  });
});
