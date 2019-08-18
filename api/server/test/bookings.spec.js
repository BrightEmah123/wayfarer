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
let userToken;
let SecondUserToken;
let adminToken;

describe('BOOK A SEAT TEST', () => {
  describe('POST /api/v1/bookings', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURI}/signin`)
        .send(dataFeed.User[10])
        .end((loginErr, loginRes) => {
          currentToken = loginRes.body.data.token;
          done(loginErr);
        });
    });
    it('Should successfully book a seat and return a 201 status code', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[0])
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.data).to.have.property('firstname');
          expect(res.body.data).to.have.property('lastname');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data).to.have.property('busid');
          expect(res.body.data).to.have.property('tripdate');
          expect(res.body.data).to.have.property('origin');
          expect(res.body.data).to.have.property('destination');
          expect(res.body.data).to.have.property('bookingid');
          expect(res.body.data).to.have.property('userid');
          expect(res.body.data).to.have.property('tripid');
          expect(res.body.data).to.have.property('seatnumber');
          done(err);
        });
    });
    it('Should return a 400 status code if the trip was cancelled', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[1])
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 409 error if the trip id does exist', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[2])
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 error if the trip id was not entered', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[3])
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 error if the trip id entered was not a number', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[4])
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
  });
});

describe('GET BOOKINGS TEST', () => {
  describe('GET /api/v1/bookings', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURI}/signin`)
        .send(dataFeed.adminSignin[0])
        .end((loginErr, loginRes) => {
          adminToken = loginRes.body.data.token;
          done(loginErr);
        });
    });
    it('Admin: Should successfully retrieve all bookings made by the user', (done) => {
      chai.request(app)
        .get(`${bookURI}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          done(err);
        });
    });
    it('User: Should successfully retrieve all bookings made', (done) => {
      chai.request(app)
        .get(`${bookURI}`)
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          done(err);
        });
    });
    before((done) => {
      chai.request(app)
        .post(`${loginURI}/signin`)
        .send(dataFeed.User[11])
        .end((loginErr, loginRes) => {
          userToken = loginRes.body.data.token;
          done(loginErr);
        });
    });
    it('Should return a 404 status code if no booking was made by the user', (done) => {
      chai.request(app)
        .get(`${bookURI}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
  });
});

describe('DELETE BOOKINGS TEST', () => {
  describe('DEL /api/v1/bookings/:bookingid', () => {
    it('Should successfully delete bookings made by the user', (done) => {
      chai.request(app)
        .delete(`${bookURI}/1`)
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          done(err);
        });
    });
    it('Should return a 404 status code if booking id does not exist', (done) => {
      chai.request(app)
        .delete(`${bookURI}/9999`)
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    before((done) => {
      chai.request(app)
        .post(`${loginURI}/signin`)
        .send(dataFeed.User[12])
        .end((loginErr, loginRes) => {
          SecondUserToken = loginRes.body.data.token;
          done(loginErr);
        });
    });
    it('User-Test-Case 1: Should successfully book a seat and return a 201 status code', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[0])
        .set('Authorization', `Bearer ${SecondUserToken}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          done(err);
        });
    });
    it('User-Test-Case 2: Should successfully book a seat and return a 201 status code', (done) => {
      chai.request(app)
        .post(`${bookURI}`)
        .send(dataFeed.bookTrip[0])
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          done(err);
        });
    });
    it('Should return a 401 status code if the user did not create the booking', (done) => {
      chai.request(app)
        .delete(`${bookURI}/3`)
        .set('Authorization', `Bearer ${SecondUserToken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
  });
});
