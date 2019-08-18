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
let userToken;

describe('TRIP CREATION TEST', () => {
  describe('POST api/v1/trips', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURL}/signin`)
        .send(dataFeed.adminSignin[0])
        .end((loginErr, loginRes) => {
          currentToken = loginRes.body.data.token;
          done(loginErr);
        });
    });
    it('Should successfully create a trip and return a 201 status', (done) => {
      chai.request(app)
        .post(`${tripURI}/`)
        .send(dataFeed.Trip[0])
        .set('Authorization', `Bearer ${currentToken}`)
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
    it('Should return a 400 status if origin was not entered', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[1])
        .set('Authorization', `Bearer ${currentToken}`)
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
        .send(dataFeed.Trip[2])
        .set('Authorization', `Bearer ${currentToken}`)
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
        .send(dataFeed.Trip[3])
        .set('Authorization', `Bearer ${currentToken}`)
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
        .send(dataFeed.Trip[4])
        .set('Authorization', `Bearer ${currentToken}`)
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
        .send(dataFeed.Trip[5])
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the trip year is not current', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[6])
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the trip month is not current', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[7])
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the trip is not in the right format', (done) => {
      chai.request(app)
        .post(`${tripURI}`)
        .send(dataFeed.Trip[8])
        .set('Authorization', `Bearer ${currentToken}`)
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
        .send(dataFeed.Trip[9])
        .set('Authorization', `Bearer ${currentToken}`)
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
        .send(dataFeed.Trip[10])
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
  });
});

describe('TRIP RETRIEVAL TEST', () => {
  describe('GET api/v1/trips', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURL}/signin`)
        .send(dataFeed.User[10])
        .end((loginErr, loginRes) => {
          userToken = loginRes.body.data.token;
          done(loginErr);
        });
    });
    it('Should successfully retrieve a trip through its origin and return a 200 status', (done) => {
      chai.request(app)
        .get(`${tripURI}?origin=rotterdam`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          done(err);
        });
    });
    it('Should successfully retrieve a trip through its destination and return a 200 status', (done) => {
      chai.request(app)
        .get(`${tripURI}?destination=sofia`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          done(err);
        });
    });
    it('Should return a 401 status code if origin does not exist', (done) => {
      chai.request(app)
        .get(`${tripURI}?origin=cccccg`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 401 status code if destination does not exist', (done) => {
      chai.request(app)
        .get(`${tripURI}?destination=acccccg`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should successfully retrieve all trips', (done) => {
      chai.request(app)
        .get(`${tripURI}/`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          done(err);
        });
    });
  });
});

describe('TRIP CANCELLLATION TEST', () => {
  describe('PATCH api/v1/trips/:tripid', () => {
    it('Should successfully cancel a trip', (done) => {
      chai.request(app)
        .patch(`${tripURI}/4`)
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          done(err);
        });
    });
    it('Should return a 404 status code if tripid does not exist', (done) => {
      chai.request(app)
        .patch(`${tripURI}/9999`)
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status code if tripid entered was not a number', (done) => {
      chai.request(app)
        .patch(`${tripURI}/aa`)
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status code if tripid entered was not a special character', (done) => {
      chai.request(app)
        .patch(`${tripURI}/[]`)
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status code if tripid entered was not a negative value', (done) => {
      chai.request(app)
        .patch(`${tripURI}/-3`)
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 401 status code if trip has been cancelled already', (done) => {
      chai.request(app)
        .patch(`${tripURI}/2`)
        .set('Authorization', `Bearer ${currentToken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
  });
});
