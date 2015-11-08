var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({

  type: { type: String, default: 'user'},

  address: {type: String, required: true},
  zip: { type: String, required: true },

  email: { type: String, unique: true, required: true, sparse: true },
  password: { type: String, select: false},


}, {collection: 'User'});

mongoose.model('User', UserSchema);
