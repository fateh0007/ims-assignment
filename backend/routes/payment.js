const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: process.env.RZP_KEY_ID || 'rzp_test_example',
  key_secret: process.env.RZP_KEY_SECRET || 'rzp_secret_example'
});

router.post('/create-order', async (req,res)=>{
  const { amount, currency='INR' } = req.body;
  const options = {
    amount: Math.round((amount || 500) * 100),
    currency,
    receipt: 'rcpt_' + Date.now()
  };
  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch(e) {
    res.status(500).json({error: e.message});
  }
});

module.exports = router;
