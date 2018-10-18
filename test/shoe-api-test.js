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

describe('The Shoe Catalogue API Tests', function () {
    it('the allShoes function should return a status code of 200', function (done) {
        request(app)
            .get('/api/shoes')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
    it('the filterByBrand function should return a status code of 200', function (done) {
        request(app)
            .get('/api/shoes/brand/:brandname')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
    it('the filterByColor function should return a status code of 200', function (done) {
        request(app)
            .get('/api/shoes/color/:color')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
    it('the filterBySize function should return a status code of 200', function (done) {
        request(app)
            .get('/api/shoes/size/:size')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
    it('the filterByBrandColor function should return a status code of 200', function (done) {
        request(app)
            .get('/api/shoes/brand/:brandname/color/:color')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
    it('the filterByBrandSize function should return a status code of 200', function (done) {
        request(app)
            .get('/api/shoes/brand/:brandname/size/:size')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
    it('the filterByColorSize function should return a status code of 200', function (done) {
        request(app)
            .get('/api/shoes/color/:color/size/:size')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
    it('the filterByBrandColorSize function should return a status code of 200', function (done) {
        request(app)
            .get('/api/shoes/brand/:brandname/color/:color/size/:size')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });

    it('the showCart function should return a status code of 200', function (done) {
        request(app)
            .get('/api/shoes/cart')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
    it('the addShoe function should return a status code of 200', function () {
        let params = {
            "brand": "Nike",
            "color": "Red",
            "price": 1230,
            "size": 4,
            "in_stock": 48
        };
        request(app)
            .post('/api/shoes/add', params)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
            })
    });
    it('the addToCart function should return a status code of 200', function (done) {
        request(app)
            .post('/api/shoes/sold/:id')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
    it('the removeFromCart function should return a status code of 200', function (done) {
        request(app)
            .post('/api/shoes/cart/remove/:id')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
    it('the checkout function should return a status code of 200', function (done) {
        request(app)
            .post('/api/shoes/cart/checkout')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    });
});

describe('The Shoe Catalogue Factory Functions', function () {
    beforeEach(async function () {
        await pool.query('delete from shoes');
        let shoeOne = {
            "brand": "Nike",
            "color": "Blue",
            "price": 1000,
            "size": 1,
            "in_stock": 5
        };
        let shoeTwo = {
            "brand": "Adidas",
            "color": "White",
            "price": 2000,
            "size": 5,
            "in_stock": 10
        };
        await shoeFactoryInstance.addStockItem(shoeOne);
        await shoeFactoryInstance.addStockItem(shoeTwo);
    });
    it('The get shoes function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.getShoes();
        results = [{
                "brand_name": "Nike",
                "color_name": "Blue",
                "in_stock": 5,
                "price": 1000,
                "size": 1
            },
            {
                "brand_name": "Adidas",
                "color_name": "Blue",
                "in_stock": 10,
                "price": 2000,
                "size": 5
            }
        ]
        assert.deepEqual(results, [{
                "brand_name": "Nike",
                "color_name": "Blue",
                "in_stock": 5,
                "price": 1000,
                "size": 1
            },
            {
                "brand_name": "Adidas",
                "color_name": "Blue",
                "in_stock": 10,
                "price": 2000,
                "size": 5
            }
        ]);
    });
    it('The getBrands function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.getBrands();
        assert.deepEqual(results, [{
            "brand_name": "Adidas",
            "id": 2
        }, {
            "brand_name": "Nike",
            "id": 1
        }]);
    });
    it('The getColors function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.getColors();
        assert.deepEqual(results, [
              {
                "color_name": "Blue",
                "id": 2
              },
              {
                "color_name": "Red",
                "id": 1
              },
              {
                "color_name": "White",
                "id": 3
              }
            ]);
    });
    it('The getSizes function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.getSizes();
        assert.deepEqual(results, [
              {
                "id": 2,
                "size": 1
              },
              {
                "id": 1,
                "size": 4
              },
              {
                "id": 3,
                "size": 5
              }
            ]);
    });
    it('The filterBrand function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.filterBrand(1);
        assert.equal(results.length, 1);
    });
    it('The filterSize function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.filterSize(2);
        assert.equal(results.length, 1);
    });
    it('The filterColor function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.filterColor(2);
        assert.equal(results.length, 1);
    });
    it('The filterBrandSize function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.filterBrandSize(1, 2);
        assert.equal(results.length, 1);
    });
    it('The filterBrandColor function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.filterBrandColor(1, 2);
        assert.equal(results.length, 1);
    });
    it('The filterColorSize function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.filterColorSize(2, 2);
        assert.equal(results.length, 1);
    });
    it('The filterBrandColorSize function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let results = await shoeFactoryObject.filterBrandColorSize(1, 2, 2);
        assert.equal(results.length, 1);
    });
    it('The addStockItem function', async function () {
        let shoeFactoryObject = shoeFactoryInstance;
        let params = {
            "brand": "Nike",
            "color": "Red",
            "price": 1230,
            "size": 4,
            "in_stock": 48
        };
        let results = await shoeFactoryObject.addStockItem(params);
        assert.deepEqual(results, "Shoe was added successfully!");
    });
});