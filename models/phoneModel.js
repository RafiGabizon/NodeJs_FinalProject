const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  cpu: { type: String },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  gpu: { type: String },
  battery_score: { type: String },
  total_score: { type: String },
  price: { type: Number }
});

const PhoneModel = mongoose.model('Phone', phoneSchema);

module.exports = PhoneModel;
