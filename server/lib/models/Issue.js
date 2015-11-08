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
    who: Schema.Types.ObjectId, ref: 'User'
    amount: { type: Number, default: 0 },
  }]


}, {collection: 'Issue'});

mongoose.model('Issue', IssueSchema);
