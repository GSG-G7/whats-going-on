const path = require('path');

exports.client = (req, res) => {
  res.status(404).send(path.join(__dirname, '..', '..', 'public', '404.html'));
}
;