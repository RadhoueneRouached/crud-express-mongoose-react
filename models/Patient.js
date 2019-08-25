var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  birthday: {type: String, required: true},
});

module.exports = mongoose.model('Patient', PatientSchema);
