'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const CartService = require('./services/cart-factory');
const ShoesService = require('./services/shoes-factory');
const APIroutes = require('./routes/shoe-api-routes');
const app = express();
const pg = require("pg");
const Pool = pg.Pool;
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/shoe_catalogue_db';
const pool = new Pool({
    connectionString,
    ssl: useSSL
});
const shoesService = ShoesService(pool);
const cartService = CartService(pool);
const apiRoutes = APIroutes(shoesService,cartService);
app.use(session({
    secret: 'just do it',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}

app.get('/api/shoes', apiRoutes.allShoes);

app.get('/api/shoes/brand/:brandname', apiRoutes.filterByBrand);
app.get('/api/shoes/color/:color', apiRoutes.filterByColor);
app.get('/api/shoes/size/:size', apiRoutes.filterBySize);
app.get('/api/shoes/brand/:brandname/color/:color', apiRoutes.filterByBrandColor);
app.get('/api/shoes/brand/:brandname/size/:size', apiRoutes.filterByBrandSize);
app.get('/api/shoes/color/:color/size/:size', apiRoutes.filterByColorSize);
app.get('/api/shoes/brand/:brandname//color/:color/size/:size', apiRoutes.filterByBrandColorSize);
app.get('/api/shoes/cart', apiRoutes.showCart);
app.post('/api/shoes/add', apiRoutes.addShoe);
app.post('/api/shoes/sold/:id', apiRoutes.addToCart);
app.post('/api/shoes/cart/remove/:id', apiRoutes.removeFromCart);
app.post('/api/shoes/cart/checkout', apiRoutes.checkout);



app.use(errorHandler);
var PORT = process.env.PORT || 3010;
app.listen(PORT, function () {
    console.log('Shoe API webapp started and running listening on port:', PORT);
});