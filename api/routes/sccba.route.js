const express = require('express');
const app = express();
const sccbaRoutes = express.Router();

// Require Member model in our routes module
let Member = require('../models/Member');






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



function escapeRegExp(string) {
  // BSON types https://docs.mongodb.com/manual/reference/bson-types/
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


sccbaRoutes.route('/search').post(function (req, res) {
  console.log('backend searching ...')

  console.log('req.body: ' + JSON.stringify(req.body))

  //req.body.first_name = new RegExp(`.*${req.body.first_name}.*`)
  //req.body.first_name = Object({ $regex: '.*' + req.body.first_name + '.*'});
  // req.body.first_name = '/.*' + req.body.first_name + '.*/';
  // req.body.first_name = {$regex: '/' + req.body.first_name + '/', $options: 'i'};
  //req.body.first_name = '/^' + req.body.first_name + '/';
  // console.log('test: ' + JSON.stringify(req.body.first_name));

  const fields = [];
  const values = [];
  Object.entries(req.body).forEach(function ([key, value]) {
    console.log(`key:value: ${key} ${value}`);
    fields.push(key)
    values.push(req.body[key])
  });
  console.log('fields: ' + JSON.stringify(fields));
  console.log('values: ' + JSON.stringify(values));

  if (req.body.county) {
    console.log('county: ' + req.body.county);
  } else {
    console.log('No county')
  }

  //let AMember = Member.model('Member', Schema)
  //let query = Member.find()
  //query.select(fields.join(' '))
  //let result = query.exec()
  //fields.forEach(field => result[field] = result[field])
  //console.log(JSON.stringify(result))
  //res.json(result);

  /*
  Promise.all([
    Member.find({sbn: req.body.sbn}),
    Member.find({first_name: new RegExp(req.body.first_name, 'i')}),
    Member.find({last_name: new RegExp(req.body.last_name, 'i')}),
  ])
    .then(results=>{

      console.log('Count: ' + results.length)
      //console.log(JSON.stringify(results))

    })
    .catch(err=>{
      console.error("Something went wrong",err);
    })

   */



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






/*

  Member.find({last_name: new RegExp(req.body.last_name, 'i')}, function(err, members){
    if (err){
      console.log(err);
    }
    else{
      console.log('Count: ' + members.length)
      //res.json(members);
    }
  })
*/



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




});






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

module.exports = sccbaRoutes;
