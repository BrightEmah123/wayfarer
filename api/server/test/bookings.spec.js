/* eslint-disable linebreak-style */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import dataFeed from './test-model/dataFeed.spec';

chai.use(chaiHttp);
const { expect } = chai;
const bookURI = '/api/v1/bookings';
const loginURI = '/api/v1/auth';
let currentToken;

describe('Book a Seat Test', () => {
  describe('POST /api/v1/bookings', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURI}/signin`)
        .send(dataFeed.User[10])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data}`;
          done();
        });
    });
    it('Should successfully book a seat and return a 201 status', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[0])
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.data).to.have.property('bookingid');
          expect(res.body.data).to.have.property('userid');
          expect(res.body.data).to.have.property('tripid');
          expect(res.body.data).to.have.property('busid');
          expect(res.body.data).to.have.property('tripdate');
          expect(res.body.data).to.have.property('seatnumber');
          expect(res.body.data).to.have.property('firstname');
          expect(res.body.data).to.have.property('lastname');
          expect(res.body.data).to.have.property('email');
          done(err);
        });
    });
    it('Should return a 401 error if the user booking the trip is an admin', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[1])
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 409 error if the user id does exist', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[2])
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 error if the trip id was not entered', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[3])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 error if the user id was not entered', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[4])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 error if the trip id entered was not a number', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[5])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 error if the user id entered was not a number', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[6])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
  });
});
