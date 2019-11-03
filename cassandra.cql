CREATE KEYSPACE IF NOT EXISTS calendar
WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

-- // Replication factor − It is the number of machines in the cluster that will receive copies of the same data.
-- Replica placement strategy − It is nothing but the strategy to place replicas in the ring. We have strategies such as simple strategy (rack-aware strategy), old network topology strategy (rack-aware strategy), and network topology strategy (datacenter-shared strategy).
-- Column families − Keyspace is a container for a list of one or more column families. A column family, in turn, is a container of a collection of rows. Each row contains ordered columns. Column families represent the structure of your data. Each keyspace has at least one and often many column families.

USE calendar

DROP TABLE IF EXISTS calendar.availability;

CREATE TABLE calendar.availability (
  listing_id bigint,
  min_stay_su tinyint,
  min_stay_m tinyint,
  min_stay_tu tinyint,
  min_stay_w tinyint,
  min_stay_th tinyint,
  min_stay_f tinyint,
  min_stay_sa tinyint,
  starting_date date,
  ending_date date,
  -- booking 'DateRangeType', (maybe just use this daterangetype instead of start and end date)
  max_stay tinyint,
  PRIMARY KEY (listing_id)
);

