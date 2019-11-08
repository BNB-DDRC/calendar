DROP KEYSPACE IF EXISTS calendar;

CREATE KEYSPACE IF NOT EXISTS calendar
WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};


USE calendar;

CREATE TABLE calendar.availability (
  listing_id INT,
  min_stay_su tinyint,
  min_stay_m tinyint,
  min_stay_tu tinyint,
  min_stay_w tinyint,
  min_stay_th tinyint,
  min_stay_f tinyint,
  min_stay_sa tinyint,
  max_stay tinyint,
  starting_date date,
  ending_date date,
  booking_id UUID,
  PRIMARY KEY (listing_id, booking_id)
);


