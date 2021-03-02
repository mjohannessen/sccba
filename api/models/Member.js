const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Member
let Member = new Schema ({

  sbn: {
    type: String
  },
  admission_date: {
    type: String
  },
  name: {
    type: String
  },
  last_name: {
    type: String
  },
  first_name: {
    type: String
  },
  status: {
    type: String
  },
  address_1: {
    type: String
  },
  address_2: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  },
  zip_plus4: {
    type: String
  },
  district: {
    type: String
  },
  county: {
    type: String
  },
  phone: {
    type: String
  },
  fax: {
    type: String
  },
  email: {
    type: String
  },
  firm: {
    type: String
  },
  law_school: {
    type: String
  },
  member: {
    type: String
  },
  comments: {
    type: String
  }

},

  {
    collection: 'members'
  }
);

module.exports = mongoose.model('Member', Member);
