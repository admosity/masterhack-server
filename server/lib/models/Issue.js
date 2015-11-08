var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var IssueSchema = new Schema({
  image: { type: String, required: true },
  description: { type: String },

  pledged: { type: Number, default: 0 },

  loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
  },

  pledgers: [{
    who: {type: Schema.Types.ObjectId, ref: 'User'},
    amount: Number
  }],

  createdOn: { type: Date, default: Date.now },

}, {collection: 'Issue'});

mongoose.model('Issue', IssueSchema);
