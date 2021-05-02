const express = require('express');
const app = express();
const usersRoutes = express.Router();

// const jwksRsa = require('jwks-rsa');
// const expressJwt = require('express-jwt');




usersRoutes.route('/').post(function (req, res) {
  console.log('Backend post /')
  const aUser = {
    id: 999,
    username: 'me@gmail.com',
    password: 'test123',
    firstName: 'TestUser',
    lastName: 'TestLastName',
    token: 'thetoken'
  }
  res.json(aUser);
});


usersRoutes.route('/users').get(function (req, res) {
  console.log('Backend get /')
  var users = []
  const aUser = {
    id: 999,
    username: 'mfjlaw@gmail.com',
    password: 'test123',
    firstName: 'Mark',
    lastName: 'Johannessen',
    token: 'thetoken'
  }
  users.push(aUser);
  res.json(users);
});



module.exports = usersRoutes;

