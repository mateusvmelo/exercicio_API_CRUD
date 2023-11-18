const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Team = new Schema({
  name: {
    type: String
  },
  country: {
    type: String
  },
  foundation: {
    type: Number
  },
  titles_count: {
    type: Number 
  }
},{
    collection: 'team'
});

module.exports = mongoose.model('Team', Team);