const express = require('express');
const path = require('path');
const request = require('request');
const { client, server } = require('./controllers/error');

// eslint-disable-next-line import/no-unresolved
require('env2')('.env');

const app = express();

app.set('port', process.env.PORT || 5040);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/latest', (req, res) => {
  request(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`, (error, response, body) => {
    res.send(JSON.parse(body));
  });
});

app.get('/search', (req, res) => {
  request(`https://newsapi.org/v2/everything?q=${req.query.query}&apiKey=${process.env.NEWS_API_KEY}`, (error, resp, body) => {
    res.send(JSON.parse(body));
  });
});
app.use(client);
app.use(server);


module.exports = app;
