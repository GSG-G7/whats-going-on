const express = require('express');
const { latest } = require('./latestHandler');
const { server, client } = require('./error');
const { search } = require('./searchHandler');

const controller = express.Router();
controller.get('/latest', latest);
controller.get('/search', search);
controller.use(server);
controller.use(client);

module.exports = controller;
