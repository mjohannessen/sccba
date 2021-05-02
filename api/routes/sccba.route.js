const express = require('express');
const app = express();
const sccbaRoutes = express.Router();


// Require Member model in our routes module
//let Member = require('../models/Member');

/* MySQL */
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'temby123',
  database: 'sccba'
});


// Defined get data(index or listing) route
sccbaRoutes.route('/').get(function (req, res) {
  console.log('backend get all members')
  connection.query(
    'SELECT * FROM `world`',
    function(err, results, fields) {
      // console.log('results: ' + JSON.stringify(results)); // results contains rows returned by server
      console.log('results count: ' + results.length.toString())
      res.json(results);
    }
  );
});


function escapeRegExp(string) {
  // BSON types https://docs.mongodb.com/manual/reference/bson-types/
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


function remove(string, from, to) {
  return string.slice(0, from) + string.slice(to);
}


sccbaRoutes.route('/search').post(function (req, res) {
  console.log('backend searching ...')
  console.log('req.body: ' + JSON.stringify(req.body))
  const fields = [];
  const values = [];
  let queryString = "SELECT * FROM world WHERE ";

  // in every query


  if(!("member" in req.body)){
    queryString = queryString + "member = 'n' AND "
  } else {
    queryString = queryString + "member = 'y' AND "
  }

  // default to active member
  if(!("status" in req.body)) {
    queryString = queryString + "status = 'a' AND "
  } else{
    queryString = queryString + "status = '" + req.body['status'] + "' AND "
  }

  if(("sbn" in req.body)){
    console.log('no status key')
    queryString = queryString + "sbn = " + req.body['sbn'] + " AND "
  }

  if(("practice_areas" in req.body)){
    console.log('no status key')
    queryString = queryString + "practice_areas LIKE '" + req.body['practice_areas'] + "%' AND "
  }

  if(("last_name" in req.body)){
    console.log('no status key')
    queryString = queryString + "last_name LIKE '" + req.body['last_name'] + "%' AND "
  }

  if(("first_name" in req.body)){
    console.log('no status key')
    queryString = queryString + "first_name LIKE '" + req.body['first_name'] + "%' AND "
  }

  if(!("nibl" in req.body)){
    if(("county" in req.body)){
      queryString = queryString + "county LIKE '" + req.body['county'] + "%' AND "
    }
  } else {
    // not in bar list
    queryString = queryString + "county NOT LIKE 'Santa Cruz' AND county NOT LIKE 'San Benito' AND county NOT LIKE 'Monterey' AND"
  }







  Object.entries(req.body).forEach(function ([key, value]) {
    console.log(`key:value: ${key} ${value}`);
    fields.push(key)
    values.push(req.body[key])
  });

  // trim off the last AND
  queryString = remove(queryString, queryString.length-4, queryString.length)
  console.log('fields: ' + JSON.stringify(fields));
  console.log('values: ' + JSON.stringify(values));
  console.log('queryString: ' + queryString)

  var inserts = fields;
  sql = connection.format(queryString, inserts);

  connection.execute(
    sql,
    function(err, results, fields) {
      // console.log('results: ' + JSON.stringify(results))
      if (results) {
        console.log("results count: " + results.length)
        res.json(results);
      } else{
        console.log("Nothing found")
        res.json([])
      }


    }
  );





  // Defined edit route
  sccbaRoutes.route('/edit/:id').get(function (req, res) {
    console.log("edit: params to backend: " + JSON.stringify(req.params));
    let id = req.params.id;
    queryString = "SELECT * FROM world WHERE id = " + id;
    console.log('queryString: ' + queryString)
    var inserts = [id];
    sql = connection.format(queryString, inserts);
    connection.execute(
      sql,
      function(err, results, fields) {
        console.log('results: ' + JSON.stringify(results)); // results contains rows returned by server
        res.json(results);
      }
    );
  });





  //  Defined update route
  sccbaRoutes.route('/update/:id').post(function (req, res) {
    console.log("update passed to backend - params: " + JSON.stringify(req.params))
    console.log("update passed to backend - body: " + JSON.stringify(req.body))
    queryString = "UPDATE world SET " +
      "phone='" + req.body['phone'] + "', " +
      "fax='" + req.body['fax'] + "', " +
      "email='" + req.body['email'] + "', " +
      "member='" + req.body['member'] + "', " +
      "comments='" + req.body['comments'] + "' " +
      " WHERE id = '" + req.params["id"] + "'";
    console.log('queryString: ' + queryString)
    let id = req.params.id;
    var inserts = [id];
    sql = connection.format(queryString, inserts);
    connection.execute(
      sql,
      function(err, results, fields) {
        console.log('results: ' + JSON.stringify(results)); // results contains rows returned by server
        res.json(results);
      }
    );

  });









});

/**************** MONGO FUNCTIONS **********************/

  /*
  // Defined get data(index or listing) route
  sccbaRoutes.route('/').get(function (req, res) {
    console.log('backend get all members')
    Member.find(function (err, member){
      if(err){
        console.log(err);
      }
      else {
        console.log('member count: ' + member.length.toString())
        console.log('member[0]]: ' + JSON.stringify(member[0]))
        res.json(member);
      }
    });
  });
   */

/*
  if (fields.length > 0) {
    Member.find({
        $and: [
          {$or: [{'first_name': new RegExp(req.body.first_name, 'i')}]},
          {$or: [{'last_name': new RegExp(req.body.last_name, 'i')}]},
          {$or: [{'status':req.body.bar_status}]},
          {$or: [{'county': new RegExp(req.body.county, 'i')}]},
          {$or: [{'member': req.body.sccba_member}]}
        ]
      }, function (err, members) {
        if (err) {
          console.log(err);
        } else {
          console.log('Count: ' + members.length)
          //console.log('members: ' + JSON.stringify(members))
          //res.json(members);
        }
      }
    );
  }

 */


/*
  Member.find(req.body, function(err, members){
    if (err){
      console.log(err);
    }
    else{
      console.log('members found: ' + members.length)
      // console.log(JSON.stringify(members))
      res.json(members);
    }
  })

 */









/*

// Defined edit route
sccbaRoutes.route('/edit/:id').get(function (req, res) {
  console.log("edit: params to backend: " + JSON.stringify(req.params));
  let id = req.params.id;
  Member.findById(id, function (err, member){
    res.json(member);
  });
});





//  Defined update route
sccbaRoutes.route('/update/:id').post(function (req, res) {
  console.log("update passed to backend - params: " + JSON.stringify(req.params))
  console.log("update passed to backend - body: " + JSON.stringify(req.body))
  Member.findById(req.params.id, function(err, member) {
    if (!member)
      res.status(404).send("Record not found");
    else {
      console.log('\nGot member to update from DB: ' + JSON.stringify(member))
      member.phone = req.body.phone;
      member.fax = req.body.fax;
      member.email = req.body.email;
      member.member = req.body.member;
      member.comments = req.body.comments;
      console.log('\nMember update to save: ' + JSON.stringify(member))
      member.save().then(member => {
        res.json(member);
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});








// Add route
sccbaRoutes.route('/add').post(function (req, res) {
  console.log("add");
  console.log("req.body: " + JSON.stringify(req.body));
  let member = new Member(req.body);
  member.save()
    .then(member => {
      res.status(200).json({'Member': 'Member has been added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});





// Delete | remove | destroy route
sccbaRoutes.route('/delete/:id').get(function (req, res) {
  Member.findByIdAndRemove({_id: req.params.id}, function(err, member){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});


 */

module.exports = sccbaRoutes;
