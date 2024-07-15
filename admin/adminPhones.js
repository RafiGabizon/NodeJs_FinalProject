const Phone = require('../models/phoneModel.js');

const getPhones = async (req, res) => {
  try {
    const phones = await Phone.find({});
    res.json(phones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getPhoneById = async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id);
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    res.json(phone);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createPhone = async (req, res) => {
  try {
    const newPhone = new Phone(req.body);
    const phone = await newPhone.save();
    res.status(201).json(phone);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updatePhone = async (req, res) => {
  try {
    const phone = await Phone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    res.json(phone);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deletePhone = async (req, res) => {
  try {
    const phone = await Phone.findByIdAndDelete(req.params.id);
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    res.json({ message: 'Phone removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getPhones, getPhoneById, createPhone, updatePhone, deletePhone };
