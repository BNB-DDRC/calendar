require('newrelic');
const express = require('express');
const path = require('path');
// const compression = require('compression');
// const router = require('./router.js');
const bodyParser = require('body-parser');
const db = require('./postgresql.js')


const app = express();
const port = 3004;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.use(compression({ filter: shouldCompress }));

// function shouldCompress(req, res) {
//   if (req.headers['x-no-compression']) {
//     // don't compress responses with this request header
//     return false;
//   }

//   // fallback to standard filter function
//   return compression.filter(req, res);
// }
//app.use('http://ec2-54-67-123-136.us-west-1.compute.amazonaws.com:3004/loaderio-ec25d5c71ad9a14aefc4b096c68bd4c4.txt', express.static('../loaderio-ec25d5c71ad9a14aefc4b096c68bd4c4 (1).txt'))

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.use('/rooms/:id', express.static(path.join(__dirname, '..', 'public')));

app.get('/rooms/:id/availability', (req, res) => {
  console.log(req.params);
  db.getAvailability(req, res)
});

app.post('/rooms/:id/availability', db.createBooking);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
