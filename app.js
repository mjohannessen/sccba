const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 6100;

console.log('express serving out of ' + __dirname + '/dist')

app.server.get(express.static(__dirname + '/src'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.send('index.html');
  // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.')
})

module.exports = app;
