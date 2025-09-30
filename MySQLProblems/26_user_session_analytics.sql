-- Problem 26: User session analytics – sessionize events with 30-minute inactivity timeout
-- Table: events(user_id INT, ts DATETIME)

-- Setup
DROP TABLE IF EXISTS events;
CREATE TABLE events (
  user_id INT NOT NULL,
  ts      DATETIME NOT NULL,
  KEY idx_user_ts (user_id, ts)
);
INSERT INTO events VALUES
  (1,'2025-01-01 10:00:00'),(1,'2025-01-01 10:10:00'),(1,'2025-01-01 11:00:00'),
  (2,'2025-01-01 09:00:00'),(2,'2025-01-01 09:20:00'),(2,'2025-01-01 10:00:00');

-- Solution: mark new sessions when gap > 30 minutes, then aggregate
WITH ordered AS (
  SELECT user_id, ts,
         LAG(ts) OVER (PARTITION BY user_id ORDER BY ts) AS prev_ts
  FROM events
), flagged AS (
  SELECT user_id, ts, prev_ts,
         CASE WHEN prev_ts IS NULL OR TIMESTAMPDIFF(MINUTE, prev_ts, ts) > 30 THEN 1 ELSE 0 END AS new_sess
  FROM ordered
), sessed AS (
  SELECT user_id, ts,
         SUM(new_sess) OVER (PARTITION BY user_id ORDER BY ts ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS sess_id
  FROM flagged
)
SELECT user_id, sess_id,
       MIN(ts) AS session_start,
       MAX(ts) AS session_end,
       TIMESTAMPDIFF(MINUTE, MIN(ts), MAX(ts)) AS session_duration_min,
       COUNT(*) AS events_in_session
FROM sessed
GROUP BY user_id, sess_id
ORDER BY user_id, sess_id;


