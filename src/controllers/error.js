const path = require('path');

exports.client = (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', '..', 'public', 'html', '404.html'));
};

exports.server = (err, req, res, next) => {
  res.status(500).sendFile(path.join(__dirname, '..', '..', 'public', 'html', '500.html'));
};
