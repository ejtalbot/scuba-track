var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AnimalSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
	category: [{type: String, enum: ['Shark', 'Turtle', 'Marine mammal', 'Ray', 'Reef fish'] }],
	pelagic: {type: Boolean},
	description: {type: String},
  }
);

AnimalSchema
.virtual('url')
.get(function () {
  return '/animals/' + this._id;
});

AnimalSchema
.virtual('image_url')
.get(function () {
  return '/public/images/animals/' + this.name;
});

//Export model
module.exports = mongoose.model('Animal', AnimalSchema);