let app = require('../index');
let chai = require('chai');
let request = require('supertest');

let expect = chai.expect;

describe('The Shoe-API functions', function(){
    it('getshoes shoul return status code 200', function(done){
        request(app)
        .get('/api/shoes')
        .end(function (err,res){
            expect(res.statusCode).to.equal(200);
            done();
        })
    });
});