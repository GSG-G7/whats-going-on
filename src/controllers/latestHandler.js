const request = require('request');

exports.latest = (req, res, next) => {
  request({
    url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`,
    headers: { 'User-Agent': 'whats-going-on' },
  }, (error, response, body) => {
    if (error) {
      next(error);
    } else {
      res.send(JSON.parse(body));
    }
  });
};
