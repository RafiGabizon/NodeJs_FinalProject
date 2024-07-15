const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  country: { type: String }
});

const CompanyModel = mongoose.model('Company', companySchema);

module.exports = CompanyModel;
