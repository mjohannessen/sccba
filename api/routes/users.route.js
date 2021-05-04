const express = require('express');
const app = express();
const usersRoutes = express.Router();

// const jwksRsa = require('jwks-rsa');
// const expressJwt = require('express-jwt');

/*
usersRoutes.route('/').get(function (req, res) {
  console.log('User route test')
  res.json({'test':'ok'});
});
*/


usersRoutes.route('/').post(function (req, res) {
  console.log('UserRoutes backend post /')
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



usersRoutes.route('/authenticate').post(function (req, res) {
  console.log('Backend users/authenticate')
  const { username, password } = body;
  const user = users.find(x => x.username === username && x.password === password);
  if (!user) return error('Username or password is incorrect');
  return ok({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    token: 'fake-jwt-token'
  })
})


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

