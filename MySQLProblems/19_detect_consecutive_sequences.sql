-- Problem 19: Detect consecutive sequences of logins per user (>= 3 days)
-- Table: user_logins(user_id INT, login_date DATE)

-- Setup
DROP TABLE IF EXISTS user_logins;
CREATE TABLE user_logins (
  user_id INT NOT NULL,
  login_date DATE NOT NULL,
  PRIMARY KEY (user_id, login_date)
);
INSERT INTO user_logins VALUES
  (1,'2025-01-01'),(1,'2025-01-02'),(1,'2025-01-03'),(1,'2025-01-05'),
  (2,'2025-01-01'),(2,'2025-01-03'),(2,'2025-01-04'),(2,'2025-01-05');

-- Solution: gap and islands via DATE_SUB with row_number trick
WITH seq AS (
  SELECT user_id, login_date,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS rn
  FROM user_logins
), grp AS (
  SELECT user_id, login_date, rn,
         DATE_SUB(login_date, INTERVAL rn DAY) AS grp_key
  FROM seq
), agg AS (
  SELECT user_id,
         MIN(login_date) AS start_date,
         MAX(login_date) AS end_date,
         COUNT(*) AS days
  FROM grp
  GROUP BY user_id, grp_key
)
SELECT * FROM agg WHERE days >= 3
ORDER BY user_id, start_date;


