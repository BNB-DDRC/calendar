const express = require('express');
//const model = require('./model.js');
const db = require('./postgresql.js');

const router = express.Router();

router.get('/api/:id?', (req, res) => {
  db.getAvailability(req, res)
})

router.post('/api/:id?', (req, res) => {
  //console.log('this is the request body in the router post', req.body)
  db.createBooking(req, res)
})

module.exports.router = router;

// router.get('/api/:id?', (req, res) => {
//   const { id } = req.params;
//   const modelRes = model.getBookingData(req.params.id, res);
// });

// router.post('/api/:id?', (req, res) => {
//   const { id } = req.params;
//   console.log('got data for ', id);
//   res.end();
// });