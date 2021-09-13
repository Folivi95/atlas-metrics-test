const assert = require('assert');
const request = require('supertest');
const express = require('express');
const app = require('../app');
const index = require('../index');
const statRouter = require('../server/routes/statRoutes');
const chai = require('chai');
const chaiHttp = require('chai-http');

let productId = '';

chai.should();
chai.use(chaiHttp);


describe('Stats APIs', () => {
    describe("Test GET route /api/v1/stats/:productId", () => {
        it('should return product id stats', function (done) {
            chai.request(index)
                .get(`/api/v1/stats/${productId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.length.should.not.be.eq(0);
                    done();
                })
        });

        it('should not stats details', (done) => {
            chai.request(index)
                .get(`/api/v1/stats/`)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        })
    })
})


