const request = require('request');

exports.search = (req, res) => {
  request(`https://newsapi.org/v2/everything?q=${req.query.query}&apiKey=${process.env.NEWS_API_KEY}`, (error, resp, body) => {
    res.send(JSON.parse(body));
  });
};
