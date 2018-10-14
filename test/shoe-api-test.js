let app = require('../index');
let chai = require('chai');
let request = require('supertest');

let expect = chai.expect;

describe('The Shoe-API functions', function(){
    it('the getShoes function should return a status code of 200', function(done){
        request(app)
        .get('/api/shoes')
        .end(function (err,res){
            expect(res.statusCode).to.equal(200);
            done();
        })
    });
});