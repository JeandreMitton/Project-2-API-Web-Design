const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const memberRoutes = require('./api/routes/members');
const managerRoutes = require('./api/routes/managers');
//trying to send JWT in header
/*
const headers = () => {
    const h = new Headers();

    h.append('Content-Type', 'application/json');

    return h;
}*/

// Connecting to MongoDB through application
mongoose.connect('mongodb+srv://admin:'+ process.env.MONGO_ATLAS_PW + '@tester.utkji.mongodb.net/tester?retryWrites=true&w=majority',
        {
         useMongoClient: true
        });
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(morgan('dev'));
// Makes img folder public so everybody can access it
app.use('/img',express.static('img'));
app.use(bodyParser.urlencoded({extended: false}));  // Will extract url data to be easily readable
app.use(bodyParser.json());                         // Will extract json data to be easily readable


// Handling CORS (Cross-Origin Resource Sharing) errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');     //Access granted to everyone with '*'
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');    //Access granted to all listed methods
        return res.status(200).json({});
    }
    next();
});

// Routes which handle requests (Middleware to forward requests)
app.use('/members', memberRoutes);
app.use('/managers', managerRoutes);


// Error handling with custom messages
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
// If error is not handled with 404 as above it will go over to error 500 as below
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;