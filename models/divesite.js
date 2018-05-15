var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DivesiteSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
	latitude: {type: Number, required: true, max: 90, min: 90},
	longitude: {type: Number, required: true, max: 180, min: -180},
	site_type: [{type: String, enum: ['wreck', 'reef', 'cave'] }],
	salinity: [{type: String, enum: ['salt', 'fresh', 'brackish'] }],
	animals: [{type: Schema.ObjectId, ref: 'Animal'}],
	rating: {type: Number, min: 1, max: 5},
	description: {type: String},
	optimal_month_start: {type: Date},
	optimal_month_end: {type: Date},
  }
);

DivesiteSchema
.virtual('url')
.get(function () {
  return '/divesites/' + this._id;
});

DivesiteSchema
.virtual('optimal_months')
.get(function () {
  return this.optimal_month_start + ' - ' + this.optimal_month_end;
});

//Export model
module.exports = mongoose.model('Divesite', DivesiteSchema);