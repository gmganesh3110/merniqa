-- Problem 6: Find gaps in date ranges per user
-- Table: user_logins(user_id INT, login_date DATE) -- one row per login day
-- Goal: Identify date ranges where the user did NOT log in for > 7 consecutive days.

-- Setup (DDL + sample data)
DROP TABLE IF EXISTS user_logins;
CREATE TABLE user_logins (
  user_id    INT NOT NULL,
  login_date DATE NOT NULL,
  PRIMARY KEY (user_id, login_date)
);
INSERT INTO user_logins (user_id, login_date) VALUES
  (1, '2025-01-01'), (1, '2025-01-02'), (1, '2025-01-03'),
  (1, '2025-01-15'), (1, '2025-01-16'),
  (2, '2025-01-01'), (2, '2025-01-20'), (2, '2025-01-21');

-- Solution (islands problem using row_number-like trick):
WITH dated AS (
  SELECT user_id, login_date
  FROM user_logins
  GROUP BY user_id, login_date
), seq AS (
  SELECT user_id, login_date,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS rn
  FROM dated
), groups AS (
  SELECT user_id,
         DATE_SUB(login_date, INTERVAL rn DAY) AS grp_key,
         MIN(login_date) OVER (PARTITION BY user_id, DATE_SUB(login_date, INTERVAL rn DAY)) AS streak_start,
         MAX(login_date) OVER (PARTITION BY user_id, DATE_SUB(login_date, INTERVAL rn DAY)) AS streak_end
  FROM seq
)
SELECT g.user_id,
       DATE_ADD(g.streak_end, INTERVAL 1 DAY)     AS gap_start,
       (SELECT MIN(login_date) FROM dated d WHERE d.user_id=g.user_id AND d.login_date>g.streak_end) - INTERVAL 1 DAY AS gap_end
FROM (
  SELECT DISTINCT user_id, grp_key, streak_start, streak_end FROM groups
) g
WHERE DATEDIFF(
         (SELECT MIN(login_date) FROM dated d WHERE d.user_id=g.user_id AND d.login_date>g.streak_end),
         g.streak_end
      ) > 7
ORDER BY g.user_id, gap_start;


