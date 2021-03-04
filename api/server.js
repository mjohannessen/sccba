const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./DB');
  https = require('https');
  fs = require('fs');

const sccbaRoute = require('./routes/sccba.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {console.log('Mongo database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.use('/api/sccba', sccbaRoute);

const port = process.env.PORT || 4001;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
