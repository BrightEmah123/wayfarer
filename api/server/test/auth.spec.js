/* eslint-disable linebreak-style */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import dataFeed from './test-model/dataFeed.spec';

chai.use(chaiHttp);

const { expect } = chai;
const authURI = '/api/v1/auth';


describe('Registration test', () => {
  describe('POST api/v1/auth/signup', () => {
    it('Should successfully register a user and return a 201 status', (done) => {
      chai.request(app)
        .post(`${authURI}/signup`)
        .send(dataFeed.User[0])
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('userid');
          expect(res.body.data).to.have.property('firstname');
          expect(res.body.data).to.have.property('lastname');
          expect(res.body.data).to.have.property('email');
          done(err);
        });
    });
    it('Should return a 400 status if the firstName was not entered', (done) => {
      chai.request(app)
        .post(`${authURI}/signup`)
        .send(dataFeed.User[1])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the lastName was not entered', (done) => {
      chai.request(app)
        .post(`${authURI}/signup`)
        .send(dataFeed.User[2])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the email was not entered', (done) => {
      chai.request(app)
        .post(`${authURI}/signup`)
        .send(dataFeed.User[3])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the password was not entered', (done) => {
      chai.request(app)
        .post(`${authURI}/signup`)
        .send(dataFeed.User[4])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the firstName was a number', (done) => {
      chai.request(app)
        .post(`${authURI}/signup`)
        .send(dataFeed.User[5])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the lastName was a number', (done) => {
      chai.request(app)
        .post(`${authURI}/signup`)
        .send(dataFeed.User[6])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 409 status if the email already exists', (done) => {
      chai.request(app)
        .post(`${authURI}/signup`)
        .send(dataFeed.InvalidAccess[0])
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
  });
});

describe('Login Test', () => {
  describe('POST api/v1/auth/signin', () => {
    it('Should successfully login a user and return a 200 status', (done) => {
      chai.request(app)
        .post(`${authURI}/signin`)
        .send(dataFeed.User[7])
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('userid');
          expect(res.body.data).to.have.property('firstname');
          expect(res.body.data).to.have.property('lastname');
          expect(res.body.data).to.have.property('email');
          done(err);
        });
    });
    it('Should return a 400 status if the email was not entered', (done) => {
      chai.request(app)
        .post(`${authURI}/signin`)
        .send(dataFeed.User[8])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 400 status if the password was not entered', (done) => {
      chai.request(app)
        .post(`${authURI}/signin`)
        .send(dataFeed.User[9])
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 401 status if the login credentials is incorrect', (done) => {
      chai.request(app)
        .post(`${authURI}/signin`)
        .send(dataFeed.InvalidAccess[1])
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('Should return a 401 status if both email and/or password is invalid', (done) => {
      chai.request(app)
        .post(`${authURI}/signin`)
        .send(dataFeed.InvalidAccess[2])
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
  });
});
