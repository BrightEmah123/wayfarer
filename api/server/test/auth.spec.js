/* eslint-disable linebreak-style */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import dataFeed from './test-model/dataFeed.spec';

chai.use(chaiHttp);

const { expect } = chai;
const authURI = '/api/v1/auth';


describe('Registration test', () => {
  it('Should successfully register a user and return a 201 status', (done) => {
    chai.request(app)
      .post(`${authURI}/signup`)
      .send(dataFeed.User[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        expect(res.body.data).to.have.property('id');
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
});
