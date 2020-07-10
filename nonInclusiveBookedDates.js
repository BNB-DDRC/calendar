const fs = require ('fs');
var faker = require('faker');
var moment = require('moment');
const uuidv4 = require('uuid/v4');

const writeUsers = fs.createWriteStream('BookingData.csv');
writeUsers.write('listing_id,Check_in,Check_out,Booking_ID\n','utf8');

function writeBookings(writer, encoding, callback) {
    let i = 10000000;
    let listing_id = 0;


    function write () {
        let ok = true;
        do {
            i -= 1;
            listing_id += 1;
                if(listing_id%10000 === 0){
                    console.log(listing_id)
                }
            var newPairArr = createPairs()
            newPairArr.forEach((pair, j) => {
                const booking_id = uuidv4();
                const Check_in = moment().add(pair.checkIn, 'd').format('YYYY-MM-DD');
                const Check_out = moment().add(pair.checkOut, 'd').format('YYYY-MM-DD');
                const data = `${listing_id},${Check_in},${Check_out},${booking_id}\n`;
                if( i === 0) {
                    writer.write(data, encoding, callback);
                } else {
                    ok = writer.write(data, encoding);
                }
            });
        } while (i > 0 && ok);
        if(i > 0) {
            writer.once('drain', write);
        }
    }
    write()
}

const createPairs = () => {
    let pairsArr = []
    let start = 1
    let end = start + 1 + Math.floor(Math.random()*14)
    let randomDays = () => {
        return 1 + Math.floor(Math.random()*14)
    }
    do{
      let obj = {};
      obj.checkIn = start
      obj.checkOut = end
      pairsArr.push(obj)
      start = end + randomDays()
      end = start + randomDays()
    }while(start <= 180)

    return pairsArr
  }


writeBookings(writeUsers, 'utf-8', () => {
    writeUsers.end();
});
