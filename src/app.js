const express = require('express');
const path = require('path');
const controller = require('./controllers');

// eslint-disable-next-line import/no-unresolved
require('env2')('.env');

const app = express();

app.set('port', process.env.PORT || 5040);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(controller);

module.exports = app;
