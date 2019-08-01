const request = require('request');

exports.latest = (req, res, next) => {
  request(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`, (error, response, body) => {
    if (error) {
      next(error);
    } else {
      res.send(JSON.parse(body));
    }
  });
};
