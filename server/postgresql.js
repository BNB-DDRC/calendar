const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'd.parson',
  host: 'localhost',
  database: 'availability',
  password: '',
  port: 5432,
})

const getAvailability = (req, res) => {
  //console.log(req.params.id)
  const id = parseInt(req.params.id);


  pool.query('SELECT listavailability.listing_id, min_stay_su, min_stay_m, min_stay_tu, min_stay_w, min_stay_th, min_stay_f, min_stay_sa, max_stay, bookeddates.starting_date, ending_date, booking_id FROM listavailability INNER JOIN bookeddates ON bookeddates.listing_id = listavailability.listing_id WHERE listavailability.listing_id = $1', [id], (err, result) => {
    if (err) {
      res.send(err)
    }
    //console.log(result.rows)
    res.send(result.rows)
  })

};

const createBooking = (request, response) => {
  console.log('this is the request body in the post request', request.body)
  const listing_id = request.body['listing_id'];
  const starting_date = request.body['starting_date']
  const ending_date = request.body['ending_date']
  const booking_id = request.body['booking_id']


  pool.query('INSERT INTO bookeddates (listing_id, starting_date, ending_date, booking_id) VALUES ($1, $2, $3, $4)', [listing_id, starting_date, ending_date, booking_id], (error, results) => {
    if (error) {
      console.error(error)
      // response.status(400).send(error);
    }
    response.status(201).send(`Booking confirmed! Confirmation id is`) // OR the id can just be the uuid that was submitted which will probably be created during the post request
  })
};

module.exports = {
  getAvailability,
  createBooking
};


// [ WITH [ RECURSIVE ] with_query [, ...] ]
// INSERT INTO table_name [ AS alias ] [ ( column_name [, ...] ) ]
//     { DEFAULT VALUES | VALUES ( { expression | DEFAULT } [, ...] ) [, ...] | query }
//     [ ON CONFLICT [ conflict_target ] conflict_action ]
//     [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]

// where conflict_target can be one of:

//     ( { index_column_name | ( index_expression ) } [ COLLATE collation ] [ opclass ] [, ...] ) [ WHERE index_predicate ]
//     ON CONSTRAINT constraint_name

// and conflict_action is one of:

//     DO NOTHING
//     DO UPDATE SET { column_name = { expression | DEFAULT } |
//                     ( column_name [, ...] ) = ( { expression | DEFAULT } [, ...] ) |
//                     ( column_name [, ...] ) = ( sub-SELECT )
//                   } [, ...]
//               [ WHERE condition ]


// , (error, results) => {
//   if (error) {
//     console.error(error)
//   }
//   //console.log(results.rows);
//   response.status(200).json(results.rows);