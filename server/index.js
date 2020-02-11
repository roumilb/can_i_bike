const express = require('express');
const consola = require('consola');
const {Nuxt, Builder} = require('nuxt');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const pyBikes = require('./router/pyBikes');
const auth = require('./router/auth');
const userRouter = require('./router/user');

const authController = require('./controller/auth');

const mongoose = require('mongoose');

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
    //init db
    mongoose.connect('mongodb://localhost:27017/canbike', {useNewUrlParser: true});
    mongoose.Promise = global.Promise;
    let db = mongoose.connection;

    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    const {host, port} = nuxt.options.server;

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    } else {
        await nuxt.ready();
    }

    // To parse cookies from the HTTP Request
    app.use(cookieParser());

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        // Get auth token from the cookies
        const authToken = req.cookies['AuthToken'];

        // Inject the user to the request
        req.user = authController.getAuthToken(authToken);

        next();
    });

    //add routers
    app.use('/api/cities', pyBikes);
    app.use('/api/auth', auth);
    app.use('/api/user', userRouter);

    // Give nuxt middleware to express
    app.use(nuxt.render);

    // Listen the server
    app.listen(port, host);
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true,
    });
}

start();
