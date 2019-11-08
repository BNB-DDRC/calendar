const moment = require('moment');
const faker = require('faker');
const fs = require('fs');

const writeLocationAvailability = fs.createWriteStream('dataListingAvailabilityTable.csv')
writeLocationAvailability.write('listing_id, min_stay_su, min_stay_m, min_stay_tu, min_stay_w, min_stay_th, min_stay_f, min_stay_sa, max_stay\n', 'utf8');

function writeData(writer, encoding, callback) {
  let i = 10000000; //10000000
  let listing_id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      listing_id += 1;
      const min_stay_su = Math.floor(Math.random() * 5);
      const min_stay_m = Math.floor(Math.random() * 3);
      const min_stay_tu = Math.floor(Math.random() * 3);
      const min_stay_w = Math.floor(Math.random() * 3);
      const min_stay_th = Math.floor(Math.random() * 3);
      const min_stay_f = Math.floor(Math.random() * 5);
      const min_stay_sa = Math.floor(Math.random() * 5);
      const max_stay = Math.floor(Math.random() * (35 - 7) + 7);
      const data = `${listing_id}, ${min_stay_su}, ${min_stay_m}, ${min_stay_tu}, ${min_stay_w}, ${min_stay_th}, ${min_stay_f}, ${min_stay_sa}, ${max_stay}\n`;
        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
          // see if we should continue, or wait, don't pass the callback because we're not done yet
          ok = writer.write(data, encoding);
        }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early, write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
};

writeData(writeLocationAvailability, 'utf-8', () => {
  writeLocationAvailability.end();
});