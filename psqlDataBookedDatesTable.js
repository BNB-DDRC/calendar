const moment = require('moment');
const faker = require('faker');
const fs = require('fs');

var randomBookedDatesGenerator = function (listing_id) {
  var bookings = [];
  var currYear = 2019;
  var bookingSet = new Set();
  // for months October through December
  // create random number of bookings per month, max 10 minimum 2, 2 inclusive
  // for each booking required generate start (checkin date) and end date
  // random number days per booking between 5 and 2, 2 inclusive
  // random start date for reservation random between 28 and 1, 1 inclusive (28 for making a 2 day reso possible without being kicked out)

  for (var m = 9; m < 12; m++) {
    var bookingsPerMonth = Math.floor(Math.random() * (8 - 4)) + 4;
    for (var a = 0; a < bookingsPerMonth; a++) {
      var totalDaysPerBooking = Math.floor(Math.random() * (5 - 2)) + 2;
      var startDay = Math.floor(Math.random() * (28 - 1)) + 1;
      if ((startDay + totalDaysPerBooking) > 30) {
        continue; // don't add reservation (don't want to figure out spanning reservations over multiple months right now)
      } else {
        var startDateFormat = moment().year(currYear).month(m).date(startDay).format('YYYY-MM-DD');
        var endDateFormat = moment().year(currYear).month(m).date(startDay + totalDaysPerBooking).format('YYYY-MM-DD');
        // loop through all booked days for the reservation to see if any days are currently contained in the Set, if so, means there is overlapping and current reservation should not be added
        for (var c = startDay; c <= startDay + totalDaysPerBooking; c++) {
          var temp = moment().year(currYear).month(m).date(c).format('YYYY-MM-DD');
          if (bookingSet.has(temp)) {
            break;
          }
          if (c === (startDay + totalDaysPerBooking)) {
            bookingSet.add(startDateFormat).add(endDateFormat);
            var reservation = {
              startDate: startDateFormat,
              endDate: endDateFormat,
              listingId: listing_id
            };
            bookings.push(reservation);
          }
        }
      }
    }
  }
  return bookings;
};

//console.log(randomBookedDatesGenerator(1));

const writeLocationAvailability = fs.createWriteStream('dataBookedDates.csv')
writeLocationAvailability.write('listing_id, starting_date, ending_date\n', 'utf8');

function writeData(writer, encoding, callback) {
  let i = 10000000;
  let listing_id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      listing_id += 1;
      let bookingsDates = randomBookedDatesGenerator(listing_id);
      let mapped = bookingsDates.map(function (dates) {
        const listingID = listing_id;
        const starting_date = dates.startDate;
        const ending_date = dates.endDate;
        const data = `${listing_id}, ${starting_date}, ${ending_date}\n`;
        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
          // see if we should continue, or wait, don't pass the callback because we're not done yet
          ok = writer.write(data, encoding);
        }
      });
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
