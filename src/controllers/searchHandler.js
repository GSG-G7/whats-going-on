const request = require('request');

exports.search = (req, res, next) => {
  request(`https://newsapi.org/v2/everything?q=${req.query.query}&apiKey=${process.env.NEWS_API_KEY}`, (error, resp, body) => {
    if (error) {
      next(error);
    } else {
      res.send(JSON.parse(body));
    }
  });
};
