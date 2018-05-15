var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CitySchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
	region: [{type: Schema.ObjectId, ref: 'State'}]
  }
);

//Export model
module.exports = mongoose.model('City', CitySchema);