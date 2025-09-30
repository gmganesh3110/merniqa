-- Problem 17: Range partitioning by month for large events table
-- Table: events(id INT, created_at DATE, payload JSON)

-- Setup (range partitions by month)
DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id INT NOT NULL,
  created_at DATE NOT NULL,
  payload JSON,
  PRIMARY KEY (id, created_at)
)
PARTITION BY RANGE (TO_DAYS(created_at)) (
  PARTITION p202501 VALUES LESS THAN (TO_DAYS('2025-02-01')),
  PARTITION p202502 VALUES LESS THAN (TO_DAYS('2025-03-01')),
  PARTITION pmax    VALUES LESS THAN MAXVALUE
);

INSERT INTO events VALUES
  (1,'2025-01-10', JSON_OBJECT('type','login')),
  (2,'2025-02-05', JSON_OBJECT('type','purchase'));

-- Query hitting partition pruning for February
SELECT * FROM events
WHERE created_at >= '2025-02-01' AND created_at < '2025-03-01';


