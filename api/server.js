
// import * as jwt from 'jsonwebtoken';
// import * as fs from "fs";


const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors')
  // mongoose = require('mongoose'),
  // config = require('./DB');
  // https = require('https');
  // fs = require('fs');
  // jwt = require('express-jwt');
const sccbaRoute = require('./routes/sccba.route');
const usersRoute = require('./routes/users.route');

/*
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {console.log('Mongo database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
*/

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

app.use('/api/sccba', sccbaRoute);
app.use('/api/users', usersRoute);

const port = process.env.PORT || 4001;
const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});

/* MYSQL SETUP */
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'temby123',
  database: 'sccba'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

