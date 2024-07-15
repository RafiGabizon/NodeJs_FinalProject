const express = require('express');
const router = express.Router();
const PhoneModel = require('../models/phoneModel'); 


// Q1:
router.get('/q1', async (req, res) => {
  try {
    const phones = await PhoneModel.find({})
      .limit(10)
      .sort({ _id: 1 }); 

    res.json(phones);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q2:
router.get('/q2', async (req, res) => {
  try {
    const data = await PhoneModel
      .find({})
      .limit(5)
      .sort({ price: -1 }); 
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(502).json({ err: err.message });
  }
});


// Q3:
router.get('/q3', async (req, res) => {
  try {
    const data = await PhoneModel
      .find({})
      .sort({ total_score: -1 }) 
      .skip(3) 
      .limit(3); 
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(502).json({ err: err.message });
  }
});


// Q4:
router.get('/q4', async (req, res) => {
  try {
    const data = await PhoneModel
      .findOne({ name: "Mi" });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(502).json({ err: err.message });
  }
});


// Q9:
router.get('/q9', async (req, res) => {
  try {
    const count = await PhoneModel.countDocuments({});
    res.json({ count });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q10:
router.get('/q10', async (req, res) => {
  try {
    const count = await PhoneModel.countDocuments({ cpu: /Qualcomm/i });
    res.json({ count });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q11:
router.get('/q11', async (req, res) => {
  try {
    const phones = await PhoneModel.find({
      price: { $gte: 1300, $lte: 2000 }
    })
    .limit(4)
    .sort({ price: 1 });

    res.json(phones);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q12:
router.get('/q12', async (req, res) => {
  try {
    const scores = [79, 90, 86];
    const phones = await PhoneModel.find({
      total_score: { $in: scores }
    });

    res.json(phones);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q13:
router.get('/q13', async (req, res) => {
  try {
    const phones = await PhoneModel.find({})
      .select('name total_score') 
      .sort({ company_id: 1 })   
      .limit(10);               

    res.json(phones);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q14:
router.get('/q14', async (req, res) => {
  try {
    const phones = await PhoneModel.find({
      $or: [
        { battery_score: 76 },
        { company_id: 2 }
      ]
    })
    .sort({ price: -1 }); 

    res.json(phones);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q15:
router.get('/q15', async (req, res) => {
  try {
    const phones = await PhoneModel.find({
      $and: [
        { battery_score: 76 },
        { company_id: 4 }
      ]
    });

    res.json(phones);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q16:
router.get('/q16', async (req, res) => {
  try {
    const aggregationResult = await PhoneModel.aggregate([
      {
        $group: {
          _id: "$company_id",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json(aggregationResult);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q17:
router.get('/q17', async (req, res) => {
  try {
    const aggregationResult = await PhoneModel.aggregate([
      {
        $group: {
          _id: "$company_id",
          averagePrice: { $avg: "$price" }
        }
      },
      {
        $sort: { averagePrice: 1 }
      }
    ]);

    res.json(aggregationResult);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q18:
router.get('/q18', async (req, res) => {
  try {
    const aggregationResult = await PhoneModel.aggregate([
      {
        $group: {
          _id: "$company_id",
          minPrice: { $min: "$price" }
        }
      },
      {
        $sort: { minPrice: 1 } 
      }
    ]);

    res.json(aggregationResult);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q19:
router.get('/q19', async (req, res) => {
  try {
    const phones = await PhoneModel.find({})
      .populate('company_id', 'name country') 
      .exec();

    res.json(phones);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


// Q20:
router.get('/q20', async (req, res) => {
  try {
    const phones = await PhoneModel.find({})
      .sort({ price: -1 }) 
      .limit(5)  
      .populate('company_id', 'country')  
      .exec();

    res.json(phones);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});




router.get('/:id', async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id);
    if (!phone) return res.status(404).json({ error: 'Phone not found' });
    res.json(phone);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/', async (req, res) => {
  const { name, cpu, company_id, gpu, battery_score, total_score, price } = req.body;
  const phone = new Phone({
    _id: new mongoose.Types.ObjectId(),
    name,
    cpu,
    company_id,
    gpu,
    battery_score,
    total_score,
    price
  });

  try {
    const savedPhone = await phone.save();
    res.status(201).json(savedPhone);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/:id', async (req, res) => {
  const { name, cpu, company_id, gpu, battery_score, total_score, price } = req.body;
  try {
    const updatedPhone = await Phone.findByIdAndUpdate(req.params.id, {
      name,
      cpu,
      company_id,
      gpu,
      battery_score,
      total_score,
      price
    }, { new: true });

    if (!updatedPhone) return res.status(404).json({ error: 'Phone not found' });
    res.json(updatedPhone);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedPhone = await Phone.findByIdAndDelete(req.params.id);
    if (!deletedPhone) return res.status(404).json({ error: 'Phone not found' });
    res.json({ message: 'Phone deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
