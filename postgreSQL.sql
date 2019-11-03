DROP DATABASE IF EXISTS availability;

CREATE DATABASE availability;

CREATE TABLE listingAvailability(
  listing_id SERIAL NOT NULL PRIMARY KEY,
  min_stay_su int NOT NULL,
  min_stay_m int NOT NULL,
  min_stay_tu int NOT NULL,
  min_stay_w int NOT NULL,
  min_stay_th int NOT NULL,
  min_stay_f int NOT NULL,
  min_stay_sa int NOT NULL
);

CREATE TABLE unavailableDates(
  id int PRIMARY KEY,
  starting_date date,
  ending_date date,
  listing_id int
);

ALTER TABLE unavailableDates ADD FOREIGN KEY (listing_id) REFERENCES listingAvailability;