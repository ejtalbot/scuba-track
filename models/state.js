var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StateSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
	region: [{type: Schema.ObjectId, ref: 'Country'}]
  }
);

//Export model
module.exports = mongoose.model('State', StateSchema);