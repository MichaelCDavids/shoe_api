'use strict';
const assert = require('assert');
const shoeFactory = require('../services/shoes-factory');
const cartFactory = require('../services/cart-factory');
const pg = require('pg');
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/shoe_catalogue_test';
const pool = new Pool({
    connectionString
});

let shoeFactoryInstance = shoeFactory(pool);
let cartFactoryInstance = cartFactory(pool);

let app = require('../index');
let chai = require('chai');
let request = require('supertest');

let expect = chai.expect;

describe('The Shoe Catalogue Tests', function () {
    it('the getShoes function should return a status code of 200', function (done) {
        request(app)
            .get('/api/shoes')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
});

describe('The Shoe Catalogue Factory Functions', function () {
    it('The get shoes function', async function (){
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.getShoes();
        assert.deepEqual(results,[]);
    });
    it('The getBrands function', async function (){
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.getBrands();
        assert.deepEqual(results,[]);
    });
    it('The getColors function', async function (){
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.getColors();
        assert.deepEqual(results,[]);
    });
    it('The getSizes function', async function (){
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.getSizes();
        assert.deepEqual(results,[]);
    });
    it('The filterBrand function', async function (){
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.filterBrand(1);
        assert.deepEqual(results,[]);
    });
});