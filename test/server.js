let chai = require('chai');
let assert = require('chai').assert;
let expect = require('chai').expect;
let chaiHttp = require('chai-http');

var should = chai.should();
chai.use(chaiHttp);
let server = require('../server');

//Our parent block
describe('Test Api List', () => {
    describe('Get Home Page as result', () => {
        it('It should get 200 as response', (done) => {
            chai.request(server)
                .get('/user/query')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('array');
                    done();
                });
        });
    });

    describe('Post api for user', () => {
        it('It should return the newly added user', (done) => {
            const user = {
                username: "Dharani Devaraj"
            }
            chai.request(server)
                .post('/user/new')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('Check the user as admin', () => {
        it('It should validate the user as admin', (done) => {
            const user = {
                userId: 3
            }
            chai.request(server)
                .get('/admin')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});