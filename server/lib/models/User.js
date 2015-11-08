var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({

  type: { type: String, default: 'user'},

  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true, sparse: true },
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,

  password: { type: String, select: false},


}, {collection: 'User'});

mongoose.model('User', UserSchema);
