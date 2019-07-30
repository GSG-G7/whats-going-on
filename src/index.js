const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`Server is listning on ${app.get('port')}`);
});
