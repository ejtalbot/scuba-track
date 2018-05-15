var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CountrySchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
	region: [{type: Schema.ObjectId, ref: 'Region'}]
  }
);

//Export model
module.exports = mongoose.model('Country', CountrySchema);