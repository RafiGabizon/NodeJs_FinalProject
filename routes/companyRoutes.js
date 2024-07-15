const express = require('express');
const router = express.Router();
const CompanyModel = require('../models/companyModel'); 

// Q6:
router.post('/q6', async (req, res) => {
  try {
    const newCompany = new CompanyModel({
      id: "5",
      name: "LG",
      country: "korea"
    });
    const savedCompany = await newCompany.save();

    res.json(savedCompany);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q7:
router.put('/q7', async (req, res) => {
  try {
    const updatedCompany = await CompanyModel.findOneAndUpdate(
      { name: 'LG' }, 
      { country: 'SOUTH KOREA' }, 
      { new: true } 
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(updatedCompany);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q8:
router.delete('/q8', async (req, res) => {
  try {
    const deletedCompany = await CompanyModel.findOneAndDelete({ id: '5' });

    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json({ message: 'Company deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});




module.exports = router;
