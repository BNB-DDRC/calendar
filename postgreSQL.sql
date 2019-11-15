DROP DATABASE IF EXISTS availability;

CREATE DATABASE availability;

CREATE TABLE listingAvailability(
  listing_id int NOT NULL PRIMARY KEY,
  min_stay_su int NOT NULL,
  min_stay_m int NOT NULL,
  min_stay_tu int NOT NULL,
  min_stay_w int NOT NULL,
  min_stay_th int NOT NULL,
  min_stay_f int NOT NULL,
  min_stay_sa int NOT NULL,
  max_stay int NOT NULL
);

CREATE TABLE bookedDates(
  listing_id int NOT NULL
  starting_date date NOT NULL,
  ending_date date NOT NULL,
  booking_id uuid NOT NULL,
);

-- ALTER TABLE unavailableDates ADD FOREIGN KEY (listing_id) REFERENCES listingAvailability;