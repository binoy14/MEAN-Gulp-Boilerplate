var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    routes = require('./config/routes');


mongoose.connect('mongodb://localhost:27017/mean-demo');

app
    .use(bodyParser())
    .use(express.static(__dirname + '/public'))
    .listen(port);
    routes(app);
    console.log('Server listening on port ' + port);